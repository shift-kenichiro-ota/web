/**
 * @author mitsuo.yamazaki
 */

define(function() {
	var async = require('async');

	// テスト開始時に行うこと
	function beforeTest(finishCallback) {
        async.series([
            function(callback) {
                console.log("test suite : " + suiteNo);
                console.log("before test start");
                console.log("テスト開始前処理");

                //var colItem = '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-b" id="test_case_num"' + suiteNo + '>API組み合わせ番号' + suiteNo + '</li>';
                var colItem = document.createElement("li");
                colItem.id = "test_case_num" + suiteNo;
                colItem.setAttribute("data-role", "list-divider");
                colItem.setAttribute("role", "heading");
                colItem.className = "ui-li ui-li-divider ui-bar-b";
                colItem.appendChild(document.createTextNode("API組み合わせ番号" + suiteNo));
                document.getElementById("testResult").appendChild(colItem);
                callback();
            },
            function(callback) {
                applican.openDatabase('testresult',
                    function(db_obj) {
                        testResultDB = db_obj;
                        callback();
                    },
                    function(error) {
                        console.log(error.message);
                        callback(error);
                    });
            },function(callback) {
                var sql = "CREATE TABLE IF NOT EXISTS TESTRESULT (id integer primary key autoincrement, suite_no text, case_no text, case_name text, result text)";
                testResultDB.exec(sql,
                    function(result) {
                        test_result = "OK";
                        callback();
                    },
                    function(error) {
                        var dump = "createTable_error ";
                        dump += error.message + " ";
                        test_result = "NG : " + dump;
                        callback(error);
                    });
            },
            function(callback) {
                outputCaseNo(suiteNo, callback);
            }], function(err, results) {
            if (err) {
                throw err;
            }
            console.log("before test end");
            finishCallback();
        });
    }

	// 端末名をテスト結果のファイルに出力
	function outputDeviceName(finishCallback) {
		var device_name = applican.device.name;

		async.series([
		function(callback) {
            console.log("device name : " + device_name);
			callback(null, 1);
		},
		function(callback) {
			upload1(callback);
		}], function() {
            console.log("out put device name");
			finishCallback();
		});
	}

    // uploadヘッダー
    function outputHeader(fininishCallback) {
        var dump = "";
        dump += "担当者 : " + document.getElementById("tester").value + "\n";
        dump += "通信環境 : " + applican.connection.type + "\n";
        dump += "デバイス名 : " + applican.device.name + "\n";
        dump += "プラットフォーム : " + applican.device.platform + "\n";
        dump += "UUID : " + applican.device.uuid + "\n";
        dump += "バージョン : " + applican.device.version + "\n";
        dump += "applican : " + applican.device.applican + "\n";

        fileWrite1(dump, fininishCallback);
    }

	// 組み合わせ番号をファイルに出力
	function outputCaseNo(caseNo, finishCallback) {
		fileWrite1("組み合わせNo" + caseNo + "のテスト\n", finishCallback);
	}

	function openWebView(testSuiteNo, loop) {
        suiteNo = testSuiteNo;
		location.href = "page2.html?launch_webview=yes&suiteNo=" + suiteNo + "&loop=" + loop;
	}

    function backgroundStart(finishCallback) {
		console.log("background start");
		async.series([
		function(callback) {
			watchAcceleration(callback);
		},
		function(callback) {
			watchShake(callback);
		},
		function(callback) {
			watchHeading(callback);
		},
		function(callback) {
			watchPosition(callback);
		},
		function(callback) {
			watchKeyDown(callback);
		},
		function(callback) {
			watchKeyUp(callback);
		},
		function(callback) {
			loadBGM(callback);
		},
		function(callback) {
			playBGM(0, callback);
		}], function(err, results) {
            finishCallback();
		});
	}

	function backgroundFinish(finishCallback) {
        async.series([
            function(callback) {
                clearWatchHeading(callback);
            },
            function(callback) {
                clearWatchAcceleration(callback);
            },
            function(callback) {
                clearWatchShake(callback);
            },
            function(callback) {
                clearWatchPosition(callback);
            },
            function(callback) {
                clearWatchKeyDown(callback);
            },
            function(callback) {
                clearWatchKeyUp(callback);
            },
            function(callback) {
                stopSound(callback);
            },
            function(callback) {
                releaseAllBGM(callback);
            }
        ], function() {
            finishCallback();
        });
	}

	function get_url_vars() {
		var vars = [];
		var params;
		var temp_params = window.location.search.substring(1).split('&');
		for (var i = 0; i < temp_params.length; i++) {
			params = temp_params[i].split('=');
			vars.push(params[1]);
		}
		return vars;
	}

	return {
        backgroundStart : backgroundStart,
        backgroundFinish : backgroundFinish,
        outputHeader : outputHeader,
        openWebView : openWebView,
        beforeTest : beforeTest,
        outputDeviceName : outputDeviceName,
        getURLVars : get_url_vars
	};

});

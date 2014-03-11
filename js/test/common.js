/**
 * @author mitsuo.yamazaki
 */

define(function() {
	var async = require('async');
	var $ = require('jquery');

	// テスト開始時に行うこと
	function beforeTest(finishCallback) {
        async.series([
            function(callback) {
                console.log("test suite : " + suiteNo);
                console.log("before test start");
                console.log("テスト開始前処理");

                //var colItem = '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-b" id="test_case_num"' + suiteNo + '>API組み合わせ番号' + suiteNo + '</li>';
                var colItem = '<li id="test_case_num"' + suiteNo + '>API組み合わせ番号' + suiteNo + '</li>';
                if($("#test_case_num" + suiteNo).html() !== undefined || $("#test_case_num" + suiteNo).html() !== "") {
                    //$('#testResult').append(colItem).collapsibleset();
                    $('#testResult').append(colItem);
                }
                callback(null);
            },
            function(callback) {
                applican.openDatabase('testresult',
                    function(db_obj) {
                        testResultDB = db_obj;
                        callback(null);
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
                        $("#hidden_api_result").html("createTable_success ");
                        callback();
                    },
                    function(error) {
                        var dump = "createTable_error ";
                        dump += error.message + " ";
                        test_result = "NG : " + dump;
                        $("#hidden_api_result").html(dump);
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
            },
            function(callback) {
                notificationAlert("テストがすべて終了しました。", "テスト終了", "OK", callback);
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

    function deleteInvisibleTestResult() {
        $('#hidden_test_case_result').html("");
    }

	return {
        backgroundStart : backgroundStart,
        backgroundFinish : backgroundFinish,
        openWebView : openWebView,
        beforeTest : beforeTest,
        outputDeviceName : outputDeviceName,
        getURLVars : get_url_vars,
        deleteInvisibleTestResult : deleteInvisibleTestResult
	};

});

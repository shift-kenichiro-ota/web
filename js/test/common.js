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
                var colItem = "";
                console.log("test suite : " + suiteNo);
                console.log("before test start");
                console.log("テスト開始前処理");
                colItem += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-b" id="test_case_num"' + suiteNo + '>API組み合わせ番号' + suiteNo + '</li>';
                if($("#test_case_num" + suiteNo).html() != undefined || $("#test_case_num" + suiteNo).html() != "") {
                    $('#testResult').append(colItem).collapsibleset();
                }
                setTimeout(function() {
                    callback(null, 1);
                }, 500);
            },
            function(callback) {
                console.log("debug1");
                applican.openDatabase('testresult', function(dbobj) { testResultDB = dbobj; callback(); }, testResultDBOpenError);
            },function(callback) {
                var sql = "CREATE TABLE IF NOT EXISTS TESTRESULT (id integer primary key autoincrement, case_no text, case_name text, result text)";
                if (testResultDB === null) {
                    // alert('データベースを開いていません');
                    return;
                }
                testResultDB.exec(sql, createTable_success, createTable_error);
                setTimeout(function() {
                    callback(null, 1);
                }, 500);
            },
            function(callback) {
                outputCaseNo(suiteNo, callback);
            }], function() {
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
			setTimeout(function() {
				callback(null, 1);
			}, 500);
		},
		function(callback) {
			upload1(callback);
		}], function() {
			setTimeout(function() {
                console.log("out put device name");
				finishCallback();
			}, 1000);
		});
	}

	// 組み合わせ番号をファイルに出力
	function outputCaseNo(caseNo, finishCallback) {
		fileWrite1("組み合わせNo" + suiteNo + "のテスト\n", finishCallback);
	}

	function openWebView(testSuiteNo, loop) {
        suiteNo = testSuiteNo;
		location.href = "page2.html?launch_webview=yes&suiteNo=" + suiteNo + "&loop=" + loop;
	}

	function notificationCloseWebView() {
		notificationAlert("WebViewをクローズしてください。", "WebViewのクローズ", "OK");
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

	function backgroundTest(finishCallback) {
		// async.series([
		// function(callback) {
		// notificationAlert("バックグラウンド処理のテストを開始します。", "テスト開始", "OK");
		// setTimeout(function() {
		// callback(null, 1);
		// }, 3000);
		// },
		// function(callback) {
		// notificationConfirm("バックグラウンドで位置情報監視が動作し続けていること", "watchLocationの確認", "OK, NG", callback);
		// },
		// function(callback) {
		// notificationConfirm("バックグラウンドで加速度の監視が動作し続けていること", "watchAccelerationの確認", "OK, NG", callback);
		// },
		// function(callback) {
		// notificationConfirm("バックグラウンドでShakeの監視が動作し続けていること", "watchShakeの確認", "OK, NG", callback);
		// },
		// function(callback) {
		// notificationConfirm("バックグラウンドでKeyDown監視が動作し続けていること", "watchKeyDownの確認", "OK, NG", callback);
		// },
		// function(callback) {
		// notificationConfirm("バックグラウンドでKeyUp監視が動作し続けていること", "watchKeyDownの確認", "OK, NG", callback);
		// },
		// function(callback) {
		// notificationConfirm("BGMが鳴り続けている続けていること", "playBGMの確認", "OK, NG", callback);
		// }], function() {
		// alert("backGroundTest finish ");
		// finishCallback(null);
		// });
		console.log("backgroundTest");
	}

	function backgroundFinish() {
        async.series([
            function(callback) {
                notificationAlert("テストがすべて終了しました。", "テスト終了", "OK", callback);
            },
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
            }
        ], function() {
            testFinishFinish();
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
        backgroundTest : backgroundTest,
        backgroundStart : backgroundStart,
        backgroundFinish : backgroundFinish,
        openWebView : openWebView,
        beforeTest : beforeTest,
        outputDeviceName : outputDeviceName,
        getURLVars : get_url_vars,
        deleteInvisibleTestResult : deleteInvisibleTestResult
	};

});

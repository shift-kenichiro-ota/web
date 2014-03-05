/**
 * @author mitsuo.yamazaki
 */

define(function() {
    var async = require('async');
    var cmn = require('common');
    var $ = require('jquery');
    var loop = 0;
    var debug;
    var started = false;

    function execute() {
        // ボタン二度押し防止
        if (started) {
            return;
        }
        started = true;
        console.log("test start");
        async.series([
            function(callback) {
                cmn.backgroundStart(callback);
            },
            function(callback) {
                cmn.outputDeviceName(callback);
            },
            function(callback) {
                testExecute(callback);
            },
            function(callback) {
               cmn.backgroundFinish(callback);
            }
        ], function(err, results) {
            if (err) {
                console.log(err);
            }
            console.log("all test finish");
            started = false;
        });
    }

    function readTestCase() {
        var test_case = require('json_test_case');
        return test_case.test_case_list;
    }

    function testExecute(finishCallback) {
        async.series([
            function(callback) {
                testSuite(callback);
            }
        ], function() {
            finishCallback();
        });
    }

    function testSuite(parentCallback) {
        var test_case;
        async.series([
            function(callback) {
                test_case = readTestCase();
                setTimeout(function() {
                    callback();
                }, 300);
            },function(callback) {
                var i = 0;
                var endTestSuite = test_case.length;
                var specifiedtestSuiteString = $("#specified_test_suite").val();
                var specifiedtestSuiteStrings;
                var parsedStartTestSuite = parseInt($("#start_test_suite").val(), 10);
                var parsedEndTestSuite = parseInt($("#end_test_suite").val(), 10);
                var testCasePointer = [];
                var s;
                var suiteId;
                var p;
                // テストスィート指定を最優先
                if (specifiedtestSuiteString) {
                    //testCasePointer = specifiedtestSuiteString.split(",").map(function(id) { return parseInt(id, 10) - 1; });
                    specifiedtestSuiteStrings = specifiedtestSuiteString.split(",");
                    for (s = 0; s < specifiedtestSuiteStrings.length; s++) {
                        suiteId = parseInt(specifiedtestSuiteStrings[s], 10) - 1;
                        if (0 <= suiteId && suiteId < endTestSuite) {
                            testCasePointer.push(suiteId);
                        } else {
                            window.alert("テストスィートの範囲外の番号は指定できません : " +  specifiedtestSuiteStrings[s]);
                            callback();
                            return;
                        }
                    }
                    endTestSuite = testCasePointer.length;
                } else {
                    // 範囲指定はテストスィート指定をしてない場合のみ
                    if (parsedStartTestSuite && 1 <= parsedStartTestSuite && parsedStartTestSuite <= endTestSuite) {
                        i = parsedStartTestSuite - 1; // 画面からの入力の基数は1
                    }
                    if (parsedEndTestSuite && i + 1 <= parsedEndTestSuite && parsedEndTestSuite <= endTestSuite) {
                        endTestSuite = parsedEndTestSuite;
                    }
                    for (p = i; p < endTestSuite; p++) {
                        testCasePointer[p] = p;
                    }
                }
                async.whilst(
                    function() {
                        return i < endTestSuite;
                    },
                    function (callback) {
                        console.log("testCasePointer[i] : " + testCasePointer[i] + " test suite : " + test_case[testCasePointer[i]].key);
                        if (test_case[i].WebView == 2) {
                            // 手動でWebViewから戻ったときにテストを継続させる
                            document.getElementById("test_continue").onclick = function() { document.getElementById("test_continue").onclick = null; setTimeout(callback, 3000); };
                            cmn.openWebView(test_case[i].key, testCasePointer[i]);
                        } else {
                            testCase(test_case, testCasePointer[i], callback);
                        }
                        console.log("in loop testCasePointer[i] = " + testCasePointer[i]);
                        i++;
                    },
                    function (err) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        console.log('last i = ' + i);
                        callback();
                    }
                );
            }
        ], function(err, result) {
                console.log('final callback');
                parentCallback();
            }
        );
    }

    function testCase(test_case, suiteLoop, finishCallback) {
        async.series([
            function(callback) {
                suiteNo = test_case[suiteLoop].key;
                cmn.beforeTest(callback);
            },function(callback) {
                var j = 0;
                async.whilst(
                    function() {
                        console.log("test name whilst : " + (j < (test_case[suiteLoop].val.length - 1)));
                        return j < (test_case[suiteLoop].val.length - 1);
                    },
                    function (callback) {
                        debug = "testCase";
                        suiteNo = test_case[suiteLoop].key;
                        caseNo = j;
                        console.log("j : " + j + " test name : " + test_case[suiteLoop].val[j]);
                        if(test_case[suiteLoop].exeflg) {
                            console.log("test name suite loop : " + suiteLoop + " case loop : " + j + " debug : " + debug);
                            console.log("test name " + test_case[suiteLoop].val[j] + " ,testCase");
                            run(test_case[suiteLoop].val[j], callback);
                        } else {
                            callback();
                        }
                        j++;
                    },
                    function (err) {
                        console.log('last j = ' + j);
                        callback();
                    }
                );
            }
        ], function(err, result) {
                console.log("test name test case finish");
                finishCallback();
            }
        );
    }

    function run(testName, finishCallback) {
        console.log("test name : " + testName + " ,run 最初");
        var k = 0;
        var test_name = "";
        async.series([
            function(callback) {
                cmn.deleteInvisibleTestResult();

                setTimeout(function() {
                    callback();
                }, 300);
            },
            function(callback) {
                var callbackCalled = false;
                debug = "run";
                console.log("test name " + testName + "debug : " + debug);

                var strCall = "test" + testName + "(callback);";

                console.log("test name : " + testName + " ,run" + k + " case no : " + caseNo);
                console.log("test name : " + strCall);
                test_name = testName;
                var testCase = new Function("callback", strCall);

                // 1分経ってテストケースが終わってなかったら強制的にcallbackを呼び出して抜ける
                //
                setTimeout(
                    function() {
                        if (!callbackCalled) {
                            // applicanを強制的に再初期化する
                            applican_init();
                            // 強制的にNGとする
                            test_result = "NG";
                            testResult(test_name + "の確認", function() { callbackCalled = true; setTimeout(callback, 2000); });
                        }
                    }, 1000 * 60);

                testCase(function() { if (callbackCalled) { return; } callbackCalled = true; callback(); });
            }

        ], function() {
            console.log("test name : " + testName + " ,run last" + k + " debug : " + debug + " case no : " + caseNo);
            console.log("test name(test_name) : " + test_name);
            console.log("run test case");
            finishCallback();
        });
    }

    // 2枚目のWebViewが表示された時のテスト実行メソッド
    function webviewTest() {
        console.log("test webview");
        var suiteLoop;
        var test_case;
        async.series([
            function(callback) {
                test_case = readTestCase();
                setTimeout(function() {
                    callback();
                }, 300);
            },function(callback) {
                var i = 0;
                var urlParams = get_url_vars();
                if (urlParams == null || urlParams == "") {
                    i = 0;
                } else {
                    i = Number(urlParams[2]);
                }
                suiteNo = test_case[i].key;
                webviewTestCase(test_case, i, callback);
                suiteLoop = i;
            }, function(callback) {
                notificationAlert("WebViewをクローズして、「テストを続ける」ボタンを押して下さい", "WebViewテストスィートの終了", "OK", callback);
            }
        ], function(err, result) {
                console.log("webview test");
            }
        );
    }

    function webviewTestCase(test_case, suiteLoop, finishCallback) {
        async.series([
            function(callback) {
                suiteNo = test_case[suiteLoop].key;
                cmn.beforeTest(callback);
            },function(callback) {
                var j = 0;
                async.whilst(
                    function() {
                        console.log("test case length : " + (test_case[suiteLoop].val.length - 1));
                        return j < (test_case[suiteLoop].val.length - 1);
                    },
                    function (callback) {
                        suiteNo = test_case[suiteLoop].key;
                        caseNo = j;
                        console.log("j : " + j);
                        if (test_case[suiteLoop].exeflg) {
                            webviewTestCaseRun(test_case[suiteLoop].val[j], callback);
                        } else {
                            callback();
                        }
                        j++;
                    },
                    function (err) {
                        console.log('last j = ' + j);
                        callback();
                    }
                );
            }], function(err, result) {
                console.log('final callback');
                finishCallback();
            });
    }

    function webviewTestCaseRun(testName, finishCallback) {
        var k = 0;
        async.series([
            function(callback) {
                cmn.deleteInvisibleTestResult();
                setTimeout(function() {
                    callback();
                }, 300);
            },
            function(callback) {
                var callbackCalled = false;
                debug = "run";
                console.log("test name " + testName + "debug : " + debug);

                var strCall = "test" + testName + "(callback);";

                console.log("test name : " + testName + " ,run" + k + " case no : " + caseNo);
                console.log("test name : " + strCall);
                test_name = testName;
                var testCase = new Function("callback", strCall);

                // 1分経ってテストケースが終わってなかったら強制的にcallbackを呼び出して抜ける
                //
                setTimeout(
                    function() {
                        if (!callbackCalled) {
                            // applicanを強制的に再初期化する
                            applican_init();
                            // 強制的にNGとする
                            test_result = "NG";
                            testResult(test_name + "の確認", function() { setTimeout(callback, 2000); });
                        }
                    }, 1000 * 60);

                testCase(function() { callbackCalled = true; callback(); });
            }
        ], function() {
            console.log("run test case");
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
        execute : execute,
        webviewTest : webviewTest
    };
});

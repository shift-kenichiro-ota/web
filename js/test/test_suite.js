/**
 * @author mitsuo.yamazaki
 */

define(function() {
    var async = require('async');
    var cmn = require('common');
    var $ = require('jquery');
    var loop = 0;
    var debug;

    function execute() {
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
            }
        ], function() {
            notificationAlert("全てのテストが終了しました", "完了", "OK", function() {} );
            console.log("all test finish");
        });
    }

    function testMethod(finishCallback) {
        testConnectionType(finishCallback);
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
        var suiteNo;
        var urlParams = get_url_vars();
        async.series([
            function(callback) {
                test_case = readTestCase();
                setTimeout(function() {
                    callback();
                }, 300);
            },function(callback) {
                var i = 0;
                if (urlParams[1] != null || urlParams[1] != undefined) {
                    suiteNo = urlParams[0];
                    i = Number(urlParams[1]);
                } else {
                    i = 0;
                }
                async.whilst(
                    function() {
                        return i < test_case.length;
                    },
                    function (callback) {
                        console.log("i : " + i + " test suite : " + test_case[i].key);
                        if (test_case[i].WebView == 2) {
                            // WebViewが連続する場合、時間をおかないとクローズの処理中に次のWebViewが開いてしまい失敗するので、3秒待つ
                            applican.addLaunchWebviewCloseEventListener(function() { setTimeout(callback, 3000); });
                            cmn.openWebView(test_case[i].key, i);
                        } else {
                            testCase(test_case, i, callback);
                        }
                        console.log("in loop i = " + i);
                        i++;
                    },
                    function (err) {
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
                            testResult(test_name + "の確認", function() { setTimeout(callback, 2000); });
                        }
                    }, 1000 * 60);

                testCase(function() { callbackCalled = true; callback(); });
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
        var nextSuiteNo;
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
                nextSuiteNo = test_case[(i+1)].key;
                webviewTestCase(test_case, i, callback);
                suiteLoop = i;
            }, function(callback) {
                notificationAlert("WebViewをクローズしてください。", "dialog", "OK", callback);
            }
        ], function(err, result) {
                console.log("webview test");
//                location.href = "./index.html?suiteNo=" + nextSuiteNo + "&loop=" + (Number(suiteLoop) + 1);
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

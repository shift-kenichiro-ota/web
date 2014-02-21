/**
 * @author mitsuo.yamazaki
 */
'use strict';
require.config({
    baseUrl : './js/',
    urlArgs : "bust=" + (new Date()).getTime(),
    shim : {
	'async.min' : {
        exports : 'async'
	},
	'applican_debug_settings' : {
        exports : 'applican_debug_settings'
	},
	'jquery' : {
        exports : '$'
	},
	'applican' : {
        deps : [ 'applican_debug_settings'],
        exports : 'applican'
	},
	'test_api' : {
        deps : [ 'jquery', 'applican', 'async'],
        exports : 'test_api'
	},
	'jquery.mobile' : {
        deps : [ 'jquery' ],
        exports : 'jquery'
	},
	'common' : {
        deps : [ 'async', 'applican', 'test_api' ],
        exports : 'common'
	},
	'test_case' : {
        deps : ['async', 'jquery']
	},
	'test_suite' : {
        deps : [ 'async', 'test_api', 'test_case', 'common', 'json_test_case'],
        exports : 'test_suite'
	}
    },

    paths : {
        'applican_debug_settings' : 'test/applican_debug_settings',
	    'applican' : 'libs/applican-1.2.1',
	    'jquery' : 'libs/jquery-2.0.3.min',
	    'jquery.mobile' : 'libs/jquery.mobile-1.3.2.min',
	    'async' : 'libs/async.min',
	    'common' : 'test/common',
	    'test_api' : 'test/test_api',
	    'test_case' : 'test/test_case',
	    'test_suite' : 'test/test_suite',
        'json_test_case' : 'test_case/json_test_case'
    },
    waitSeconds : 1000
});

define([ 'async', 'applican_debug_settings', 'applican', 'test_api', 'jquery',
        'jquery.mobile', 'test_case', 'common', 'test_suite', 'json_test_case' ], function($) {
            console.log("first load");
            document.addEventListener("deviceready", onDeviceReady, false);
            document.getElementById("showLogBtn").addEventListener("click", showLogConsole, false);
        });

/*
 * applican読み込み待機
 */

/** ******************************************************************************** */
// //////////////////////////////////////
// applican 準備完了
function onDeviceReady() {
    var test_suite = require('test_suite');
    // イベント登録
    document.addEventListener("resume", onResume, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    document.addEventListener("searchbutton", onSearchKeyDown, false);
    document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
    document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("appear", onAppear, false);

    // 画面回転
    document.addEventListener("orientationchanged", onOrientationChanged, false);

    // バッテリー
    document.addEventListener("batterycritical", onBatteryCritical, false);
    document.addEventListener("batterylow", onBatteryLow, false);
    document.addEventListener("batterystatus", onBatteryStatus, false);

    console.log('on device ready');

    // テスト実行
    document.getElementById("test_exec").addEventListener("click", function() {exe(test_suite);}, false);
}

function exe(suite) {
    suite.execute();
}

function onPause() {
    var dump = "onPause\n";
    console.log(dump);
}
function onResume() {
    var dump = "onResume\n";
    console.log(dump);
}
function onBackKeyDown() {
    var dump = "onBackKeyDown\n";
    console.log(dump);
}
function onMenuKeyDown() {
    var dump = "onMenuKeyDown\n";
    console.log(dump);
}
function onSearchKeyDown() {
    var dump = "onSearchKeyDown\n";
    console.log(dump);
}
function onVolumeDownKeyDown() {
    var dump = "onVolumeDownKeyDown\n";
    console.log(dump);
}
function onVolumeUpKeyDown() {
    var dump = "onVolumeUpKeyDown\n";
    console.log(dump);
}
function onOnline() {
    var dump = "onOnline\n";
    console.log(dump);
}
function onOffline() {
    var dump = "onOffline\n";
    console.log(dump);
}
function onAppear() {
    var dump = "onAppear\n";
    console.log(dump);
}

function onOrientationChanged(res) {
    var dump = "onOrientationChanged\n";
    dump += "orientation:" + res.orientation + "\n";
    console.log(dump);
}

function onBatteryCritical(res) {
    var dump = "onBatteryCritical\n";
    dump += "level:" + res.level + "\n";
    dump += "isPlugged:" + res.isPlugged + "\n";
    console.log(dump);
}
function onBatteryLow(res) {
    var dump = "onBatteryLow\n";
    dump += "level:" + res.level + "\n";
    dump += "isPlugged:" + res.isPlugged + "\n";
    console.log(dump);
}
function onBatteryStatus(res) {
    var dump = "onBatteryStatus\n";
    dump += "level:" + res.level + "\n";
    dump += "isPlugged:" + res.isPlugged + "\n";
    console.log(dump);
}


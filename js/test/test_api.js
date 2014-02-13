/**
 * @author mitsuo.yamazaki
 */

/*
 * グローバル変数
 */
var _compassWatchID;
var _accelerationWatchID;
var _geolocationWatchID;
var baseURL = "http://cadaver-funeral.com";
var getURL = baseURL + "/get.php?a=1&b=2";
var postURL = baseURL + "/post.php";
var writeContents = "";
var testCaseTitle = "";
var seList = null;
var caseNo = "";
var suiteNo = "";
var loopCnt = 0;
var uploadStatus = false;
var fileWriteStatus = false;
var captureImageStatus = false;
var oldContents = "";

var TEST_RESULT = "";
var FILE_NAME = "testResult.csv";
var UPLOAD_URL = baseURL + "/file.php";
var WIFI_WPA_SSID = "";
var WIFI_WPA_SSID_PASSWD = "";
var simpleStorageData = "";
var test_result = "";
var DOCOMO_APIKEY1 = "";
var DOCOMO_APIKEY2 = "";

var finishCallbackFunction = null;
var finalCallbackFunction = null;

var TRACK_NO = 3;

// wait time
/**************************************************************/
var STOP_VIDEO_WAIT_TIME = 500;
var CLEAR_WAIT_TIME = 300;
var PLAY_BGM_WAIT_TIME = 300;
var SET_BGM_VOLUME_WAIT_TIME = 200;
var LIGHT_ON_WAIT_TIME = 500;
var RELEASE_SOUND_DATA_WAIT_TIME = 500;
var PAUSE_SOUND_WAIT_TIME = 300;
var STOP_SOUND_WAIT_TIME = 300;
var CREATE_CONTACT_WAIT_TIME = 1000;
var CLONE_CONTACT_WAIT_TIME = 2000;
var VIBRATE_WAIT_TIME = 3000;
var LOCAL_NOTIFICATION_CANCEL_WAIT_TIME = 1000;
var SPLASH_WAIT_TIME = 1000;
var GA_TRACKING_VIEW_WAIT_TIME = 2000;
var DISPLAY_HIDDEN_VALUE_WAIT_TIME = 300;
var TEST_CASE_WAIT_TIME = 4000;
/**************************************************************/
/*
* バックグラウンドで動かし続ける処理
*/
/** ******************************************************************************** */
// ///
// コンパス方位を一定の時間間隔で取得
function watchHeading(finishCallback) {
	var options = {
		frequency : 100
	};
	_compassWatchID = applican.compass.watchHeading(watchHeadingSuccess, watchHeadingError, options);
    waitTestAPI(finishCallback);
}

function watchHeadingSuccess(res) {
	var dump = "watchHeadingSuccess ";
	dump += "magneticHeading:" + res.magneticHeading + " ";
	dump += "trueHeading:" + res.trueHeading + " ";
	dump += "headingAccuracy:" + res.headingAccuracy + " ";
	dump += "timestamp:" + res.timestamp + " ";
	document.getElementById("dumpAreaCompass").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

function watchHeadingError(e) {
	var dump = "watchHeadingError ";
	dump += "code:" + e.code + " ";
	document.getElementById("dumpAreaCompass").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

// ///
// コンパスの監視を停止
function clearWatchHeading(finishCallback) {
    applican.compass.clearWatch(_compassWatchID);
    document.getElementById("dumpAreaCompass").value =" Stop!!";
    $("#hidden_api_result").html("Stop");
    setTimeout(function() {
        finishCallback();
    }, CLEAR_WAIT_TIME);
//    document.getElementById("hidden_api_result").value = compassValue + " Stop!!";
}

// ///
// 加速度を一定の時間間隔で取得
function watchAcceleration(finishCallback) {
	var options = {
		frequency : 100
	};
	_accelerationWatchID = applican.accelerometer.watchAcceleration(watchAccelerationSuccess, watchAccelerationError, options);
    waitTestAPI(finishCallback);
}

function watchAccelerationSuccess(res) {
	var dump = "watchAccelerationSuccess ";
	dump += "x:" + res.x + " ";
	dump += "y:" + res.y + " ";
	dump += "z:" + res.z + " ";
	dump += "timestamp:" + res.timestamp + " ";
	document.getElementById("dumpAreaAcceleration").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

function watchAccelerationError() {
	var dump = "watchAccelerationError ";
	document.getElementById("dumpAreaAcceleration").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

// ///
// 加速度の監視を停止
function clearWatchAcceleration(finishCallback) {
	applican.accelerometer.clearWatch(_accelerationWatchID);
	document.getElementById("dumpAreaAcceleration").value = ' Stop!!';
    $("#hidden_api_result").html("clear watch acceleration");
    setTimeout(function() {
        finishCallback();
    }, CLEAR_WAIT_TIME);
}

// ///////////////////
// シェイク監視
function watchShake(finishCallback) {
	applican.accelerometer.watchShake(shakeSuccess);
	document.getElementById("dumpAreaShake").value = "Start ";
    $("#hidden_api_result").html("watch shake start");
//    document.getElementById("hidden_api_result").value = "watch shake start";
    waitTestAPI(finishCallback);
}

function shakeSuccess() {
	var dump = "shake: " + parseInt((new Date()) / 1000) + " ";
	document.getElementById("dumpAreaShake").value += dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

function clearWatchShake(finishCallback) {
	applican.accelerometer.clearWatchShake();
	document.getElementById("dumpAreaShake").value = "Stop!!";
    $("#hidden_api_result").html("Stop");
//    document.getElementById("hidden_api_result").value = "stop";
    setTimeout(function() {
        finishCallback();
    }, CLEAR_WAIT_TIME);
}

// ///
// 位置情報を一定の時間間隔で取得
function watchPosition(finishCallback) {
	var options = {
		maximumAge : 0,
		timeout : 20000,
		enableHighAccuracy : false,
		frequency : 3000
	};
	_geolocationWatchID = applican.geolocation.watchPosition(watchPositionSuccess, watchPositionError, options);
    waitTestAPI(finishCallback);
}

function watchPositionSuccess(res) {
	var dump = "watchPositionSuccess ";
	dump += "latitude:" + res.coords.latitude + " ";
	dump += "longitude:" + res.coords.longitude + " ";
	dump += "altitude:" + res.coords.altitude + " ";
	dump += "accuracy:" + res.coords.accuracy + " ";
	dump += "altitudeAccuracy:" + res.coords.altitudeAccuracy + " ";
	dump += "heading:" + res.coords.heading + " ";
	dump += "speed:" + res.coords.speed + " ";
	dump += "timestamp:" + res.timestamp + " ";
	document.getElementById("dumpAreaGeolocation").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

function watchPositionError(e) {
	var dump = "watchPositionError ";
	dump += "code:" + e.code + " ";
	dump += "message:" + e.message + " ";
	document.getElementById("dumpAreaGeolocation").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

// ///
// 位置情報の監視を停止
function clearWatchPosition(finishCallback) {
	applican.geolocation.clearWatch(_geolocationWatchID);
    var positionValue = document.getElementById("dumpAreaGeolocation").value;
	document.getElementById("dumpAreaGeolocation").value = positionValue + " Stop!!";
    $("#hidden_api_result").html("Stop");
//    document.getElementById("hidden_api_result").value =  positionValue + " Stop!!";
    setTimeout(function() {
        finishCallback();
    }, CLEAR_WAIT_TIME);
}

// ///////////////////
// キーボード監視(Androidのみ)
function watchKeyDown(finishCallback) {
	applican.keyboard.watchKeyDown(watchKeyDownSuccess);
	document.getElementById("dumpAreaKeyDown").value = "watchKeyDown Start!";
    $("#hidden_api_result").html("watch key down start");
//    document.getElementById("hidden_api_result").value = "watch key down start";
    waitTestAPI(finishCallback);
}

function watchKeyDownSuccess(res) {
	var dump = "watchKeyDownSuccess ";
	dump += "keyCode:" + res.keyCode + " ";
	dump += "shiftKey:" + res.shiftKey + " ";
	dump += "ctrlKey:" + res.ctrlKey + " ";
	dump += "altKey:" + res.altKey + " ";
	document.getElementById("dumpAreaKeyDown").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

function clearWatchKeyDown(finishCallback) {
	applican.keyboard.clearWatchKeyDown();
	document.getElementById("dumpAreaKeyDown").value = "watchKeyDown Stop!";
    $("#hidden_api_result").html("watch key down stop");
//    document.getElementById("hidden_api_result").value = "watch key down stop";
    setTimeout(function() {
        finishCallback();
    }, CLEAR_WAIT_TIME);
}

function watchKeyUp(finishCallback) {
	applican.keyboard.watchKeyUp(watchKeyUpSuccess);
	document.getElementById("dumpAreaKeyUp").value = "watchKeyUp Start!";
    $("#hidden_api_result").html("watch key up");
//    document.getElementById("hidden_api_result").value = "watch key up";
    waitTestAPI(finishCallback);
}

function watchKeyUpSuccess(res) {
	var dump = "watchKeyUpSuccess ";
	dump += "keyCode:" + res.keyCode + " ";
	dump += "shiftKey:" + res.shiftKey + " ";
	dump += "ctrlKey:" + res.ctrlKey + " ";
	dump += "altKey:" + res.altKey + " ";
	document.getElementById("dumpAreaKeyUp").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

function clearWatchKeyUp(finishCallback) {
	applican.keyboard.clearWatchKeyUp();
	document.getElementById("dumpAreaKeyUp").value = "watchKeyUp Stop!";
    $("#hidden_api_result").html("watch key up stop");
//    document.getElementById("hidden_api_result").value = dump;
    setTimeout(function() {
        finishCallback();
    }, CLEAR_WAIT_TIME);
}

// /////////////////
// GameSound

// サウンドデータをまとめて読み込む
function loadBGM(finishCallback) {
	// BGMを読み込み
	var bgmList = [{
		track : 0,
		src : "gamesound/bgm1.mp3"
	}, {
		track : 1,
		src : "gamesound/bgm2.mp3"
	}, {
		track : 2,
		src : "gamesound/bgm3.mp3"
	}, {
		track : 3,
		src : "gamesound/bgm4.mp3"
	}];

	applican.gamesound.loadBGM(bgmList, loadBGMSuccess, loadBGMError);
    waitTestAPI(finishCallback);
}

function loadBGMSuccess() {
	var dump = "loadBGMSuccess ";
	document.getElementById("dumpAreaGameSound").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

function loadBGMError(err) {
	var dump = "loadBGMError ";
	dump += "code:" + err.code + " ";
	document.getElementById("dumpAreaGameSound").value = dump;
    $("#hidden_api_result").html(dump);
//    document.getElementById("hidden_api_result").value = dump;
}

// BGM再生
function playBGM(track, finishCallback) {
	var options = {};
	options.track = track;
	options.loop = true;
	applican.gamesound.playBGM(options);
    setTimeout(function() {
        finishCallback();
    }, PLAY_BGM_WAIT_TIME);
}

// BGM一時停止
function pauseBGM(track, finishCallback) {
	applican.gamesound.pauseBGM(track);
    setTimeout(function() {
        finishCallback();
    }, PAUSE_SOUND_WAIT_TIME);
}

// BGM終了
function stopBGM(track, finishCallback) {
	applican.gamesound.stopBGM(track);
    setTimeout(function() {
        finishCallback();
    }, STOP_SOUND_WAIT_TIME);
}

// BGMボリューム
function setBGMVolume(track, volume, finishCallback) {
	applican.gamesound.setBGMVolume(track, volume);
    setTimeout(function() {
        finishCallback();
    }, SET_BGM_VOLUME_WAIT_TIME);
}

/** ******************************************************************************** */


/*
* 自動テスト
*/

/** ******************************************************************************** */

// ドコモの基地局から位置情報を取得
function docomoLocation(finishCallback) {
        var successCallback = function(position) {
	    var coords = position.coords;
	    var dump = "";
	    dump += coords.Lat + ' (' + coords.latitude + ')' + " ";
	    dump += coords.Lon + ' (' + coords.longitude + ')' + " ";
	    var address = position.address;
	    dump += address.AreaName + " ";
	    dump += address.AreaCode + " ";
	    dump += address.PostalCode + " ";
	    dump += address.Adr + " ";
	    dump += address.region + " ";
	    dump += address.city + " ";
	    dump += address.street + " ";
	    dump += address.AdrCode + " ";

	    test_result = "OK : " + dump;
        $("#hidden_api_result").html(dump);
        finishCallback();
    };

    function errorCallback(err) {
	    if (err.code === 4001) {
		    test_result = 'OK : DoCoMoの<a href="' + err.message + '" target="_blank">会員メニュー</a>にて、ご利用の端末の位置情報提供を有効にしてください。' + ' ' + err.code + ' ' + err.message;
            $("#hidden_api_result").html(test_result);
	    } else if (err.code > 0) {
		    test_result = 'NG : ' + err.code + ' ' + err.message;
            $("#hidden_api_result").html(test_result);
	    } else {
		    test_result = 'OK(docomoLocationの確認 DoCoMo回線に接続していなければご利用になれません。)' + err.code + ' ' + err.message;
            $("#hidden_api_result").html(test_result);
	    }
        finishCallback();
    };

    var option = {
		APIKey1 : DOCOMO_APIKEY1,
		APIKey2 : DOCOMO_APIKEY2
	};
	applican.docomolocation.getCurrentPosition(successCallback, errorCallback, option);
}

// ///
// 端末情報取得
function checkDeviceInfo(finishCallback) {
	try {
        test_result = "OK";
        checkDeviceInfoResult();
	} catch (e) {
		if (applican.device.name === null || typeof (applican.device.name) === 'undefined') {
			test_result = "NG : " + e;
            $("#hidden_api_result").html(test_result);
		} else {
            checkDeviceInfoResult();
			test_result = "OK : " + e;
		}
	} finally {
        finishCallback();
    }
}

function checkDeviceInfoResult() {
    var dump = "";
    dump += "通信環境：" + applican.connection.type + " ";
    dump += "デバイス名：" + applican.device.name + " ";
    dump += "プラットフォーム：" + applican.device.platform + " ";
    dump += "UUID：" + applican.device.uuid + " ";
    dump += "バージョン：" + applican.device.version + " ";
    dump += "applican：" + applican.device.applican + " ";
    $('#dumpAreaDeviceInfo').val(dump);
    $("#hidden_api_result").html(dump);
}

// ///
// Pushトークンを取得
function getPushToken(finishCallback) {
	try {
		applican.device.getPushToken(getPushTokenSuccess, getPushTokenError, {});
	} catch (e) {
		getPushTokenError("トークンの取得に失敗しました : " + e);
	} finally {
        alert("getPushToken finishCallback");
        waitTestAPI(finishCallback);
    }
}

function getPushTokenSuccess(res) {
	if (res.pushToken) {
        alert("pushTokenSuccess : " + res.pushToken);
		test_result = "OK : " + res.pushToken;
        $("#hidden_api_result").html(test_result);
	} else {
		getPushTokenError(res);
	}
}

function getPushTokenError(res) {
    if(res) {
    	test_result = "NG : " + res;
    } else {
        test_result = "NG";
    }
    $("#hidden_api_result").html(test_result);
}

// ///
// ファイル書き込み (永続的なストレージ)
function fileWrite1(contents, finishCallback) {
    var fileWrite1_fail = function(error) {
	    var dump = "fileWrite1_fail ";
	    dump += "code:" + error.code;
	    console.log(dump);
	    fileWriteStatus = true;
        $("#hidden_api_result").html(dump);
        finishCallback(error);
    };

    var fileWrite1_gotFileWriter = function(writer) {
	    var dump = "fileWrite1_gotFileWriter";
	    console.log(dump);

	    writer.onwritestart = function(evt) {
		    console.log("onwrite test start");
	    };
	    writer.onabort = function(evt) {
		    console.log("onabort");
	    };
	    writer.onwrite = function(evt) {
		    console.log("onwrite");
	    };
	    writer.onerror = function(evt) {
		    console.log("onerror");
	    };

	    writer.onwriteend = function(evt) {
		    console.log("onwrite end");
	    };
	    console.log(writeContents);
	    writer.write(writeContents);
	    oldContents = writeContents;
	    fileWriteStatus = true;
        $("#hidden_api_result").html(dump);
        finishCallback();
    };

    var fileWrite1_gotFileEntry = function(fileEntry) {
	    fileEntry.createWriter(fileWrite1_gotFileWriter, fileWrite1_fail);
    };

    var fileWrite1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile(FILE_NAME, {
		    create : true,
		    exclusive : false
	    }, fileWrite1_gotFileEntry, fileWrite1_fail);
    };

    writeContents = oldContents + contents;
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileWrite1_gotFS, fileWrite1_fail);
}

/** ************************************************************ */

// ///
// ファイル書き込み (永続的なストレージ)
function fileWriteTest(finishCallback) {
    var fileWriteTest_fail = function(error) {
	    var dump = "fileWrite1_fail";
	    dump += "code:" + error.code;
	    console.log(dump);
        $("#hidden_api_result").html(dump);
    };

    var fileWrite1_gotFileWriter = function(writer) {
	    var dump = "fileWrite1_gotFileWriter";
	    console.log(dump);

	    writer.onwritestart = function(evt) {
		    console.log("onwrite test start");
	    };
	    writer.onabort = function(evt) {
		    console.log("onabort");
	    };
	    writer.onwrite = function(evt) {
		    console.log("onwrite");
	    };
	    writer.onerror = function(evt) {
		    console.log("onerror");
	    };

	    writer.onwriteend = function(evt) {
		    console.log("onwrite end");
	    };
	    console.log(writeContents);
	    writer.write(writeContents);
	    oldContents = writeContents;
	    fileWriteStatus = true;
        $("#hidden_api_result").html(dump);
        finishCallback();
    };

    var fileWrite1_gotFileEntry = function(fileEntry) {
	    fileEntry.createWriter(fileWrite1_gotFileWriter, fileWrite1_fail);
    };

    var fileWriteTest_gotFS = function(fileSystem) {
	    fileSystem.root.getFile("readme.txt", {
		    create : true,
		    exclusive : false
	    }, fileWrite1_gotFileEntry, fileWrite1_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileWriteTest_gotFS, fileWriteTest_fail);
    waitTestAPI(finishCallback);
}

/** ************************************************************ */

// ///
// ファイル書き込み (一時的なストレージ)
function fileWrite2(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.TEMPORARY, 0, fileWrite2_gotFS, fileWrite2_fail);
    waitTestAPI(finishCallback);
}

function fileWrite2_gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", {
		create : true,
		exclusive : false
	}, fileWrite2_gotFileEntry, fileWrite2_fail);
}

function fileWrite2_gotFileEntry(fileEntry) {
	fileEntry.createWriter(fileWrite2_gotFileWriter, fileWrite2_fail);
}

function fileWrite2_gotFileWriter(writer) {
	var dump = "fileWrite2_gotFileWriter";
//	document.getElementById("dumpAreaFile").value = dump;

	writer.onwriteend = function(evt) {
		document.getElementById("dumpAreaFile").value += "ファイルの内容が 'some sample text' となりました ";
	};
	writer.write("some sample text 2");
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function fileWrite2_fail(error) {
	var dump = "fileWrite2_fail";
	dump += "code:" + error.code;
//	document.getElementById("dumpAreaFile").value = dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// ファイル読み込み (永続的なストレージ)
function fileRead1(finishCallback) {
    var fileRead1_fail = function (error) {
	    var dump = "fileRead1_fail ";
	    dump += "code:" + error.code + " ";
	    console.log(dump);
	    test_result = "NG : " + error.code;
        $("#hidden_api_result").html(dump);
        finishCallback(error);
    };

    var fileRead1_gotFile = function(file) {
	    var dump = "fileRead1_gotFile";
	    console.log(dump);
        console.log(file);

        async.series([
            function(callback) {
	            var reader = new FileReader();
                console.log("fileRead1_reaAsText");

	            reader.onloadend = function(evt) {
                    if (evt.target.result) {
                        var dump = "テキストとして読み込み" + evt.target.result;
                        console.log(evt.target.result);
                        console.log(dump);
                        TEST_RESULT = TEST_RESULT + evt.target.result + " ";
                        if (evt.target.result) {
                            test_result = "OK : " + evt.target.result;
                        } else {
                            test_result = "NG : " + evt.target.result;
                        }

                    } else {
                        dump = "file readAsText fail";
                    }
                    $("#hidden_api_result").html(dump);
                    callback();
	                };
	            reader.readAsText(file);
            },
            function(callback) {
 	            var reader = new FileReader();
	            reader.onloadend = function(evt) {
                    if(evt.target.result) {
                        var dump = "データ URL として読み込み : " + evt.target.result;
                        console.log(dump);
                    } else {
                        dump = "file readDataUrl fail";
                    }

                    $("#hidden_api_result").html(dump);
                    callback();
	                };
	            reader.readAsDataURL(file);
            }
        ],
        function() {
            finishCallback();
        });
    };

    var fileRead1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile(FILE_NAME, null, fileRead1_gotFileEntry, fileRead1_fail);
    };

    var fileRead1_gotFileEntry = function(fileEntry) {
	    fileEntry.file(fileRead1_gotFile, fileRead1_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileRead1_gotFS, fileRead1_fail);
    //waitTestAPI(finishCallback);
}

// ファイル読み込み (一時的なストレージ)
function fileRead2(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileRead2_gotFS, fileRead2_fail);
    waitTestAPI(finishCallback);
}

function fileRead2_gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", null, fileRead2_gotFileEntry, fileRead2_fail);
}

function fileRead2_gotFileEntry(fileEntry) {
	fileEntry.file(fileRead2_gotFile, fileRead2_fail);
}

function fileRead2_gotFile(file) {
//	document.getElementById("dumpAreaFile").value = "fileRead2_gotFile "

	fileRead2_readAsText(file);
	fileRead2_readDataUrl(file);
}

function fileRead2_readDataUrl(file) {
	var reader = new FileReader();
    var dump;
	reader.onloadend = function(evt) {
        if(evt.target.result) {
            dump = "データ URL として読み込み " + evt.target.result + " ";
        } else {
            dump = "file read2 readDataUrl fail";
        }
        $("#hidden_api_result").html(dump);
	};
	reader.readAsDataURL(file);
}

function fileRead2_readAsText(file) {
	var reader = new FileReader();
    var dump;
	reader.onloadend = function(evt) {
        if (evt.target.result) {
            dump = "テキストとして読み込み " + evt.target.result + " ";
        } else {
            dump = "file read2 readAsText faile";
        }
        $("#hidden_api_result").html(dump);
	};
	reader.readAsText(file);
}

function fileRead2_fail(error) {
	var dump = "fileRead2_fail ";
	dump += "code:" + error.code + " ";
//	document.getElementById("dumpAreaFile").value = dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// ファイル一覧
function directoryReader1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, directoryReader1_gotFS, directoryReader1_fail);
    waitTestAPI(finishCallback);
}

function directoryReader1_gotFS(fileSystem) {
	var directoryReader = fileSystem.root.createReader();
	directoryReader.readEntries(directoryReader1_readEntries, directoryReader1_fail);
}

function directoryReader1_readEntries(entries) {
	// var dump = "directoryReader1_readEntries ";
	// document.getElementById("dumpAreaFile").value = dump;
	var dump;

	var i;
	for ( i = 0; i < entries.length; i++) {
		// document.getElementById("dumpAreaFile").value += entries[i].name + (entries[i].isDirectory ? "/" : "") + " ";
		dump = entries[i].name + (entries[i].isDirectory ? "/" : "") + " ";
	}
//    document.getElementById("hidden_api_result").value = dump;
    test_result = "OK : " + dump;
    $("#hidden_api_result").html(dump);
}

function directoryReader1_fail(error) {
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
	// alert("directoryReader1_fail: " + error.code);
}

// ファイル削除
function deleteFile1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, deleteFile1_gotFS, deleteFile1_fail);
    waitTestAPI(finishCallback);
}

function deleteFile1_gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", null, deleteFile1_gotFileEntry, deleteFile1_fail);
}

function deleteFile1_gotFileEntry(fileEntry) {
	fileEntry.remove(deleteFile1_removeSuccess, deleteFile1_fail);
}

function deleteFile1_removeSuccess() {
	var dump = "deleteFile1_removeSuccess ";
//	document.getElementById("dumpAreaFile").value = dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function deleteFile1_fail(error) {
	test_result = "NG : delete file fail " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
	// alert("deleteFile1_fail: " + error.code);
}

// ファイル移動
function moveTo1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, moveTo1_gotFS, moveTo1_fail);
    waitTestAPI(finishCallback);
}

function moveTo1_gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", null, moveTo1_gotFileEntry, moveTo1_fail);
}

function moveTo1_gotFileEntry(fileEntry) {
	var tmp = fileEntry.fullPath;
	var parentPath = tmp.substring(0, tmp.lastIndexOf('/'));
	var parentName = parentPath.substring(parentPath.lastIndexOf('/') + 1);
	var parentEntry = new DirectoryEntry(parentName, parentPath);
	fileEntry.moveTo(parentEntry, "readme2.txt", moveTo1_moveToSuccess, moveTo1_fail);
}

function moveTo1_moveToSuccess(entry) {
	// var dump = "moveTo1_moveToSuccess ";
	var dump = "";
	dump += entry.name + " " + entry.fullPath + "";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function moveTo1_fail(error) {
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ファイルコピー
function copyTo1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, copyTo1_gotFS, copyTo1_fail);
    waitTestAPI(finishCallback);
}

function copyTo1_gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", null, copyTo1_gotFileEntry, copyTo1_fail);
}

function copyTo1_gotFileEntry(fileEntry) {
	var tmp = fileEntry.fullPath;
	var parentPath = tmp.substring(0, tmp.lastIndexOf('/'));
	var parentName = parentPath.substring(parentPath.lastIndexOf('/') + 1);
	var parentEntry = new DirectoryEntry(parentName, parentPath);
	fileEntry.copyTo(parentEntry, "readme3.txt", copyTo1_copyToSuccess, copyTo1_fail);
}

function copyTo1_copyToSuccess(entry) {
	// var dump = "copyTo1_copyToSuccess ";
	var dump = "";
	dump += entry.name + " " + entry.fullPath + " ";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function copyTo1_fail(error) {
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ファイルtoURL
function toURL1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, toURL1_gotFS, toURL1_fail);
    waitTestAPI(finishCallback);
}

function toURL1_gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", null, toURL1_gotFileEntry, toURL1_fail);
}

function toURL1_gotFileEntry(fileEntry) {
	var fileURL = fileEntry.toURL();
	var dump = "toURL1_gotFileEntry ";
	dump += fileURL + " ";
	console.log(dump);
    test_result = "OK : toURL";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function toURL1_fail(error) {
	test_result = "NG : toURL fail " + error.code;
	// alert("toURL1_fail: " + error.code);
}

// 親ディレクトリ
function getParent1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getParent1_gotFS, getParent1_fail);
    waitTestAPI(finishCallback);
}

function getParent1_gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", null, getParent1_gotFileEntry, getParent1_fail);
}

function getParent1_gotFileEntry(fileEntry) {
	fileEntry.getParent(getParent1_getParentSuccess, getParent1_fail);
}

function getParent1_getParentSuccess(entry) {
	var dump = "getParent1_getParentSuccess ";
	dump += entry.name + " " + entry.fullPath + " ";
    test_result = dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function getParent1_fail(error) {
	test_result = "NG getParent fail " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ファイルアップロード
function upload1(finishCallback) {
    var upload1_uploadSuccess = function(result) {
	    var dump = "upload1_uploadSuccess ";
	    dump += "responseCode:" + result.responseCode + " ";
	    dump += "response:" + result.response + " ";
	    dump += "bytesSent:" + result.bytesSent + " ";
	    uploadStatus = true;
	    console.log(dump);
        test_result = dump;
        $("#hidden_api_result").html(dump);

        finishCallback();
    };

    var upload1_gotFileEntry = function(fileEntry) {
	    var options = new FileUploadOptions();
	    options.fileKey = "file";
	    options.fileName = FILE_NAME;
	    options.mimeType = "text/plain";

	    var params = {};
	    params.value1 = "test";
	    params.value2 = "param";

	    options.params = params;

	    var ft = new FileTransfer();

	    ft.onprogress = function(evt) {
		    console.log(evt.loaded + "\/" + evt.total + " ");
	    };

	    ft.upload(fileEntry.fullPath, encodeURI(UPLOAD_URL), upload1_uploadSuccess, upload1_fail, options);
    };

    var upload1_fail = function(error) {
	    var dump = "upload1_fail ";
	    dump += "code:" + error.code + " ";
	    dump += "source:" + error.source + " ";
	    dump += "target:" + error.target + " ";
	    dump += "http_status:" + error.http_status + " ";
	    uploadStatus = true;
	    console.log(dump);
        $("#hidden_api_result").html(dump);
        finishCallback(error);
    };

    var upload1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile(FILE_NAME, null, upload1_gotFileEntry, upload1_fail);
    }

    applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        upload1_gotFS,
        upload1_fail);
}

// ファイルダウンロード
function download1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, download1_gotFS, download1_fail);
    waitTestAPI(finishCallback);
}

function download1_gotFS(fileSystem) {
	var filePath = fileSystem.root.fullPath + "/readme_dl.txt";
	var ft = new FileTransfer();

	ft.onprogress = function(evt) {
        $("#hidden_api_result").html(evt.loaded + "/" + evt.total);
	};

	ft.download(encodeURI("http://www.applican.com/trunk/tester/dt.mp4"), filePath, download1_downloadSuccess, download1_fail);
}

function download1_downloadSuccess(entry) {
	var dump = "download1_downloadSuccess ";
	dump += entry.name + " " + entry.fullPath;
    $("#hidden_api_result").html(dump);
}

function download1_fail(error) {
	var dump = "download1_fail ";
	dump += "code:" + error.code + " ";
	dump += "source:" + error.source + " ";
	dump += "target:" + error.target + " ";
	dump += "http_status:" + error.http_status + " ";
    $("#hidden_api_result").html(dump);
}

// ファイルダウンロードを中断
function abort1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, abort1_gotFS, abort1_downloadFail);
    waitTestAPI(finishCallback);
}

function abort1_gotFS(fileSystem) {
	var filePath = fileSystem.root.fullPath + "/sample.zip";
	var ft = new FileTransfer();
	ft.onprogress = function(evt) {
        $("#hidden_api_result").html(evt.loaded + "/" + evt.total);
	};
	ft.download(encodeURI("http://www.applican.com/trunk/tester/html5_sample_20121114.zip"), filePath, abort1_downloadSuccess, abort1_downloadFail);

	ft.abort(abort1_abortSuccess, abort1_abortFail);
}

function abort1_downloadSuccess(entry) {
	var dump = "abort1_downloadSuccess ";
	dump += entry.name + " " + entry.fullPath;
    $("#hidden_api_result").html(dump);
}

function abort1_downloadFail(error) {
	var dump = "abort1_downloadFail ";
	dump += "code:" + error.code + " ";
    $("#hidden_api_result").html(dump);
}

function abort1_abortSuccess() {
	var dump = "abort1_abortSuccess ";
    $("#hidden_api_result").html(dump);
}

function abort1_abortFail() {
	var dump = "abort1_abortFail ";
    $("#hidden_api_result").html(dump);
}

// ファイルアップロードを中断
function abort2(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, abort2_gotFS, abort2_uploadFail);
    waitTestAPI(finishCallback);
}

function abort2_gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", null, abort2_gotFileEntry, abort2_uploadFail);
}

function abort2_gotFileEntry(fileEntry) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = "readme.txt";
	options.mimeType = "text/plain";

	var params = {};
	params.value1 = "test";
	params.value2 = "param";

	options.params = params;

	var ft = new FileTransfer();

	ft.onprogress = function(evt) {
		document.getElementById("dumpAreaFile").value = evt.loaded + "/" + evt.total;
	};

	ft.upload(fileEntry.fullPath, encodeURI("http://192.168.10.225/file.php"), abort2_uploadSuccess, abort2_uploadFail, options);

	ft.abort(abort2_abortSuccess, abort2_abortFail);
}

function abort2_uploadSuccess(result) {
	var dump = "abort2_uploadSuccess ";
	dump += result.responseCode + " " + result.response + " " + result.bytesSent;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function abort2_uploadFail(error) {
	var dump = "abort2_uploadFail ";
	dump += "code:" + error.code + " ";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function abort2_abortSuccess() {
	var dump = "abort2_abortSuccess ";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function abort2_abortFail() {
	var dump = "abort2_abortFail ";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// ディレクトリ作成
function mkdir1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, mkdir1_gotFS, mkdir1_fail);
    waitTestAPI(finishCallback);
}

function mkdir1_gotFS(fileSystem) {
	fileSystem.root.getDirectory("newDir", {
		create : true,
		exclusive : false
	}, mkdir1_getDirectory, mkdir1_fail);
}

function mkdir1_getDirectory(directoryEntry) {
	var dump = "mkdir1_getDirectory " + directoryEntry.name + " " + directoryEntry.fullPath + " ";
    test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function mkdir1_fail(error) {
	test_result = "NG mkdir fail " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

//ディレクトリ内にディレクトリ作成
function mkdirInDir(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, mkdirInDir_gotFS, mkdirInDir_fail);
    waitTestAPI(finishCallback);
}

function mkdirInDir_gotFS(fileSystem) {
	fileSystem.root.getDirectory("newDir/inDir", {
		create : true,
		exclusive : false
	}, mkdirInDir_getDirectory, mkdirInDir_fail);
}

function mkdirInDir_getDirectory(directoryEntry) {
	var dump = "mkdirInDir_getDirectory " + directoryEntry.name + " " + directoryEntry.fullPath + " ";
    $("#hidden_api_result").html(dump);
	// document.getElementById("dumpAreaFile").value = dump;
}

function mkdirInDir_fail(error) {
    $("#hidden_api_result").html(error);
	//    alert("mkdir1_fail: " + error.code);
}

// ディレクトリ削除(Recursively)
function rmdir1(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, rmdir1_gotFS, rmdir1_fail);
    waitTestAPI(finishCallback);
}

function rmdir1_gotFS(fileSystem) {
	fileSystem.root.getDirectory("newDir", null, rmdir1_getDirectory, rmdir1_fail);
}

function rmdir1_getDirectory(directoryEntry) {
	directoryEntry.removeRecursively(rmdir1_removeRecursivelySuccess, rmdir1_fail);
}

function rmdir1_removeRecursivelySuccess() {
	var dump = "rmdir1_removeRecursivelySuccess ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function rmdir1_fail(error) {
	test_result = "NG rmdir fail " + error.code;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(test_result);
}

// ディレクトリ削除
function rmdir2(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, rmdir2_gotFS, rmdir2_fail);
    waitTestAPI(finishCallback);
}

function rmdir2_gotFS(fileSystem) {
	fileSystem.root.getDirectory("newDir", null, rmdir2_getDirectory, rmdir2_fail);
}

function rmdir2_getDirectory(directoryEntry) {
	directoryEntry.remove(rmdir2_removeSuccess, rmdir2_fail);
}

function rmdir2_removeSuccess() {
	var dump = "rmdir2_removeSuccess ";
	console.log(dump);
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function rmdir2_fail(error) {
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ディレクトリ移動
function moveTo2(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, moveTo2_gotFS, moveTo2_fail);
    waitTestAPI(finishCallback);
}

function moveTo2_gotFS(fileSystem) {
	fileSystem.root.getDirectory("newDir", null, moveTo2_getDirectory, moveTo2_fail);
}

function moveTo2_getDirectory(directoryEntry) {
	var tmp = directoryEntry.fullPath;
	var parentPath = tmp.substring(0, tmp.lastIndexOf('/'));
	var parentName = parentPath.substring(parentPath.lastIndexOf('/') + 1);
	var parentEntry = new DirectoryEntry(parentName, parentPath);
	directoryEntry.moveTo(parentEntry, "newDir2", moveTo2_moveToSuccess, moveTo2_fail);
}

function moveTo2_moveToSuccess(entry) {
	var dump = "moveTo2_moveToSuccess ";
	dump += entry.name + " " + entry.fullPath + " ";
	test_result = "OK : " + entry.name + " " + entry.fullPath;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function moveTo2_fail(error) {
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ディレクトリコピー
function copyTo2(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, copyTo2_gotFS, copyTo2_fail);
    waitTestAPI(finishCallback);
}

function copyTo2_gotFS(fileSystem) {
	fileSystem.root.getDirectory("newDir", null, copyTo2_getDirectory, copyTo2_fail);
}

function copyTo2_getDirectory(directoryEntry) {
	var tmp = directoryEntry.fullPath;
	var parentPath = tmp.substring(0, tmp.lastIndexOf('/'));
	var parentName = parentPath.substring(parentPath.lastIndexOf('/') + 1);
	var parentEntry = new DirectoryEntry(parentName, parentPath);
	directoryEntry.copyTo(parentEntry, "newDir3", copyTo2_copyToSuccess, copyTo2_fail);
}

function copyTo2_copyToSuccess(entry) {
	var dump = "copyTo2_copyToSuccess ";
	dump += entry.name + " " + entry.fullPath + " ";
	test_result = "OK : " + entry.name + " " + entry.fullPath;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function copyTo2_fail(error) {
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ディレクトリtoURL
function toURL2(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, toURL2_gotFS, toURL2_fail);
    waitTestAPI(finishCallback);
}

function toURL2_gotFS(fileSystem) {
	fileSystem.root.getDirectory("newDir", null, toURL2_getDirectory, toURL2_fail);
}

function toURL2_getDirectory(directoryEntry) {
	var directoryURL = directoryEntry.toURL();
	var dump = "toURL2_getDirectory ";
	dump += directoryURL + " ";
	console.log(dump);
    test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function toURL2_fail(error) {
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(test_result);
}

// 親ディレクトリ
function getParent2(finishCallback) {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getParent2_gotFS, getParent2_fail);
    waitTestAPI(finishCallback);
}

function getParent2_gotFS(fileSystem) {
	fileSystem.root.getDirectory("newDir", null, getParent2_getDirectory, getParent2_fail);
}

function getParent2_getDirectory(directoryEntry) {
	directoryEntry.getParent(getParent2_getParentSuccess, getParent2_fail);
}

function getParent2_getParentSuccess(entry) {
	var dump = "getParent2_getParentSuccess ";
	dump += entry.name + " " + entry.fullPath + "";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function getParent2_fail(error) {
	test_result = "NG : " + error.code;
    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ///////////////////
// 画面のサイズと向き
function getDisplayInfo(finishCallback) {
	console.log("getDisplayInfo");
	try {
		applican.device.getDisplayInfo(getDisplayInfo_success, getDisplayInfo_error);
	} catch (e) {
		getDisplayInfo_error(e);
	} finally {
        waitTestAPI(finishCallback);
    }
}

function getDisplayInfo_success(info) {
	// var dump = "getDisplayInfo_success ";
	var dump = "";
	dump += "orientation:" + info.orientation + " ";
	dump += "width:" + info.width + " ";
	dump += "height:" + info.height + " ";
	console.log("getDisplayInfo success " + dump);
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function getDisplayInfo_error(e) {
	test_result = "NG : " + e;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// /////////////////
// Http通信
// GET
function httpGet(finishCallback) {
	var options = {
		timeout : 10000
	};
	applican.http.get(getURL, options, httpGetSuccess, httpGetError);
    waitTestAPI(finishCallback);
}

function httpGetSuccess(result) {
	var dump = "httpGetSuccess ";
	dump += "result:" + result + " ";
	if (dump.indexOf('Success') > 0) {
		test_result = "OK : " + result;
//        document.getElementById("hidden_api_result").value = dump;
        $("#hidden_api_result").html(dump);
	} else {
		httpGetError(result);
	}
	// document.getElementById("dumpAreaLaunchHttp").value = dump;
}

function httpGetError(message) {
	var dump = "httpGetError ";
	dump += "code:" + message + " ";
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// POST
function httpPost(finishCallback) {
	var postData = {
		param1 : "applican",
		param2 : "test"
	};
	var options = {
		post : postData,
		timeout : 10000
	};
	applican.http.post(postURL, options, httpPostSuccess, httpPostError);
    waitTestAPI(finishCallback);
}

function httpPostSuccess(result) {
	// var dump = "httpPostSuccess ";
	var dump = "";
	dump += "result:" + result + " ";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function httpPostError(message) {
	// var dump = "httpPostError ";
	var dump = "";
	dump += "code:" + message + " ";
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// ///////////////////
// WiFiの状態を取得
function getWiFiStatus(finishCallback) {
	applican.wifi.getStatus(getWiFiStatus_Success, getWiFiStatus_Error);
    waitTestAPI(finishCallback);
}

function getWiFiStatus_Success(status) {
	var dump = "getWiFiStatus_callback ";
	dump += "status:" + status + " ";
	test_result = "OK : " + status;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
	// document.getElementById("dumpAreaWiFi").value = dump;
}

function getWiFiStatus_Error(error) {
	var dump = "getWiFiStatus_Error ";
	dump += "code:" + error.code + " ";
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// WiFiをON
function onWiFi(finishCallback) {
	applican.wifi.on(onWiFi_Success, onWiFi_Error);
    waitTestAPI(finishCallback);
}

function onWiFi_Success() {
	var dump = "onWiFi_Success ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function onWiFi_Error(error) {
	var dump = "onWiFi_Error ";
	dump += "code:" + error.code + " ";
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// WiFiをOFF
function offWiFi(finishCallback) {
	applican.wifi.off(offWiFi_Success, offWiFi_Error);
    waitTestAPI(finishCallback);
}

function offWiFi_Success() {
	var dump = "offWiFi_Success ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function offWiFi_Error(error) {
	var dump = "offWiFi_Error ";
	dump += "code:" + error.code + " ";
	test_result = "NG : " + error.code;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 周囲のSSID一覧を取得
function getSSIDList(finishCallback) {
	applican.wifi.getSSIDList(getSSIDList_Success, getSSIDList_Error);
    waitTestAPI(finishCallback);
}

function getSSIDList_Success(result) {
	// var dump = "getSSIDList_Success ";
	var dump = "";
	var cnt = result.length;
	dump += "num: " + cnt + " ";
	for (var i = 0; i < cnt; i++) {
		dump += "SSID: " + result[i] + " ";
	}
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function getSSIDList_Error(err) {
	// var dump = "getSSIDList_Error ";
	var dump = "";
	dump += "code:" + err.code + " ";
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 現在接続中のSSIDを取得
function getCurrentSSID(finishCallback) {
	applican.wifi.getCurrentSSID(getCurrentSSID_Success, getCurrentSSID_Error);
    waitTestAPI(finishCallback);
}

function getCurrentSSID_Success(result) {
	// var dump = "getCurrentSSID_Success ";
	var dump = "";
	dump += "SSID: " + result + "";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function getCurrentSSID_Error(err) {
	// var dump = "getCurrentSSID_Error ";
	var dump = "";
	dump += "code:" + err.code + "";
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// Wifi設定を登録して接続(WPA)
function connectWifi1(finishCallback) {
	var options = {};
	options.ssid = WIFI_WPA_SSID;
	options.security = applican.wifi.SecurityType.WPA;
	options.password = WIFI_WPA_SSID_PASSWD;

	applican.wifi.connect(connectWifi_Success, connectWifi_Error, options);
    waitTestAPI(finishCallback);
}

function connectWifi_Success(result) {
	// var dump = "connectWifi_Success ";
	var dump = "";
	dump += "result: " + result + "";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function connectWifi_Error(err) {
	// var dump = "connectWifi_Error ";
	var dump = "";
	dump += "code:" + err.code + "";
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// Wifi設定を登録して接続(WEP)
function connectWifi2(finishCallback) {
	var options = {};

	options.ssid = "applicantest2";
	options.security = applican.wifi.SecurityType.WEP;
	options.password = "8756102394858";

	// options.ssid = "applicantest3";
	// options.security = "NONE";

	applican.wifi.connect(connectWifi_Success, connectWifi_Error, options);
    waitTestAPI(finishCallback);
}

// Wifi設定を登録するだけ
function connectWifi3(finishCallback) {

	var options = {};
	options.ssid = "applicantest3";
	options.security = "WEP";
	options.password = "1234567890123";
	options.allowConnect = false;

	applican.wifi.connect(connectWifi_Success, connectWifi_Error, options);
    waitTestAPI(finishCallback);
}

// ///////////////////
// Globalization
// 言語
function getPreferredLanguage(finishCallback) {
	applican.globalization.getPreferredLanguage(getPreferredLanguageSuccess, getPreferredLanguageError);
    waitTestAPI(finishCallback);
}

function getPreferredLanguageSuccess(language) {
	var dump = "getPreferredLanguageSuccess ";
	dump += "language:" + language.value + " ";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function getPreferredLanguageError(err) {
	var dump = "getPreferredLanguageError ";
	dump += "code:" + err.code + " ";
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 現在のロケール
function getLocaleName(finishCallback) {
	applican.globalization.getLocaleName(getLocaleNameSuccess, getLocaleNameError);
    waitTestAPI(finishCallback);
}

function getLocaleNameSuccess(locale) {
	// var dump = "getLocaleNameSuccess ";
	var dump = "";
	dump += "locale:" + locale.value + "";
	if (dump.indexOf('ja_JP') > 0) {
		test_result = "OK : " + dump;
//        document.getElementById("hidden_api_result").value = dump;
        $("#hidden_api_result").html(dump);
	} else {
		getLocaleNameError(locale);
	}
	// document.getElementById("dumpAreaGlobalization").value =
	// dump;
}

function getLocaleNameError(err) {
	// var dump = "getLocaleNameError ";
	var dump = "";
	dump += "code:" + err.code + "";
	test_result = "NG : " + dump;
    $("#hidden_api_result").html(dump);
}

// ///////////////////
// データベース
var db = null;
var testResultDB = null;
function openDb(name, finishCallback) {
    var openDb_success = function(db_obj) {
	    db = db_obj;
	    var dump = "";
	    dump += db.name + "";
	    test_result = "OK : " + dump;
        $("#hidden_api_result").html(dump);
        finishCallback();
    };

    var openDb_error = function(error) {
	    var dump = "";
	    dump += error.message + " ";
	    test_result = "OK : " + dump;
        $("#hidden_api_result").html(dump);
        finishCallback(error);
    };

    var dbName = "testdb";
    if(name) {
        dbName = name;
    }
	applican.openDatabase(dbName, openDb_success, openDb_error);
}

function createTable(finishCallback) {
    var createTable_success = function(result) {
	    var dump = "createTable_success ";
	    test_result = "OK";
        $("#hidden_api_result").html(dump);
        finishCallback();
    };

    var createTable_error = function(error) {
	    var dump = "createTable_error ";
	    dump += error.message + " ";
	    test_result = "OK : " + dump;
        $("#hidden_api_result").html(dump);
        finishCallback(error);
    };

    var sql = "CREATE TABLE IF NOT EXISTS DEMO (id unique, data, data2)";
	db.exec(sql, createTable_success, createTable_error);
}

function dropTable(finishCallback) {
	if (db === null) {
		test_result = "NG : データベースを開いていません";
		// alert('データベースを開いていません');
		return;
	}
	var sql = "DROP TABLE IF EXISTS DEMO";
	db.exec(sql, dropTable_success, dropTable_error);
    waitTestAPI(finishCallback);
}

function dropTable_success(result) {
	var dump = "dropTable_success ";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function dropTable_error(error) {
	var dump = "createTable_error ";
	dump += error.message + " ";
    test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function insertData(finishCallback) {
	if (db === null) {
		test_result = "NG : データベースを開いていません";
		// alert('データベースを開いていません');
		return;
	}
	var sql = "INSERT INTO DEMO (id, data, data2) VALUES (1, 'First row', NULL)";
	db.exec(sql, insertData_success, insertData_error);
    waitTestAPI(finishCallback);
}

function insertData_success(result) {
	var dump = "insertData_success ";
    if(applican.config.debug) {
        dump += "insertId:" + result;
    } else {
        dump += "insertId:" + result.insertId + " ";
    }
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function insertData_error(error) {
	var dump = "insertData_error ";
	dump += error.message + " ";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
    test_result = "NG : " + dump;
}

function deleteData(finishCallback) {
	if (db === null) {
		test_result = "NG : データベースを開いていません";
		// alert('データベースを開いていません');
		return;
	}
	var sql = "DELETE FROM DEMO";
	db.exec(sql, deleteData_success, deleteData_error);
    waitTestAPI(finishCallback);
}

function deleteData_success(result) {
	var dump = "deleteData_success ";
	dump += "rowsAffected:" + result.rowsAffected + " ";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function deleteData_error(error) {
	var dump = "deleteData_error ";
	dump += error.message + " ";
    test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 一括処理
function execTransaction(finishCallback) {
	if (db === null) {
		test_result = "NG : データベースを開いていません";
		// alert('データベースを開いていません');
		return;
	}
	var sqls = ["DROP TABLE IF EXISTS DEMO", "CREATE TABLE IF NOT EXISTS DEMO (id unique, data, data2)", "INSERT INTO DEMO (id, data, data2) VALUES (1, 'First row', NULL)", "INSERT INTO DEMO (id, data, data2) VALUES (2.1, 'Second row', 'test')"];
	db.execTransaction(sqls, execTransaction_success, execTransaction_error);
    waitTestAPI(finishCallback);
}

function execTransaction_success(result) {
	var dump = "execTransaction_success ";
	dump += "rowsAffected:" + result.rowsAffected + " ";
	dump += "insertId:" + result.insertId + " ";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function execTransaction_error(error) {
	var dump = "execTransaction_error ";
	dump += error.message + " ";
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function searchData(finishCallback) {
	if (db === null) {
		test_result = "NG : データベースを開いていません";
		return;
	}
	var sql = "SELECT * FROM DEMO";
	db.query(sql, searchData_success, searchData_error);
    waitTestAPI(finishCallback);
}

function searchData_success(result) {
	var cnt = result.rows.length;
	var dump = "";
	dump += "row cnt:" + cnt + " ";
	for (var i = 0; i < cnt; i++) {
		dump += "id:" + result.rows[i].id + ", data:" + result.rows[i].data + ", data2:" + result.rows[i].data2 + " ";
	}
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function searchData_error(error) {
	var dump = "searchData_error ";
	dump += error.message + " ";
    test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// ///////////////////
// 連絡先を作成
function createContact(finishCallback) {
	var myContact = applican.contacts.create({
		"displayName" : "Test User"
	});
	myContact.note = "この連絡先のメモ";
	var dump = "createContact ";
	dump += myContact.displayName + " ";
	dump += myContact.note + " ";
	if (dump) {
		test_result = "OK : " + dump;
	} else {
		test_result = "NG : " + dump;
	}
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
    setTimeout(function() {
        finishCallback();
    }, CREATE_CONTACT_WAIT_TIME);
}

// 連絡先を検索
function findContact(finishCallback) {
	var options = new ContactFindOptions();
	options.filter = "テスト鈴木";
	options.multiple = true;
	var fields = ["*"];
	applican.contacts.find(fields, findContact_success, findContact_error, options);
    waitTestAPI(finishCallback);
}

function findContact_success(contacts) {
	// var dump = "findContact_success ";
	var dump = "";
	console.log(contacts);

	for (var i = 0; i < contacts.length; i++) {
		dump += contacts[i].displayName + " ";
		if (contacts[i].urls && contacts[i].urls.length > 0) {
			dump += contacts[i].urls[0].value + " ";
		}
	}
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function findContact_error() {
	var dump = "findContact_error ";
	test_result = "NG";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 連絡先を保存
function saveContact(finishCallback) {
	var myContact = applican.contacts.create({"displayName": "Test User"});
	myContact.displayName = "Test displayName 1";
	myContact.nickname = "Test nickname 1";
	myContact.note = "この連絡先のメモ";

	var name = new ContactName();
	name.givenName = "一郎";
	name.familyName = "テスト鈴木";
	myContact.name = name;

	var address = new ContactAddress();
	address.pref = false;
	address.type = "home";
	address.formatted = "";
	address.streetAddress = "東1-26-30";
	address.locality = "渋谷区";
	address.region = "東京都";
	address.postalCode = "1500011";
	address.country = "日本";

	var address2 = new ContactAddress();
	address2.pref = false;
	address2.type = "work";
	address2.formatted = "";
	address2.streetAddress = "東1-26-30";
	address2.locality = "渋谷区";
	address2.region = "東京都";
	address2.postalCode = "1500011";
	address2.country = "日本";
	myContact.addresses = [address, address2];

	var phone = new ContactField("home", "1234567890", false);
	var phone2 = new ContactField("work", "77777777777", false);
	var phone3 = new ContactField("カスタム", "0399998888", false);
	myContact.phoneNumbers = [phone, phone2, phone3];

	var url = new ContactField("home", "http://google.co.jp/", false);
	var url2 = new ContactField("work", "http://www.yahoo.co.jp/", false);
	myContact.urls = [url, url2];

	var email = new ContactField("home", "hoge@mail.com", false);
	var email2 = new ContactField("work", "support@applican.com", false);
	myContact.emails = [email, email2];

	var im = new ContactField("Skype", "1234", false);
	var im2 = new ContactField("Facebook", "4444", false);
	myContact.ims = [im, im2];

	var organization = new ContactOrganization();
	organization.type = "work";
	organization.name = "ニューフォリア";
	organization.department = "営業部";
	organization.title = "部長";
	myContact.organizations = [organization];

	myContact.birthday = new Date("1980/01/01");

	var photo = new ContactField("url", "http://www.applican.com/trunk/tester/picture.jpg", true);

	myContact.photos = [photo];

	myContact.save(saveContact_onSuccess, saveContact_onError);
    waitTestAPI(finishCallback);
}

function saveContact_onSuccess() {
	var dump = "saveContact_onSuccess ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function saveContact_onError() {
	var dump = "saveContact_onError ";
	test_result = "NG" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 連絡先を削除
function removeContact(finishCallback) {
	var options = new ContactFindOptions();
	options.filter = "テスト鈴木";
	options.multiple = true;
	var fields = ["id", "displayName", "name"];
	applican.contacts.find(fields, removeContact_findSuccess, removeContact_error, options);
    waitTestAPI(finishCallback);
}

function removeContact_findSuccess(contacts) {
    var dump = "";
	for (var i = 0; i < contacts.length; i++) {
        dump += contacts[i].id + "," + contacts[i].displayName + " ";
//		document.getElementById("dumpAreaContacts").value += contacts[i].id + "," + contacts[i].displayName + " ";
        $("#hidden_api_result").html(dump);
		contacts[i].remove(removeContact_success, removeContact_error);
	}

}

function removeContact_success() {
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

function removeContact_error() {
	// var dump = "removeContact_error ";
	test_result = "NG";
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// 連絡先をディープコピー
function cloneContact(finishCallback) {
	var dump = "";
	var srcContact = applican.contacts.create({"displayName": "Test User"});
	srcContact.id = 1;
	srcContact.displayName = "Test displayName 1";
	srcContact.nickname = "Test nickname 1";
	srcContact.note = "この連絡先のメモ";
	var address = new ContactAddress();
	address.pref = false;
	address.type = "home";
	address.formatted = "";
	address.streetAddress = "東1-26-30";
	address.locality = "渋谷区";
	address.region = "東京都";
	address.postalCode = "1500011";
	address.country = "日本";
	srcContact.addresses = [address];
	var phone = new ContactField("home", "1234567890", false);
	srcContact.phoneNumbers = [phone];
	srcContact.birthday = new Date("1980/01/01");

	var newContact = srcContact.clone();

	srcContact.addresses[0].region = "hogehoge";
	srcContact.phoneNumbers[0].value = "999999999";
	srcContact.birthday.setFullYear(2000);

	dump += "src: " + srcContact.birthday.toString() + " ";
	dump += "new: " + newContact.birthday.toString() + "";

	if (dump) {
		test_result = "OK" + dump;
	} else {
		test_result = "NG" + dump;
	}
    setTimeout(function() {
        finishCallback();
    }, CLONE_CONTACT_WAIT_TIME);
}

// 連絡先を更新
function updateContact(finishCallback) {
	var options = new ContactFindOptions();
	options.filter = "テスト鈴木";
	options.multiple = false;
	var fields = ["*"];
	applican.contacts.find(fields, updateContact_findSuccess, updateContact_error, options);
    waitTestAPI(finishCallback);
}

function updateContact_findSuccess(contacts) {
//	document.getElementById("dumpAreaContacts").value = "updateContact_findSuccess ";
	if (contacts && contacts.length > 0) {
		contacts[0].name.givenName += "x";
		contacts[0].phoneNumbers[0].value = "9876543210";
		contacts[0].emails[0].value = "hoge@hoga";
		contacts[0].save(updateContact_success, updateContact_error);
	} else {
		test_result = "OK 検索機能正常、検索結果なし";
		// alert("検索結果なし");
	}
}

function updateContact_success() {
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

function updateContact_error() {
	test_result = "NG";
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ///////////////////
// 簡易データ保存
function setSimpleStorage(key, val, finishCallback) {
	applican.simpleStorage.set(key, val + '\'.' + (new Date().getTime()) + "改行前 改行後", setSimpleStorage_success);
	// applican.simpleStorage.set('testkey', 100.001,
	// setSimpleStorage_success);
    waitTestAPI(finishCallback);
}

function setSimpleStorage_success() {
	var dump = "setSimpleStorage_success ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function getSimpleStorage(key, finishCallback) {
	applican.simpleStorage.get(key, getSimpleStorage_success);
    waitTestAPI(finishCallback);
}

function getSimpleStorage_success(result) {
	var dump = "getSimpleStorage_success ";
	dump += result + "";
	test_result = "OK" + dump;
	if (result) {
		simpleStorageData = simpleStorageData + result + " ";
	} else {
		simpleStorageData = null;
	}
	// document.getElementById("dumpAreaSimpleStorage").value =dump;
    //    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function removeSimpleStorage(finishCallback) {
	applican.simpleStorage.remove('testkey', removeSimpleStorage_success);
    waitTestAPI(finishCallback);
}

function removeSimpleStorage_success(result) {
	var dump = "removeSimpleStorage_success ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function clearSimpleStorage(finishCallback) {
	applican.simpleStorage.remove('testkey', clearSimpleStorage_success);
    waitTestAPI(finishCallback);
}

function clearSimpleStorage_success(result) {
	var dump = "clearSimpleStorage_success ";
	test_result = "OK" + result;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// ///
// カメラ画像クリーンアップ
function cleanupPicture(finishCallback) {
	applican.camera.cleanup(cleanupPictureSuccess, cleanupPictureError);
    waitTestAPI(finishCallback);
}

function cleanupPictureSuccess() {
	var dump = "cleanupPictureSuccess ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function cleanupPictureError(message) {
	// var dump = "cleanupPictureError ";
	var dump = "";
	dump += "message:" + message;
	test_result = "OK" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

/** ******************************************************************************** */

/*
* 手動テスト
*/

/** ******************************************************************************** */

// ///
// QRコード読み取り
function captureBarcode(finishCallback) {
	applican.barcode.captureBarcode(captureBarcodeSuccess, captureBarcodeError);
    waitTestAPI(finishCallback);
}

function captureBarcodeSuccess(res) {
	if (res.codeData.indexOf("applican") > 0) {
		test_result = "OK : " + res;
//        document.getElementById("hidden_api_result").value = test_result;
        $("#hidden_api_result").html(test_result);
	} else {
		test_result = "NG";
//        document.getElementById("hidden_api_result").value = test_result;
        $("#hidden_api_result").html(test_result);
	}
}

function captureBarcodeError(e) {
	test_result = "NG : " + e;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ///
// 現在向いている方角を取得
function getCurrentHeading(finishCallback) {
	applican.compass.getCurrentHeading(currentHeadingSuccess, currentHeadingError);
    waitTestAPI(finishCallback);
}

function currentHeadingSuccess(res) {
	console.log("getCurrentHeading success");
	// var dump = "currentHeadingSuccess ";
	var dump = "";
	dump += "magneticHeading:" + res.magneticHeading + " ";
	dump += "trueHeading:" + res.trueHeading + " ";
	dump += "headingAccuracy:" + res.headingAccuracy + " ";
	dump += "timestamp:" + res.timestamp + " ";
	test_result = "OK" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function currentHeadingError(e) {
	console.log("getCurrentHeading error" + e);
	test_result = "NG : " + e;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ///
// 現在の加速度を取得
function getCurrentAcceleration(finishCallback) {
    applican.accelerometer.getCurrentAcceleration(currentAccelerationSuccess,currentAccelerometerError);
    waitTestAPI(finishCallback);
}

function currentAccelerationSuccess(res) {
	console.log(res.x + " " + res.y + " " + res.z);
	if (res.x || res.y || res.z || res.timestamp) {
		test_result = "OK : ";
//        document.getElementById("hidden_api_result").value = test_result;
//        document.getElementById("hidden_api_result").value = test_result;
        $("#hidden_api_result").html(test_result);
	} else {
		currentAccelerometerError();
	}
}

function currentAccelerometerError() {
	test_result = "NG : ";
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
}

// ///
// 位置情報を取得
function getCurrentPosition(finishCallback) {
	var options = {
		maximumAge : 10000,
		timeout : 30000,
		enableHighAccuracy : false
	};
	applican.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError, options);
    waitTestAPI(finishCallback);
}

function currentPositionSuccess(res) {
	var dump = "currentPositionSuccess ";
	dump += "latitude:" + res.coords.latitude + " ";
	dump += "longitude:" + res.coords.longitude + " ";
	dump += "altitude:" + res.coords.altitude + " ";
	dump += "accuracy:" + res.coords.accuracy + " ";
	dump += "altitudeAccuracy:" + res.coords.altitudeAccuracy + " ";
	dump += "heading:" + res.coords.heading + " ";
	dump += "speed:" + res.coords.speed + " ";
	dump += "timestamp:" + res.timestamp + " ";
	test_result = "OK" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function currentPositionError(error) {
	console.log("currentPostion error");
	// var dump = "currentPositionError ";
	var dump = "";
	dump += "code:" + error.code + " ";
	dump += "message:" + error.message + " ";
	test_result = "OK" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// ///
// 通知ダイアログ
function notificationAlert(message, title, buttonName, finishCallback) {
	applican.notification.alert(message, alertCallback, title, buttonName);
    waitTestAPI(finishCallback);
}

function alertCallback() {
	var dump = "alertCallback ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// ///
// 確認ダイアログ
function notificationConfirm(message, title, buttonName, finishCallback) {
	testCaseTitle = title;
    finishCallbackFunction = finishCallback;
	applican.notification.confirm(message, confirmCallback, title, buttonName);
}

function confirmCallback(buttonIndex) {
	testResult(testCaseTitle, finishCallbackFunction);
}

function confirmResult(buttonIndex) {
	if (buttonIndex == "1") {
        document.getElementById("hidden_api_result").value = "OK";
        test_result = "OK";
		return "OK";
	} else if (buttonIndex == "2") {
        document.getElementById("hidden_api_result").value = "NG";
        test_result = "NG";
        return "NG";
	}
	return "保留";
}

// ///
// ビープ音
function notificationBeep(times, finishCallback) {
	applican.notification.beep(times);
    waitTestAPI(finishCallback);
}

// ///
// バイブレーション
function notificationVibrate(milliseconds, finishCallback) {
	applican.notification.vibrate(milliseconds);
    setTimeout(function() {
        finishCallback();
    }, VIBRATE_WAIT_TIME)
}

// ///
// ローカル通知
function localNotificationSchedule1(finishCallback) {// 5秒後
	var now = parseInt((new Date()) / 1000);
	var options = {
		alertId : 1,
		alertBody : "message1",
		uri : "http://www.yahoo.co.jp/",
		fireDate : now + 5,
		// repeatInterval: "",
		// iOSのみ
		alertAction : "開く",
		// iOSのみ
		applicationIconBadgeNumber : 3
	};
	applican.localNotification.schedule(localNotificationSchedule1Success, localNotificationSchedule1Error, options);
    waitTestAPI(finishCallback);
}

function localNotificationSchedule1Success() {
	var dump = "localNotificationSchedule1Success ";
	test_result = "OK";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function localNotificationSchedule1Error(res) {
	// var dump = "localNotificationSchedule1Error ";
	var dump = "";
	dump += "code:" + res.code + " ";
	test_result = "NG" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function localNotificationCancel1(finishCallback) {// キャンセル
	var options = {
		alertId : 1
	};
	applican.localNotification.cancel(options);

	var dump = "localNotificationCancel1 ";
    document.getElementById("hidden_api_result").value = dump;
    setTimeout(function() {
        finishCallback();
    }, LOCAL_NOTIFICATION_CANCEL_WAIT_TIME);
}

// notification
function localNotificationSchedule2(finishCallback) {// 10秒後
	var now = parseInt((new Date()) / 1000);
	var options = {
		alertId : 2,
		alertBody : "message2",
		uri : "./index.html",
		fireDate : now + 10,
		// repeatInterval: "",
		alertAction : "開く", // iOSのみ
		applicationIconBadgeNumber : 3 // iOSのみ
	};
	applican.localNotification.schedule(localNotificationSchedule2Success, localNotificationSchedule2Error, options);
    waitTestAPI(finishCallback);
}

function localNotificationSchedule2Success() {
	var dump = "localNotificationSchedule2Success ";
    test_result = "OK : " * dump;
	console.log(dump);
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function localNotificationSchedule2Error(res) {
	var dump = "localNotificat()ionSchedule2Error ";
	dump += "code:" + res.code + " ";
    test_result = dump;
	console.log(dump);
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function localNotificationCancel2(finishCallback) {// キャンセル
	var options = {
		alertId : 2
	};
	applican.localNotification.cancel(options);

	var dump = "localNotificationCancel2 ";
	console.log(dump);
    setTimeout(function() {
        finishCallback();
    }, LOCAL_NOTIFICATION_CANCEL_WAIT_TIME);
}

// すべてキャンセル
function localNotificationAllCancel(finishCallback) {
	applican.localNotification.allCancel();

    test_result = "OK";
    setTimeout(function() {
        finishCallback();
    }, LOCAL_NOTIFICATION_CANCEL_WAIT_TIME);
}

// ///////////////////
// アプリ終了(Androidのみ)
function finish() {
	applican.finish();
}

// ///////////////////
// Capture
// オーディオ録音
function captureAudio(finishCallback) {
	applican.capture.captureAudio(captureAudioSuccess, captureAudioError);
    waitTestAPI(finishCallback);
}

function captureAudioSuccess(mediaFiles) {
	// var dump = "captureAudioSuccess ";
	var dump = "";
	for (var i = 0, len = mediaFiles.length; i < len; i++) {
		dump += mediaFiles[i].fullPath;
	}
	test_result = "OK" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function captureAudioError(err) {
	// var dump = "captureAudioError ";
	var dump = "";
	dump += "code:" + err.code + " ";
	dump += "message:" + err.message + " ";
	test_result = "NG" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 動画撮影
function captureVideo(finishCallback) {
	applican.capture.captureVideo(captureVideoSuccess, captureVideoError);
    waitTestAPI(finishCallback);
}

function captureVideoSuccess(mediaFiles) {
	// var dump = "captureVideoSuccess ";
	var dump = "";
	for (var i = 0, len = mediaFiles.length; i < len; i++) {
		dump += mediaFiles[i].fullPath;
	}
	test_result = "OK" + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function captureVideoError(err) {
	// var dump = "captureVideoError ";
	var dump = "";
	dump += "code:" + err.code + " ";
	dump += "message:" + err.message + "";
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 画像撮影
function captureImage(finishCallback) {
    applican.capture.captureImage(captureImageSuccess, captureImageError);
    waitTestAPI(finishCallback);
}

function captureImageSuccess(mediaFiles) {
	console.log("currentImage success");
	var dump = "";
	for (var i = 0, len = mediaFiles.length; i < len; i++) {
		dump += mediaFiles[i].fullPath + " ";

		_imageData = mediaFiles[i].fullPath;
	}
	if (dump) {
		test_result = "OK : " + dump;
//        document.getElementById("hidden_api_result").value = dump;
        $("#hidden_api_result").html(dump);
	} else {
		test_result = "NG : " + dump;
//        document.getElementById("hidden_api_result").value = dump;
        $("#hidden_api_result").html(dump);
	}
	captureImageStatus = true;
	/*
	 * //送信 var options = new FileUploadOptions(); options.fileKey="file";
	 * options.fileName="test.jpg"; options.mimeType="image/jpg";
	 *
	 * var ft = new FileTransfer();
	 *
	 * ft.upload(mediaFiles[0].fullPath, encodeURI("http://+++++.com/file.php"),
	 * upload1_uploadSuccess, upload1_fail, options);
	 */
}

function captureImageError(err) {
	test_result = "NG : " + err;
//    document.getElementById("hidden_api_result").value = test_result;
    $("#hidden_api_result").html(test_result);
	captureImageStatus = true;
}

// 現在位置取得
function getCurrentPosition1(finishCallback) {
	sound.getCurrentPosition(getCurrentPosition1_success, getCurrentPosition1_error);
    waitTestAPI(finishCallback);
}

function getCurrentPosition1_success(position) {
	// var dump = "getCurrentPosition1_success ";
	var dump = "";
	dump += "position:" + position;
	//	document.getElementById("dumpAreaMedia").value = dump;
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function getCurrentPosition1_error(error) {
	// var dump = "getCurrentPosition1_error ";
	var dump = "";
	dump += "code: " + error.code + " ";
	dump += "message: " + error.message + " ";
	//	document.getElementById("dumpAreaMedia").value = dump;
	test_result = "NG : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// /////////////////
// GameSound
// SEを読み込む
function loadSE(finishCallback) {
	// SEを読み込み
	seList = [{
		track : 0,
		src : "gamesound/se1.wav"
	}, {
		track : 1,
		src : "gamesound/se2.wav"
	}, {
		track : 2,
		src : "gamesound/se3.wav"
	}, {
		track : 3,
		src : "gamesound/se4.wav"
	}, {
		track : 4,
		src : "gamesound/se5.wav"
	}, {
		track : 5,
		src : "gamesound/se6.wav"
	}, {
		track : 6,
		src : "gamesound/se7.wav"
	}, {
		track : 7,
		src : "gamesound/se8.wav"
	}, {
		track : 8,
		src : "gamesound/se9.wav"
	}, {
		track : 9,
		src : "gamesound/se10.wav"
	}, {
		track : 10,
		src : "gamesound/se11.wav"
	}, {
		track : 11,
		src : "gamesound/se12.wav"
	}];

	applican.gamesound.loadSE(seList, loadSESuccess, loadSEError);
    waitTestAPI(finishCallback);
}

function loadSESuccess() {
	var dump = "loadSESuccess ";
	test_result = "OK : " + dump;
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function loadSEError(err) {
	// var dump = "loadSEError ";
	var dump = "";
	dump += "code:" + err.code + " ";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
	test_result = "NG : " + dump;
}

// SE再生
function playSE(track, finishCallback) {
    async.series([
        function(callback) {
            applican.gamesound.playSE(track);
            setTimeout(function() {
                callback();
            }, 1000);
        }
    ], function() {
        waitTestAPI(finishCallback);
    });
}

function playAllSE(num, finishCallback) {
    // total sleep time : 48秒
    async.series([
    function(callback) {
        setSEVolume(num, 100, callback);
    },
    function(callback) {
        playSE(num, callback);
    },
    function(callback) {
        stopSE(num, callback);
    }], function() {
        $("hidden_playSE_track").html(num);
        console.log("play SE test");
        waitTestAPI(finishCallback);
    });
}

// SE終了
function stopSE(track, finishCallback) {
	applican.gamesound.stopSE(track);
    setTimeout(function() {
        finishCallback();
    }, STOP_SOUND_WAIT_TIME);
}

// SEボリューム
function setSEVolume(track, volume, finishCallback) {
	applican.gamesound.setSEVolume(track, volume);
    setTimeout(function() {
        finishCallback();
    }, SET_BGM_VOLUME_WAIT_TIME);

}

// 全てのサウンドを停止
function stopSound(finishCallback) {
	applican.gamesound.stopAllBGM();
	applican.gamesound.stopAllSE();
    document.getElementById("hidden_api_result").value = "stop sound";
    setTimeout(function() {
        finishCallback();
    }, STOP_SOUND_WAIT_TIME);
}

// サウンドデータを開放する
function releaseAllBGM(finishCallback) {
	applican.gamesound.releaseAllBGM();
    document.getElementById("hidden_api_result").value = "release all BGM";
    setTimeout(function() {
        finishCallback();
    }, RELEASE_SOUND_DATA_WAIT_TIME);
}

function releaseSEAll(finishCallback) {
	applican.gamesound.releaseAllSE();
    document.getElementById("hidden_api_result").value = "release se all";
    setTimeout(function() {
        finishCallback();
    }, RELEASE_SOUND_DATA_WAIT_TIME);
}

// ///////////////////
// 動画を指定した位置に表示
function playVideoOverlay(control, finishCallback) {
	var options = {
		top : 10,
		left : (document.documentElement.clientWidth - 190) / 2,
		width : 190,
		height : 240,
		control : control
	};

	applican.video.play('sample_mpeg4.mp4', playVideoOverlay_success, playVideoOverlay_error, options);
    waitTestAPI(finishCallback);
}

function playVideoOverlay_success() {
	var dump = "playVideoOverlay_success ";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

function playVideoOverlay_error(error) {
	var dump = "playVideoOverlay_error ";
	dump += "code:" + error.code + " ";
//    document.getElementById("hidden_api_result").value = dump;
    $("#hidden_api_result").html(dump);
}

// 停止
function stopVideo(finishCallback) {
	applican.video.stop();
    document.getElementById("hidden_api_result").value = "stop video";
    setTimeout(function() {
        finishCallback();
    }, STOP_VIDEO_WAIT_TIME);
}

// ///////////////////
// ライトをON/OFF
function light1(flg, finishCallback) {
	applican.device.light(flg);
    document.getElementById("hidden_api_result").value = "light on/off";
    setTimeout(function() {
        finishCallback();
    }, LIGHT_ON_WAIT_TIME);
}

// ///////////////////
// スプラッシュ表示
function showSplash1(finishCallback) {
	// javascriptでタイムアウト
	applican.splashscreen.show('splash/splash1_portrait.png', 'splash/splash1_landscape.png');

	setTimeout(function() {
		applican.splashscreen.hide();
        document.getElementById("hidden_api_result").value = "show splash";
	}, 2000);
    setTimeout(function() {
        finishCallback();
    }, SPLASH_WAIT_TIME);
}

function showSplash2(finishCallback) {
	// プラットフォーム側でタイムアウト
	applican.splashscreen.show('splash/splash2_portrait.png', 'splash/splash2_landscape.png', 3000);
    setTimeout(function() {
        document.getElementById("hidden_api_result").value = "show splash";
    }, 3000);
    setTimeout(function() {
        finishCallback();
    }, SPLASH_WAIT_TIME);
}

// ///////////////////
// GoogleAnalytics
function gaTrackView(finishCallback) {
    async.series([
        function(callback) {
            applican.googleAnalytics.trackView('screen_name');
            setTimeout(function() {
                callback();
            }, GA_TRACKING_VIEW_WAIT_TIME);
        },
        function(callback) {
            notificationAlert("GoogleAnalyticsを確認して下さい", "GA trackView", "OK", callback);
        }
    ], function() {
        finishCallback();
    })


}

function gaTrackEvent(finishCallback) {
    async.series([
        function(callback) {
            applican.googleAnalytics.trackEvent('category_name', 'action_name', 'label_name', 100);
            setTimeout(function() {
                callback();
            }, GA_TRACKING_VIEW_WAIT_TIME);
        },
        function(callback) {
            notificationAlert("GoogleAnalyticsを確認して下さい", "GA trackEvent", "OK", callback);
        }
    ], function() {
        finishCallback();
    })

}

// ///
// 取得した画像を→ライブラリへ保存
function saveToPhotoAlbum(finishCallback) {
	// alert(""+_imageData.length);
	try {
		applican.camera.saveToPhotoAlbum(_imageData, saveToPhotoAlbumSuccess, saveToPhotoAlbumError);
	} catch (e) {
		saveToPhotoAlbumError(e);
	}
    waitTestAPI(finishCallback);
}

function saveToPhotoAlbumSuccess() {
	test_result = "OK";
    $("#hidden_api_result").html("save to photo album : " + test_result);
//    document.getElementById("hidden_api_result").value = "save to photo album";
}

function saveToPhotoAlbumError(message) {
	test_result = "NG";
    $("#hidden_api_result").html("save to photo album : " + test_result);
//    document.getElementById("hidden_api_result").value = "save to photo album";
}

// ///
// カメラ撮影(PhoneGap形式) base64で取得
var _destinationType = -1;
var _imageData = null;
function getPicture1(mode, finishCallback) {
	var options = {
		quality : 70,
		destinationType : applican.camera.DestinationType.DATA_URL,
		sourceType : applican.camera.PictureSourceType.CAMERA,
		encodingType : applican.camera.EncodingType.JPEG,
		targetWidth : 400,
		targetHeight : 400
	};
	applican.camera.getPicture(getPicture1_getPictureSuccess, getPicture1_getPictureError, options);
    waitTestAPI(finishCallback);
}

function getPicture1_getPictureSuccess(res) {
	_imageData = res;
	var dump = "";
	dump += "size:" + res.length + " ";
	var image = document.getElementById('myImage');
	image.src = "data:image/jpeg;base64," + res;
	test_result = "OK : " + dump;
    $("#hidden_api_result").html(dump);
}

function getPicture1_getPictureError(message) {
	var dump = "";
	dump += "message:" + message + " ";
	test_result = "NG : " + dump;
    $("#hidden_api_result").html(dump);
}

/** ******************************************************************************** */

/*
* デバッグで利用
*/

/** ******************************************************************************** */
// ///////////////////
// ログ画面表示
function showLogConsole(finishCallback) {
	applican.showLogConsole();
//	if (finishCallback !== null) {
//		finishCallback(null);
//	}
}

/** ******************************************************************************** */

/*
* 同じ機能のためテストでは利用しない機能
*/

/** ******************************************************************************** */

function localNotificationSchedule3() {// 3分後
	var now = parseInt((new Date()) / 1000);
	var options = {
		alertId : 3,
		alertBody : "message3",
		uri : "http://www.yahoo.co.jp/",
		fireDate : now + 60 * 3,
		// repeatInterval: "",
		alertAction : "開く", // iOSのみ
		applicationIconBadgeNumber : 3 // iOSのみ
	};
	applican.localNotification.schedule(localNotificationSchedule3Success, localNotificationSchedule3Error, options);
}

function localNotificationSchedule3Success() {
	var dump = "localNotificationSchedule3Success ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule3Error(res) {
	var dump = "localNotificationSchedule3Error ";
	dump += "code:" + res.code + " ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationCancel3() {// キャンセル
	var options = {
		alertId : 3
	};
	applican.localNotification.cancel(options);

	var dump = "localNotificationCancel3 ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule4() {// 毎分0秒
	var fireDateUnixtime = (new Date(2000, 0, 1, 0, 0, 0)) / 1000;
	// alert(fireDateUnixtime);

	var options = {
		alertId : 4,
		alertBody : "message4",
		uri : "http://www.yahoo.co.jp/",
		fireDate : fireDateUnixtime,
		repeatInterval : "minute",
		alertAction : "開く", // iOSのみ
		applicationIconBadgeNumber : 1 // iOSのみ
	};
	applican.localNotification.schedule(localNotificationSchedule4Success, localNotificationSchedule4Error, options);
}

function localNotificationSchedule4Success() {
	var dump = "localNotificationSchedule4Success ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule4Error(res) {
	var dump = "localNotificationSchedule4Error ";
	dump += "code:" + res.code + " ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationCancel4() {// キャンセル
	var options = {
		alertId : 4
	};
	applican.localNotification.cancel(options);

	var dump = "localNotificationCancel4 ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule5() {// 毎時30分
	var fireDateUnixtime = (new Date(2000, 0, 1, 0, 30, 0)) / 1000;
	// alert(fireDateUnixtime);

	var options = {
		alertId : 5,
		alertBody : "message5",
		uri : "http://www.yahoo.co.jp/",
		fireDate : fireDateUnixtime,
		repeatInterval : "hour",
		alertAction : "開く", // iOSのみ
		applicationIconBadgeNumber : 1 // iOSのみ
	};
	applican.localNotification.schedule(localNotificationSchedule5Success, localNotificationSchedule5Error, options);
}

function localNotificationSchedule5Success() {
	var dump = "localNotificationSchedule5Success ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule5Error(res) {
	var dump = "localNotificationSchedule5Error ";
	dump += "code:" + res.code + " ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationCancel5() {// キャンセル
	var options = {
		alertId : 5
	};
	applican.localNotification.cancel(options);

	var dump = "localNotificationCancel5 ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule6() {// 毎日13時40分
	var fireDateUnixtime = (new Date(2000, 0, 1, 13, 40, 0)) / 1000;
	// alert(fireDateUnixtime);

	var options = {
		alertId : 6,
		alertBody : "message6",
		uri : "http://www.yahoo.co.jp/",
		fireDate : fireDateUnixtime,
		repeatInterval : "day",
		alertAction : "開く", // iOSのみ
		applicationIconBadgeNumber : 1 // iOSのみ
	};
	applican.localNotification.schedule(localNotificationSchedule6Success, localNotificationSchedule6Error, options);
}

function localNotificationSchedule6Success() {
	var dump = "localNotificationSchedule6Success ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule6Error(res) {
	var dump = "localNotificationSchedule6Error ";
	dump += "code:" + res.code + " ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationCancel6() {// キャンセル
	var options = {
		alertId : 6
	};
	applican.localNotification.cancel(options);

	var dump = "localNotificationCancel6 ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule7() {// 毎月18日13時45分
	var fireDateUnixtime = (new Date(2000, 0, 18, 13, 45, 0)) / 1000;
	// alert(fireDateUnixtime);

	var options = {
		alertId : 7,
		alertBody : "message7",
		uri : "http://www.yahoo.co.jp/",
		fireDate : fireDateUnixtime,
		repeatInterval : "month",
		alertAction : "開く", // iOSのみ
		applicationIconBadgeNumber : 1 // iOSのみ
	};
	applican.localNotification.schedule(localNotificationSchedule7Success, localNotificationSchedule7Error, options);
}

function localNotificationSchedule7Success() {
	var dump = "localNotificationSchedule7Success ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationSchedule7Error(res) {
	var dump = "localNotificationSchedule7Error ";
	dump += "code:" + res.code + " ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

function localNotificationCancel7() {// キャンセル
	var options = {
		alertId : 7
	};
	applican.localNotification.cancel(options);

	var dump = "localNotificationCancel7 ";
	document.getElementById("dumpAreaLocalNotification").value = dump;
}

// ///
// カメラ撮影(PhoneGap形式) パスで取得
function getPicture2(mode) {
	var options = {
		quality : 70,
		destinationType : applican.camera.DestinationType.FILE_URI,
		sourceType : applican.camera.PictureSourceType.CAMERA,
		encodingType : applican.camera.EncodingType.JPEG,
		targetWidth : 600,
		targetHeight : 600,
		saveToPhotoAlbum : false,
		correctOrientation : true,
		allowEdit : false
	};
	applican.camera.getPicture(getPicture2_getPictureSuccess, getPicture2_getPictureError, options);
}

function getPicture2_getPictureSuccess(res) {
	_imageData = res;

	var dump = "getPicture2_getPictureSuccess ";
	dump += "result:" + res + " ";
	document.getElementById("dumpAreaCamera2").value = dump;

	var image = document.getElementById('myImage');
	image.src = res;
}

function getPicture2_getPictureError(message) {
	var dump = "getPicture2_getPictureError ";
	dump += "message:" + message + " ";
	document.getElementById("dumpAreaCamera2").value = dump;
}

// ///
// ライブラリから画像取得(PhoneGap形式) base64で取得
function getPicture3(mode) {
	var options = {
		quality : 70,
		destinationType : applican.camera.DestinationType.DATA_URL,
		sourceType : applican.camera.PictureSourceType.PHOTOLIBRARY,
		encodingType : applican.camera.EncodingType.JPEG,
		targetWidth : 800,
		targetHeight : 800,
		saveToPhotoAlbum : false,
		correctOrientation : true,
		allowEdit : true,
		mediaType : applican.camera.MediaType.PICTURE
	};
	applican.camera.getPicture(getPicture3_getPictureSuccess, getPicture3_getPictureError, options);
}

function getPicture3_getPictureSuccess(res) {
	_imageData = res;

	var dump = "getPicture3_getPictureSuccess ";
	// dump += "result:"+res+" ";
	document.getElementById("dumpAreaCamera2").value = dump;

	var image = document.getElementById('myImage');
	image.src = "data:image/jpeg;base64," + res;
}

function getPicture3_getPictureError(message) {
	var dump = "getPicture3_getPictureError ";
	dump += "message:" + message + " ";
	document.getElementById("dumpAreaCamera2").value = dump;
}

// ライブラリから画像取得(PhoneGap形式) ファイルパスを取得
function getPicture4(mode) {
	var options = {
		quality : 70,
		destinationType : applican.camera.DestinationType.FILE_URI,
		sourceType : applican.camera.PictureSourceType.PHOTOLIBRARY,
		encodingType : applican.camera.EncodingType.JPEG,
		targetWidth : 800,
		targetHeight : 800,
		saveToPhotoAlbum : false,
		correctOrientation : true,
		allowEdit : false,
		mediaType : applican.camera.MediaType.PICTURE
	};
	applican.camera.getPicture(getPicture4_getPictureSuccess, getPicture4_getPictureError, options);
}

function getPicture4_getPictureSuccess(res) {
	_imageData = res;

	var dump = "getPicture4_getPictureSuccess ";
	dump += "result:" + res + " ";
	document.getElementById("dumpAreaCamera2").value = dump;

	var image = document.getElementById('myImage');
	image.src = res;
}

function getPicture4_getPictureError(message) {
	var dump = "getPicture4_getPictureError ";
	dump += "message:" + message + " ";
	document.getElementById("dumpAreaCamera2").value = dump;
}

// 撮影してアップロード
function getPictureAndUpload() {
	var options = {
		quality : 50,
		destinationType : applican.camera.DestinationType.FILE_URI,
		sourceType : applican.camera.PictureSourceType.CAMERA,
		targetWidth : 400,
		targetHeight : 400,
		saveToPhotoAlbum : true
	};
	applican.camera.getPicture(uploadPhoto, function(message) {
		test_result = "NG : 写真の取得に失敗しました";
		// alert('写真の取得に失敗しました');
	}, options);
}

function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";

	var params = {};
	params.value1 = "test";
	params.value2 = "param";

	options.params = params;

	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://+++++.com/file.php"), uploadPhotoSuccess, uploadPhotoFail, options);
}

function uploadPhotoSuccess(r) {
	var dump = "uploadPhotoSuccess ";
	dump += "コード = " + r.responseCode + " ";
	dump += "結果 = " + r.response + " ";
	dump += "送信バイト数 = " + r.bytesSent + " ";
	document.getElementById("dumpAreaFile").value = dump;
}

function uploadPhotoFail(error) {
	var dump = "uploadPhotoFail ";
	dump += "code:" + error.code + " ";
	document.getElementById("dumpAreaFile").value = dump;
}

/** ******************************************************************************** */

/*
* 提示されたAPI一覧に無いAPI
*/

/** ******************************************************************************** */

// ///
// オーディオ読み込み(ネット上から)
var sound = null;
function getMedia1() {
	var src = "http://www.applican.com/trunk/tester/zukan.mp3";
	sound = new Media(src, getMedia1_success, getMedia1_error, getMedia1_status);
}

function getMedia1_success() {
	var dump = "getMedia1_success ";
	document.getElementById("dumpAreaMedia").value = dump;
}

function getMedia1_error(error) {
	var dump = "getMedia1_error ";
	dump += "code: " + error.code + " ";
	dump += "message: " + error.message + " ";
	document.getElementById("dumpAreaMedia").value = dump;
}

function getMedia1_status(status) {
	var dump = "getMedia1_status ";
	dump += "status: " + status;
	document.getElementById("dumpAreaMediaStatus").value = dump;
}

// オーディオ読み込み(ローカルから)
function getMedia2() {
	var src = "by_chance.mp3";
	sound = new Media(src, getMedia2_success, getMedia2_error, getMedia2_status);
}

function getMedia2_success() {
	var dump = "getMedia2_success ";
	document.getElementById("dumpAreaMedia").value = dump;
}

function getMedia2_error(error) {
	var dump = "getMedia2_error ";
	dump += "code: " + error.code + " ";
	dump += "message: " + error.message + " ";
	document.getElementById("dumpAreaMedia").value = dump;
}

function getMedia2_status(status) {
	var dump = "getMedia2_status ";
	dump += "status: " + status;
	document.getElementById("dumpAreaMedia").value = dump;
}

// 再生
function playMedia1() {
	sound.play();
}

// 一時停止
function pauseMedia1() {
	sound.pause();
}

// 停止
function stopMedia1() {
	sound.stop();
}

// 解放
function releaseMedia1() {
	sound.release();
}

// 再生時間取得
function getDuration1() {
	var duration = sound.getDuration();
	var dump = "getDuration1 " + duration;
	document.getElementById("dumpAreaMedia").value = dump;
}

// 再生位置を変更
function seekTo1() {
	sound.seekTo(3000);
}

// ボリューム変更
function setVolume1(volume) {
	sound.setVolume(volume);
}

// ///////////////////
// オーディオ録音
var recMedia = null;
var recFilePath = null;
function startRecAudio() {
	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, startRecAudio_gotFS, recAudio_error);
}

function startRecAudio_gotFS(fileSystem) {
	fileSystem.root.getFile("rec_audio.m4a", {
		create : true,
		exclusive : false
	}, startRecAudio_gotFileEntry, recAudio_error);
}

function startRecAudio_gotFileEntry(fileEntry) {
	recFilePath = fileEntry.fullPath;

	var dump = "startRecAudio ";
	dump += recFilePath + " ";
	document.getElementById("dumpAreaRecAudio").value = dump;

	recMedia = new Media(recFilePath, recAudio_success, recAudio_error, recAudio_status);
	recMedia.startRecord();
}

function recAudio_success() {
	var dump = "recAudio_success ";
	document.getElementById("dumpAreaRecAudio").value = dump;
}

function recAudio_error(error) {
	var dump = "recAudio_error ";
	dump += "code: " + error.code;
	document.getElementById("dumpAreaRecAudio").value = dump;
}

function recAudio_status(status) {
	var dump = "recAudio_status ";
	dump += "status: " + status;
	document.getElementById("dumpAreaRecAudioStatus").value = dump;
}

function stopRecAudio() {
	var dump = "stopRecAudio ";
	document.getElementById("dumpAreaRecAudio").value = dump;

	recMedia.stopRecord();
}

function playRecAudio() {
	var dump = "playRecAudio ";
	document.getElementById("dumpAreaRecAudio").value = dump;

	recMedia = new Media(recFilePath, recAudio_success, recAudio_error, recAudio_status);
	recMedia.play();
}

function pauseRecAudio() {
	var dump = "pauseRecAudio ";
	document.getElementById("dumpAreaRecAudio").value = dump;
	recMedia.pause();
}

// ///////////////////
// ポップアップしたWebViewの閉じる検知
function addLaunchWebviewCloseEventListener() {
	applican.addLaunchWebviewCloseEventListener(webViewClose);
	var dump = "addLaunchWebviewCloseEventListener ";
	//document.getElementById("dumpAreaLaunchWebview").value = dump;
}

function webViewClose() {
	var dump = "webViewClose ";
	//document.getElementById("dumpAreaLaunchWebview").value = dump;
	var urlParams = get_url_vars();
	var loop = urlParams[0];
    loopCnt = Number(loop) + 1;
    finalCallbackFunction();
//	location.href = "index.html?suiteNo=" + suiteNo + "loop=" + (Number(loop)+1);
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

// ///////////////////
// リスト表示(1行テキスト)
var list_data = [{
	title : "item1",
	subtitle : "item1 subtitle",
	valuetitle : "1件",
	picture : "test.jpg",
	value : "value1"
}, {
	title : "item2",
	subtitle : "item2 subtitle",
	valuetitle : "2件",
	picture : "tab/tab_btn_1_off.png",
	value : "value2"
}, {
	title : "item3",
	subtitle : "item3 subtitle",
	valuetitle : "3件",
	picture : "http://www.applican.com/trunk/tester/logo.png",
	value : "value3"
}, {
	title : "item4",
	subtitle : "item4 subtitle",
	valuetitle : "999件",
	picture : "http://www.applican.com/trunk/tester/logo.png",
	value : "value4"
}, {
	title : "item5あいうえおあいうえおあいうえおあいうえお",
	subtitle : "item5 subtitleあいうえおあいうえおあいうえおあいうえお",
	valuetitle : "valuetitleあいうえおあいうえおあいうえおあいうえお",
	picture : "http://www.applican.com/trunk/tester/logo.png",
	value : "value5"
}, {
	title : "item6",
	subtitle : "item6 subtitle",
	valuetitle : "1件",
	picture : "test.jpg",
	value : "value6"
}, {
	title : "item7",
	subtitle : "item7 subtitle",
	valuetitle : "1件",
	picture : "test.jpg",
	value : "value7"
}, {
	title : "item8",
	subtitle : "item8 subtitle",
	valuetitle : "1件",
	picture : "test.jpg",
	value : "value8"
}, {
	title : "item9",
	subtitle : "item9 subtitle",
	valuetitle : "1件",
	picture : "test.jpg",
	value : "value9"
}, {
	title : "item10",
	subtitle : "item10 subtitle",
	valuetitle : "1件",
	picture : "test.jpg",
	value : "value10"
}];
function showListView1() {
	applican.list.show(applican.list.ListType.TITLE, '選択１', list_data, showListViewSuccess, showListViewError);
}

function showListView2() {
	applican.list.show(applican.list.ListType.SUBTITLE, '選択２', list_data, showListViewSuccess, showListViewError);
}

function showListView3() {
	applican.list.show(applican.list.ListType.VALUE, '選択３', list_data, showListViewSuccess, showListViewError);
}

function showListView4() {
	applican.list.show(applican.list.ListType.SUBTITLE_VALUE, '選択４', list_data, showListViewSuccess, showListViewError);
}

function showListView5() {
	applican.list.show(applican.list.ListType.PICTURE, '選択５', list_data, showListViewSuccess, showListViewError);
}

function showListView6() {
	applican.list.show(applican.list.ListType.PICTURE_SUBTITLE, '選択６', list_data, showListViewSuccess, showListViewError);
}

function showListView7() {
	applican.list.show(applican.list.ListType.PICTURE_VALUE, '選択７', list_data, showListViewSuccess, showListViewError);
}

function showListView8() {
	applican.list.show(applican.list.ListType.PICTURE_SUBTITLE_VALUE, '選択８', list_data, showListViewSuccess, showListViewError);
}

function showListView9() {
	var options = {
		width : 160,
		height : 100
	};
	applican.list.show(applican.list.ListType.PICTURE_SUBTITLE_VALUE, '選択９', list_data, showListViewSuccess, showListViewError, options);
}

function showListViewSuccess(result) {
	var dump = "showListViewSuccess ";
	dump += "value:" + result + " ";
	document.getElementById("dumpAreaList").value = dump;
}

function showListViewError(error) {
	var dump = "showListViewError ";
	dump += "code:" + error.code + " ";
	document.getElementById("dumpAreaList").value = dump;
}

// /////////////////
// タブへバッジ表示
function setTabBadge(tab, num) {
	applican.tab.setBadge(tab, num);
}

/** ******************************************************************************** */
// 結果をページ内に出力
function testResult(testcase, finishCallback) {
	console.log("testResult testcase" + testcase);
	async.series([
        function(callback) {
            fileRead1(callback);
        },
        function(callback) {
            var sql = "INSERT INTO TESTRESULT (suite_no, case_no, case_name, result) VALUES (" + '"' + suiteNo + '"' + "," + '"' + caseNo + '"' + "," + '"' + testcase + '"' + "," + '"' + test_result + '"' + ")";
            insertTestResult(testResultDB, sql, callback);
        },
        function(callback) {
            displayResult(testcase, callback);
        },
        function(callback) {
            console.log("TEST_RESULT : " + TEST_RESULT + testcase + "," + test_result + " ");
            fileWrite1(TEST_RESULT + testcase + "," + test_result + " ", callback);
        },
        function(callback) {
            upload1(callback);
        },
        function(callback) {
            varsReset(callback);
        }],
        function(err, results) {
            if (err) {
               throw err;
            }
            console.log("テスト結果処理終了");
            finishCallback();
    });
}

function displayResult(testcase, finishCallback) {
	var html = "";
	async.series([
	function(callback) {
		console.log("display result suiteNo :" + suiteNo);
		console.log("testcase : " + testcase + " result : " + test_result);
		html = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-hover-c">CaseNo-' + caseNo + " : " + testcase;

		if (test_result.indexOf("NG") > -1) {
            html = html + ' : <span>' + test_result + '</span></li>';
		} else {
            html = html + ' : <span class="ui-error">' + test_result + '</span></li>';
		}
        $('#testResultArea').append(html).listview();
        $('#hidden_test_case_result').html(test_result);
        callback();
	},
    function(callback) {
        $('#hidden_test_case_result').html("");
        callback();
    }], function() {
        console.log("display test result finish");
        finishCallback();
	});
}

function varsReset(finishCallback) {
	test_result = "";
	testCaseTitle = "";
	simpleStorageData = "";
	writeContents = "";
    finishCallback();
}

function insertTestResult(db, sql, finishCallback) {
    var insertTestResult_success = function(result) {
        var dump = "insertData_success ";
        if(applican.config.debug) {
            dump += "insertId:" + result;
        } else {
            dump += "insertId:" + result.insertId + " ";
        }
        test_result = "OK : " + dump;
        $("#hidden_api_result").html(dump);
            finishCallback();
    };

    var insertTestResult_error = function (error) {
        var dump = "insertData_error ";
        dump += error.message + " ";
        $("#hidden_api_result").html(dump);
        test_result = "NG : " + dump;
        finishCallback(error);
    };

    db.exec(sql, insertTestResult_success, insertTestResult_error);
}


// wait処理
function waitTestAPI(finishCallback) {
    var timerID;
    timerID = setInterval(function() {
        if ($('#hidden_api_result').html()) {
            clearInterval(timerID);
            timerID = null;
            $('#hidden_api_result').html("");
            finishCallback();
       }
    }, 100);
}

function waitTestResultDisplay(finishCallback) {
    var timerID;
    timerID = setInterval(function() {
        if ($('#hidden_test_case_result').html()) {
            clearInterval(timerID);
            timerID = null;
            console.log("wait test result display timer off");
            $('#hidden_test_case_result').html("");
            finishCallback();
       }
    }, 100);
}

function waitCancel(finishCallback) {

}

/** ******************************************************************************** */

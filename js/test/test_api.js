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
var uploadStatus = false;
var fileWriteStatus = false;
var captureImageStatus = false;
var oldContents = "";

var FILE_NAME = "testResult.csv";
var UPLOAD_URL = baseURL + "/file.php";
var WIFI_WPA_SSID = "";
var WIFI_WPA_SSID_PASSWD = "";
var simpleStorageData = "";
var test_result = "";
var DOCOMO_APIKEY1 = "";
var DOCOMO_APIKEY2 = "";

var TRACK_NO = 3;

// wait time
/**************************************************************/
var STOP_VIDEO_WAIT_TIME = 500;
var CLEAR_WAIT_TIME = 1000;
var PLAY_BGM_WAIT_TIME = 300;
var SET_BGM_VOLUME_WAIT_TIME = 200;
var LIGHT_ON_WAIT_TIME = 500;
var RELEASE_SOUND_DATA_WAIT_TIME = 500;
var STOP_SOUND_WAIT_TIME = 300;
var CREATE_CONTACT_WAIT_TIME = 1000;
var LOCAL_NOTIFICATION_CANCEL_WAIT_TIME = 1000;
var SPLASH_WAIT_TIME = 1000;
var GA_TRACKING_VIEW_WAIT_TIME = 2000;
/**************************************************************/
/*
* バックグラウンドで動かし続ける処理
*/
/** ******************************************************************************** */
// コンパス方位を一定の時間間隔で取得
function watchHeading(finishCallback) {
    var watchHeadingError = function(e) {
	    var dump = "watchHeadingError ";
	    dump += "code:" + e.code + " ";
	    document.getElementById("dumpAreaCompass").value = dump;
    };

    var watchHeadingSuccess = function(res) {
	    var dump = "watchHeadingSuccess ";
	    dump += "magneticHeading:" + res.magneticHeading + " ";
	    dump += "trueHeading:" + res.trueHeading + " ";
	    dump += "headingAccuracy:" + res.headingAccuracy + " ";
	    dump += "timestamp:" + res.timestamp + " ";
	    document.getElementById("dumpAreaCompass").value = dump;
    };

    var options = {
		frequency : 100
	};
	_compassWatchID = applican.compass.watchHeading(watchHeadingSuccess, watchHeadingError, options);

    setTimeout(finishCallback, 0);
}

// コンパスの監視を停止
function clearWatchHeading(finishCallback) {
    applican.compass.clearWatch(_compassWatchID);
    document.getElementById("dumpAreaCompass").value =" Stop!!";
    setTimeout(finishCallback, CLEAR_WAIT_TIME);
}

// 加速度を一定の時間間隔で取得
function watchAcceleration(finishCallback) {
    var watchAccelerationError = function() {
	    document.getElementById("dumpAreaAcceleration").value = "watchAccelerationError ";
    };

    var watchAccelerationSuccess = function(res) {
	    var dump = "watchAccelerationSuccess ";
	    dump += "x:" + res.x + " ";
	    dump += "y:" + res.y + " ";
	    dump += "z:" + res.z + " ";
	    dump += "timestamp:" + res.timestamp + " ";
	    document.getElementById("dumpAreaAcceleration").value = dump;
    };

	var options = {
		frequency : 100
	};
	_accelerationWatchID = applican.accelerometer.watchAcceleration(watchAccelerationSuccess, watchAccelerationError, options);

    setTimeout(finishCallback, 0);
}

// 加速度の監視を停止
function clearWatchAcceleration(finishCallback) {
	applican.accelerometer.clearWatch(_accelerationWatchID);
	document.getElementById("dumpAreaAcceleration").value = ' Stop!!';
    setTimeout(finishCallback, CLEAR_WAIT_TIME);
}

// シェイク監視
function watchShake(finishCallback) {
    var shakeSuccess = function() {
	    document.getElementById("dumpAreaShake").value += "shake: " + parseInt((new Date()) / 1000) + " ";
    };

	applican.accelerometer.watchShake(shakeSuccess);
	document.getElementById("dumpAreaShake").value = "Start ";

    setTimeout(finishCallback, 0);
}

function clearWatchShake(finishCallback) {
	applican.accelerometer.clearWatchShake();
	document.getElementById("dumpAreaShake").value = "Stop!!";
    setTimeout(finishCallback, CLEAR_WAIT_TIME);
}

// 位置情報を一定の時間間隔で取得
function watchPosition(finishCallback) {
    var watchPositionError = function(e) {
	    var dump = "watchPositionError ";
	    dump += "code:" + e.code + " ";
	    dump += "message:" + e.message + " ";
	    document.getElementById("dumpAreaGeolocation").value = dump;
    };

    var watchPositionSuccess = function(res) {
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
    };

	var options = {
		maximumAge : 0,
		timeout : 20000,
		enableHighAccuracy : false,
		frequency : 3000
	};
	_geolocationWatchID = applican.geolocation.watchPosition(watchPositionSuccess, watchPositionError, options);

    setTimeout(finishCallback, 0);
}

// 位置情報の監視を停止
function clearWatchPosition(finishCallback) {
	applican.geolocation.clearWatch(_geolocationWatchID);
    var positionValue = document.getElementById("dumpAreaGeolocation").value;
	document.getElementById("dumpAreaGeolocation").value = positionValue + " Stop!!";
    setTimeout(finishCallback, CLEAR_WAIT_TIME);
}

// キーボード監視(Androidのみ)
function watchKeyDown(finishCallback) {
    var watchKeyDownSuccess = function(res) {
	    var dump = "watchKeyDownSuccess ";
	    dump += "keyCode:" + res.keyCode + " ";
	    dump += "shiftKey:" + res.shiftKey + " ";
	    dump += "ctrlKey:" + res.ctrlKey + " ";
	    dump += "altKey:" + res.altKey + " ";
	    document.getElementById("dumpAreaKeyDown").value = dump;
    };

	applican.keyboard.watchKeyDown(watchKeyDownSuccess);
	document.getElementById("dumpAreaKeyDown").value = "watchKeyDown Start!";

    setTimeout(finishCallback, 0);
}

function clearWatchKeyDown(finishCallback) {
	applican.keyboard.clearWatchKeyDown();
	document.getElementById("dumpAreaKeyDown").value = "watchKeyDown Stop!";
    setTimeout(finishCallback, CLEAR_WAIT_TIME);
}

function watchKeyUp(finishCallback) {
    var watchKeyUpSuccess = function(res) {
	    var dump = "watchKeyUpSuccess ";
	    dump += "keyCode:" + res.keyCode + " ";
	    dump += "shiftKey:" + res.shiftKey + " ";
	    dump += "ctrlKey:" + res.ctrlKey + " ";
	    dump += "altKey:" + res.altKey + " ";
	    document.getElementById("dumpAreaKeyUp").value = dump;
    };

	applican.keyboard.watchKeyUp(watchKeyUpSuccess);
	document.getElementById("dumpAreaKeyUp").value = "watchKeyUp Start!";

    setTimeout(finishCallback, 0);
}

function clearWatchKeyUp(finishCallback) {
	applican.keyboard.clearWatchKeyUp();
	document.getElementById("dumpAreaKeyUp").value = "watchKeyUp Stop!";
    setTimeout(finishCallback, CLEAR_WAIT_TIME);
}

// GameSound

// サウンドデータをまとめて読み込む
function loadBGM(finishCallback) {
    var loadBGMError = function(err) {
	    var dump = "loadBGMError ";
	    dump += "code:" + err.code + " ";
	    document.getElementById("dumpAreaGameSound").value = dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var loadBGMSuccess = function() {
	    document.getElementById("dumpAreaGameSound").value = "loadBGMSuccess ";

        setTimeout(finishCallback, 0);
    };

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
}

// BGM再生
function playBGM(track, finishCallback) {
	var options = {};
	options.track = track;
	options.loop = true;
	applican.gamesound.playBGM(options);
    setTimeout(finishCallback, PLAY_BGM_WAIT_TIME);
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
        setTimeout(finishCallback, 0);
    };

    var errorCallback = function(err) {
	    if (err.code === 4001) {
		    test_result = 'OK : DoCoMoの<a href="' + err.message + '" target="_blank">会員メニュー</a>にて、ご利用の端末の位置情報提供を有効にしてください。' + ' ' + err.code + ' ' + err.message;
	    } else if (err.code > 0) {
		    test_result = 'NG : ' + err.code + ' ' + err.message;
	    } else {
		    test_result = 'OK(docomoLocationの確認 DoCoMo回線に接続していなければご利用になれません。)' + err.code + ' ' + err.message;
	    }
        setTimeout(finishCallback, 0);
    };

    var option = {
		APIKey1 : DOCOMO_APIKEY1,
		APIKey2 : DOCOMO_APIKEY2
	};
	applican.docomolocation.getCurrentPosition(successCallback, errorCallback, option);
}

// 端末情報取得
function checkDeviceInfo(finishCallback) {
	try {
        test_result = "OK";
        checkDeviceInfoResult();
	} catch (e) {
		if (applican.device.name === null || typeof (applican.device.name) === 'undefined') {
			test_result = "NG : " + e;
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
    document.getElementById('dumpAreaDeviceInfo').value = dump;
}

// Pushトークンを取得
function getPushToken(finishCallback) {
    var getPushTokenError = function(error) {
        if(error) {
    	    test_result = "NG : " + error;
        } else {
            test_result = "NG";
        }
        setTimeout(function() { finishCallback(error); }, 0);
    };

    var getPushTokenSuccess = function(res) {
	    if (res.pushToken) {
            alert("pushTokenSuccess : " + res.pushToken);
		    test_result = "OK : " + res.pushToken;
            setTimeout(finishCallback, 0);
	    } else {
		    getPushTokenError(res);
	    }
    };

    applican.device.getPushToken(getPushTokenSuccess, getPushTokenError, {});
}

// ファイル書き込み (永続的なストレージ)
function fileWrite1(contents, finishCallback) {
    var fileWrite1_fail = function(error) {
	    var dump = "fileWrite1_fail ";
	    dump += "code:" + error.code;
	    console.log(dump);
	    fileWriteStatus = true;
        finishCallback(error);
    };

    var fileWrite1_gotFileWriter = function(writer) {
	    var dump = "fileWrite1_gotFileWriter";
	    console.log(dump);

	    writer.onwritestart = function() {
		    console.log("onwrite test start");
	    };
	    writer.onabort = function() {
		    console.log("onabort");
	    };
	    writer.onwrite = function() {
		    console.log("onwrite");
	    };
	    writer.onerror = function() {
		    console.log("onerror");
	    };

	    writer.onwriteend = function() {
		    console.log("onwrite end");
            finishCallback();
	    };
	    console.log(writeContents);
	    writer.write(writeContents);
	    oldContents = writeContents;
	    fileWriteStatus = true;
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

// ファイル書き込み (永続的なストレージ)
function fileWriteTest(finishCallback) {
    var fileWrite1_fail = function(error) {
	    var dump = "fileWrite1_fail ";
	    dump += "code:" + error.code;
	    console.log(dump);
	    fileWriteStatus = true;
        setTimeout(function() { finishCallback(error); }, 0);
    };

    var fileWriteTest_fail = function(error) {
	    var dump = "fileWrite1_fail";
	    dump += "code:" + error.code;
	    console.log(dump);
    };

    var fileWrite1_gotFileWriter = function(writer) {
	    var dump = "fileWrite1_gotFileWriter";
	    console.log(dump);

	    writer.onwritestart = function() {
		    console.log("onwrite test start");
	    };
	    writer.onabort = function() {
		    console.log("onabort");
	    };
	    writer.onwrite = function() {
		    console.log("onwrite");
	    };
	    writer.onerror = function() {
		    console.log("onerror");
	    };

	    writer.onwriteend = function() {
		    console.log("onwrite end");
	    };
	    console.log(writeContents);
	    writer.write(writeContents);
	    fileWriteStatus = true;
        setTimeout(finishCallback, 0);
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
}

/** ************************************************************ */

// ファイル読み込み (永続的なストレージ)
function fileRead1(finishCallback) {
    var fileRead1_fail = function (error) {
	    var dump = "fileRead1_fail ";
	    dump += "code:" + error.code + " ";
	    console.log(dump);
        setTimeout(function() { finishCallback(error); }, 0);
    };

    var fileRead1_gotFile = function(file) {
	    var dump = "fileRead1_gotFile";
	    console.log(dump);
        console.log(file);

        async.series([
            function(callback) {
                //var reader = new FileReader();
                console.log("fileRead1_reaAsText");

                // フレームワーク側のエンコーディングのバグでAndroidで呼ばれるとクラッシュする
                /*
                reader.onloadend = function(evt) {
                    if (evt.target.result) {
                        var dump = "テキストとして読み込み" + evt.target.result;
                        console.log(dump);
                    } else {
                        dump = "file readAsText fail";
                    }
                    callback();
                };
                reader.readAsText(file);
                */
                callback();
            },
            function(callback) {
 	            var reader = new FileReader();
	            reader.onloadend = function(evt) {
                    if(evt.target.result) {
                        var dump = "データ URL として読み込み : " + evt.target.result;
                        console.log(dump);
                    }

                    callback();
	                };
	            reader.readAsDataURL(file);
            }
        ],
        function() {
            setTimeout(finishCallback, 0);
        });
    };

    var fileRead1_gotFileEntry = function(fileEntry) {
	    fileEntry.file(fileRead1_gotFile, fileRead1_fail);
    };

    var fileRead1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile(FILE_NAME, null, fileRead1_gotFileEntry, fileRead1_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileRead1_gotFS, fileRead1_fail);
}

// ファイル一覧
function directoryReader1(finishCallback) {
    var directoryReader1_fail = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var directoryReader1_readEntries = function(entries) {
	    var dump;
	    var i;

	    for (i = 0; i < entries.length; i++) {
		    dump = entries[i].name + (entries[i].isDirectory ? "/" : "") + " ";
	    }
        test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

    var directoryReader1_gotFS = function(fileSystem) {
	    var directoryReader = fileSystem.root.createReader();
	    directoryReader.readEntries(directoryReader1_readEntries, directoryReader1_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, directoryReader1_gotFS, directoryReader1_fail);
}

// ファイル削除
function deleteFile1(finishCallback) {
    var deleteFile1_fail = function(error) {
	    test_result = "NG : delete file fail " + error.code;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var deleteFile1_removeSuccess = function() {

        setTimeout(finishCallback, 0);
    };

    var deleteFile1_gotFileEntry = function(fileEntry) {
	    fileEntry.remove(deleteFile1_removeSuccess, deleteFile1_fail);
    };

    var deleteFile1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile("readme.txt", null, deleteFile1_gotFileEntry, deleteFile1_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, deleteFile1_gotFS, deleteFile1_fail);
}


// ファイル削除
function deleteFileFixture(file, finishCallback) {
    var deleteFile_fail = function() {
        setTimeout(finishCallback, 0);
    };

    var deleteFile_removeSuccess = function() {
        setTimeout(finishCallback, 0);
    };

    var deleteFile_gotFileEntry = function(fileEntry) {
	    fileEntry.remove(deleteFile_removeSuccess, deleteFile_fail);
    };

    var deleteFile_gotFS = function(fileSystem) {
	    fileSystem.root.getFile(file, null, deleteFile_gotFileEntry, deleteFile_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, deleteFile_gotFS, deleteFile_fail);
}

// ファイル移動
function moveTo1(finishCallback) {
    var moveTo1_fail = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var moveTo1_moveToSuccess = function(entry) {
	    var dump = "";
	    dump += entry.name + " " + entry.fullPath + "";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };


    var moveTo1_gotFileEntry = function(fileEntry) {
	    var tmp = fileEntry.fullPath;
	    var parentPath = tmp.substring(0, tmp.lastIndexOf('/'));
	    var parentName = parentPath.substring(parentPath.lastIndexOf('/') + 1);
	    var parentEntry = new DirectoryEntry(parentName, parentPath);
	    fileEntry.moveTo(parentEntry, "readme2.txt", moveTo1_moveToSuccess, moveTo1_fail);
    };

    var moveTo1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile("readme.txt", null, moveTo1_gotFileEntry, moveTo1_fail);
    };

    applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, moveTo1_gotFS, moveTo1_fail);
}

// ファイルコピー
function copyTo1(finishCallback) {
    var copyTo1_fail = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var copyTo1_copyToSuccess = function(entry) {
	    var dump = "";
	    dump += entry.name + " " + entry.fullPath + " ";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

    var copyTo1_gotFileEntry = function(fileEntry) {
	    var tmp = fileEntry.fullPath;
	    var parentPath = tmp.substring(0, tmp.lastIndexOf('/'));
	    var parentName = parentPath.substring(parentPath.lastIndexOf('/') + 1);
	    var parentEntry = new DirectoryEntry(parentName, parentPath);
	    fileEntry.copyTo(parentEntry, "readme3.txt", copyTo1_copyToSuccess, copyTo1_fail);
    };

    var copyTo1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile("readme.txt", null, copyTo1_gotFileEntry, copyTo1_fail);
    };

    applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, copyTo1_gotFS, copyTo1_fail);
}

// ファイルtoURL
function toURL1(finishCallback) {
    var toURL1_fail = function(error) {
	    test_result = "NG : toURL fail " + error.code;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var toURL1_gotFileEntry = function(fileEntry) {
	    var fileURL = fileEntry.toURL();
	    var dump = "toURL1_gotFileEntry ";
	    dump += fileURL + " ";
	    console.log(dump);
        test_result = "OK : toURL";

        setTimeout(finishCallback, 0);
    } ;

    var toURL1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile("readme.txt", null, toURL1_gotFileEntry, toURL1_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, toURL1_gotFS, toURL1_fail);
}

// 親ディレクトリ
function getParent1(finishCallback) {
    var getParent1_fail = function(error) {
	    test_result = "NG getParent fail " + error.code;

        setTimeout(function() { finishCallback(error);}, 0);
    };

    var getParent1_getParentSuccess = function(entry) {
	    var dump = "OK getParent1_getParentSuccess ";
	    dump += entry.name + " " + entry.fullPath + " ";
        test_result = dump;

        setTimeout(finishCallback, 0);
    };

    var getParent1_gotFileEntry = function(fileEntry) {
	    fileEntry.getParent(getParent1_getParentSuccess, getParent1_fail);
    };

    var getParent1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile("readme.txt", null, getParent1_gotFileEntry, getParent1_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getParent1_gotFS, getParent1_fail);
}

// ファイルアップロード
function upload1(finishCallback) {
     var upload1_fail = function(error) {
	    var dump = "upload1_fail ";
	    dump += "code:" + error.code + " ";
	    dump += "source:" + error.source + " ";
	    dump += "target:" + error.target + " ";
	    dump += "http_status:" + error.http_status + " ";
	    uploadStatus = true;
	    console.log(dump);
        finishCallback(error);
    };

    var upload1_uploadSuccess = function(result) {
	    var dump = "upload1_uploadSuccess ";
	    dump += "responseCode:" + result.responseCode + " ";
	    dump += "response:" + result.response + " ";
	    dump += "bytesSent:" + result.bytesSent + " ";
	    uploadStatus = true;
	    console.log(dump);
        test_result = dump;

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

    var upload1_gotFS = function(fileSystem) {
	    fileSystem.root.getFile(FILE_NAME, null, upload1_gotFileEntry, upload1_fail);
    };

    applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, upload1_gotFS, upload1_fail);
}

// ディレクトリ作成
function mkdir1(finishCallback) {
    var  mkdir1_fail = function(error) {
	    test_result = "NG mkdir fail " + error.code;
        console.log("mkdir1 test_result " + test_result);

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var mkdir1_getDirectory = function(directoryEntry) {
	    var dump = "mkdir1_getDirectory " + directoryEntry.name + " " + directoryEntry.fullPath + " ";
        test_result = "OK : " + dump;
        console.log("mkdir1 test_result " + test_result);

        setTimeout(finishCallback, 0);
    };

    var mkdir1_gotFS = function(fileSystem) {
	    fileSystem.root.getDirectory("newDir", {
		    create : true,
		    exclusive : false
	    }, mkdir1_getDirectory, mkdir1_fail);
    };

    applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, mkdir1_gotFS, mkdir1_fail);
}

//ディレクトリ内にディレクトリ作成
function mkdirInDir(finishCallback) {
    var mkdirInDir_fail = function(error) {

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var mkdirInDir_getDirectory = function() {
        setTimeout(finishCallback, 0);
    };

    var mkdirInDir_gotFS = function(fileSystem) {
	    fileSystem.root.getDirectory("newDir/inDir", {
		    create : true,
		    exclusive : false
	    }, mkdirInDir_getDirectory, mkdirInDir_fail);
    };

    applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, mkdirInDir_gotFS, mkdirInDir_fail);
}

// ディレクトリ削除fixture(Recursively)
function rmdirFixture(dir, finishCallback) {
    var rmdir_fail = function() {
        setTimeout(finishCallback, 0);
    };

    var rmdir_removeRecursivelySuccess = function() {
        setTimeout(finishCallback, 0);
    };

    var rmdir_getDirectory = function(directoryEntry) {
	    directoryEntry.removeRecursively(rmdir_removeRecursivelySuccess, rmdir_fail);
    };

    var rmdir_gotFS = function(fileSystem) {
	    fileSystem.root.getDirectory(dir, null, rmdir_getDirectory, rmdir_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, rmdir_gotFS, rmdir_fail);
}

// ディレクトリ移動
function moveTo2(finishCallback) {
    var moveTo2_fail = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var moveTo2_moveToSuccess = function(entry) {
	    test_result = "OK : " + entry.name + " " + entry.fullPath;

        setTimeout(finishCallback, 0);
    };

    var moveTo2_getDirectory = function(directoryEntry) {
	    var tmp = directoryEntry.fullPath;
	    var parentPath = tmp.substring(0, tmp.lastIndexOf('/'));
	    var parentName = parentPath.substring(parentPath.lastIndexOf('/') + 1);
	    var parentEntry = new DirectoryEntry(parentName, parentPath);
	    directoryEntry.moveTo(parentEntry, "newDir2", moveTo2_moveToSuccess, moveTo2_fail);
    };

    var moveTo2_gotFS = function(fileSystem) {
	    fileSystem.root.getDirectory("newDir", null, moveTo2_getDirectory, moveTo2_fail);
    };

    applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, moveTo2_gotFS, moveTo2_fail);
}

// ディレクトリコピー
function copyTo2(finishCallback) {
    var copyTo2_fail = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var copyTo2_copyToSuccess = function(entry) {
	    test_result = "OK : " + entry.name + " " + entry.fullPath;

        setTimeout(finishCallback, 0);
    };

    var copyTo2_getDirectory = function(directoryEntry) {
	    var tmp = directoryEntry.fullPath;
	    var parentPath = tmp.substring(0, tmp.lastIndexOf('/'));
	    var parentName = parentPath.substring(parentPath.lastIndexOf('/') + 1);
	    var parentEntry = new DirectoryEntry(parentName, parentPath);
	    directoryEntry.copyTo(parentEntry, "newDir3", copyTo2_copyToSuccess, copyTo2_fail);
    };

    var copyTo2_gotFS = function(fileSystem) {
	    fileSystem.root.getDirectory("newDir", null, copyTo2_getDirectory, copyTo2_fail);
    };

    applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, copyTo2_gotFS, copyTo2_fail);
}

// ディレクトリtoURL
function toURL2(finishCallback) {
    var toURL2_fail = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error);}, 0);
    };

    var toURL2_getDirectory = function(directoryEntry) {
	    var directoryURL = directoryEntry.toURL();
	    var dump = "toURL2_getDirectory ";
	    dump += directoryURL + " ";
	    console.log(dump);
        test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

    var toURL2_gotFS = function(fileSystem) {
	    fileSystem.root.getDirectory("newDir", null, toURL2_getDirectory, toURL2_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, toURL2_gotFS, toURL2_fail);
}

// 親ディレクトリ
function getParent2(finishCallback) {
    var getParent2_fail = function(error) {
	    test_result = "NG : " + error.code;

       setTimeout(function() { finishCallback(error); }, 0);
    };

    var getParent2_getParentSuccess = function(entry) {
	    var dump = "getParent2_getParentSuccess ";
	    dump += entry.name + " " + entry.fullPath + "";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

    var getParent2_getDirectory = function(directoryEntry) {
	    directoryEntry.getParent(getParent2_getParentSuccess, getParent2_fail);
    };

    var getParent2_gotFS = function(fileSystem) {
	    fileSystem.root.getDirectory("newDir", null, getParent2_getDirectory, getParent2_fail);
    };

	applican.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getParent2_gotFS, getParent2_fail);
}

// 画面のサイズと向き
function getDisplayInfo(finishCallback) {
    var getDisplayInfo_error = function(e) {
	    test_result = "NG : " + e;

        setTimeout(function() { finishCallback(e); }, 0);
    };

    var getDisplayInfo_success = function(info) {
	    var dump = "";
	    dump += "orientation:" + info.orientation + " ";
	    dump += "width:" + info.width + " ";
	    dump += "height:" + info.height + " ";
	    console.log("getDisplayInfo success " + dump);
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	console.log("getDisplayInfo");
	applican.device.getDisplayInfo(getDisplayInfo_success, getDisplayInfo_error);
}

// Http通信
// GET
function httpGet(finishCallback) {
    var httpGetError = function(message) {
	    var dump = "httpGetError ";
	    dump += "code:" + message + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(message); }, 0);
    };


    var httpGetSuccess = function(result) {
	    var dump = "httpGetSuccess ";
	    dump += "result:" + result + " ";
	    if (dump.indexOf('Success') > 0) {
		    test_result = "OK : " + result;

            setTimeout(finishCallback, 0);
	    } else {
		    httpGetError(result);
	    }
    };

    var options = {
		timeout : 10000
	};
	applican.http.get(getURL, options, httpGetSuccess, httpGetError);
}

// POST
function httpPost(finishCallback) {
    var httpPostError = function(message) {
	    var dump = "";
	    dump += "code:" + message + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(message); }, 0);
    };

    var httpPostSuccess = function(result) {
	    var dump = "";
	    dump += "result:" + result + " ";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	var postData = {
		param1 : "applican",
		param2 : "test"
	};
	var options = {
		post : postData,
		timeout : 10000
	};
	applican.http.post(postURL, options, httpPostSuccess, httpPostError);
}

// WiFiの状態を取得
function getWiFiStatus(finishCallback) {
    var getWiFiStatus_Error = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var getWiFiStatus_Success = function(status) {
	    test_result = "OK : " + status;

        setTimeout(finishCallback, 0);
    };

	applican.wifi.getStatus(getWiFiStatus_Success, getWiFiStatus_Error);
}

// WiFiをON
function onWiFi(finishCallback) {
    var onWiFi_Error = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error); }, 5000);
    };


    var onWiFi_Success = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 5000);
    };

	applican.wifi.on(onWiFi_Success, onWiFi_Error);
}

// WiFiをOFF
function offWiFi(finishCallback) {
    var offWiFi_Error = function(error) {
	    test_result = "NG : " + error.code;

        setTimeout(function() { finishCallback(error); }, 5000);
    };

    var offWiFi_Success = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 5000);
};

	applican.wifi.off(offWiFi_Success, offWiFi_Error);
}

// 周囲のSSID一覧を取得
function getSSIDList(finishCallback) {
    var getSSIDList_Error = function(err) {
	    var dump = "";
	    dump += "code:" + err.code + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err);}, 0);
    };

    var getSSIDList_Success = function(result) {
	    var dump = "";
	    var cnt = result.length;
	    dump += "num: " + cnt + " ";
	    for (var i = 0; i < cnt; i++) {
		    dump += "SSID: " + result[i] + " ";
	    }
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	applican.wifi.getSSIDList(getSSIDList_Success, getSSIDList_Error);
}

// 現在接続中のSSIDを取得
function getCurrentSSID(finishCallback) {
    var getCurrentSSID_Error = function(err) {
	    var dump = "";
	    dump += "code:" + err.code + "";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var getCurrentSSID_Success = function(result) {
	    var dump = "";
	    dump += "SSID: " + result + "";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	applican.wifi.getCurrentSSID(getCurrentSSID_Success, getCurrentSSID_Error);
}

// Wifi設定を登録して接続(WPA)
function connectWifi1(finishCallback) {
    var connectWifi_Error = function(err) {
	    var dump = "";
	    dump += "code:" + err.code + "";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err);}, 0);
    };

    var connectWifi_Success = function(result) {
	    var dump = "";
	    dump += "result: " + result + "";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	var options = {};
	options.ssid = WIFI_WPA_SSID;
	options.security = applican.wifi.SecurityType.WPA;
	options.password = WIFI_WPA_SSID_PASSWD;

	applican.wifi.connect(connectWifi_Success, connectWifi_Error, options);
}

// Globalization
// 言語
function getPreferredLanguage(finishCallback) {
    var getPreferredLanguageError = function(err) {
	    var dump = "getPreferredLanguageError ";
	    dump += "code:" + err.code + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var getPreferredLanguageSuccess = function(language) {
	    var dump = "getPreferredLanguageSuccess ";
	    dump += "language:" + language.value + " ";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	applican.globalization.getPreferredLanguage(getPreferredLanguageSuccess, getPreferredLanguageError);
}

// 現在のロケール
function getLocaleName(finishCallback) {
    var getLocaleNameError = function(err) {
	    var dump = "";
	    dump += "code:" + err.code + "";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var getLocaleNameSuccess = function(locale) {
	    var dump = "";
	    dump += "locale:" + locale.value + "";
	    if (dump.indexOf('ja_JP') > 0) {
		    test_result = "OK : " + dump;

            setTimeout(finishCallback, 0);
	    } else {
		    getLocaleNameError(locale);
	    }
    };

	applican.globalization.getLocaleName(getLocaleNameSuccess, getLocaleNameError);
}

// データベース
var db = null;
var testResultDB = null;
function openDb(name, finishCallback) {
    var openDb_success = function(db_obj) {
	    db = db_obj;
	    var dump = "";
	    dump += db.name + "";
	    test_result = "OK : " + dump;
        setTimeout(finishCallback, 0);
    };

    var openDb_error = function(error) {
	    var dump = "";
	    dump += error.message + " ";
	    test_result = "OK : " + dump;
        setTimeout(function() { finishCallback(error); }, 0);
    };

    var dbName = "testdb";
    if(name) {
        dbName = name;
    }
	applican.openDatabase(dbName, openDb_success, openDb_error);
}

function createTable(finishCallback) {
    var createTable_success = function() {
	    test_result = "OK";
        setTimeout(finishCallback, 0);
    };

    var createTable_error = function(error) {
	    var dump = "createTable_error ";
	    dump += error.message + " ";
	    test_result = "OK : " + dump;
        setTimeout(function() { finishCallback(error); }, 0);
    };

    var sql = "CREATE TABLE IF NOT EXISTS DEMO (id unique, data, data2)";
	db.exec(sql, createTable_success, createTable_error);
}

// 一括処理
function execTransaction(finishCallback) {
    var execTransaction_error = function(error) {
	    var dump = "execTransaction_error ";
	    dump += error.message + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(error);}, 0);
    };

    var execTransaction_success = function(result) {
	    var dump = "execTransaction_success ";
	    dump += "rowsAffected:" + result.rowsAffected + " ";
	    dump += "insertId:" + result.insertId + " ";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	var sqls = ["DROP TABLE IF EXISTS DEMO", "CREATE TABLE IF NOT EXISTS DEMO (id unique, data, data2)", "INSERT INTO DEMO (id, data, data2) VALUES (1, 'First row', NULL)", "INSERT INTO DEMO (id, data, data2) VALUES (2.1, 'Second row', 'test')"];
	db.execTransaction(sqls, execTransaction_success, execTransaction_error);
}

function searchData(finishCallback) {
    var searchData_error = function(error) {
	    var dump = "searchData_error ";
	    dump += error.message + " ";
        test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var searchData_success = function(result) {
        // ブラウザでは無条件に1が返ってくるため、移行の処理をしない
        if (applican.config.debug) {
            setTimeout(finishCallback, 0);
            return;
        }
	    var cnt = result.rows.length;
	    var dump = "";
        var i;
	    dump += "row cnt:" + cnt + " ";
	    for (i = 0; i < cnt; i++) {
		    dump += "id:" + result.rows[i].id + ", data:" + result.rows[i].data + ", data2:" + result.rows[i].data2 + " ";
	    }
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	var sql = "SELECT * FROM DEMO";
	db.query(sql, searchData_success, searchData_error);
}

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
    setTimeout(function() {
        finishCallback();
    }, CREATE_CONTACT_WAIT_TIME);
}

// 連絡先を保存
function saveContact(finishCallback) {
    var saveContact_onError = function() {
	    var dump = "saveContact_onError ";
	    test_result = "NG" + dump;

        setTimeout(function() { finishCallback(); }, 0);
    };

    var saveContact_onSuccess = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 0);
    };

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
}

function findContact(finishCallback) {
    var onError = function(err) {
        var dump = "code:" + err.code + " ";
        dump += "message:" + err.message + " ";
        test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var onSuccess = function(contacts) {
        var i;
        var dump = "";
        for (i = 0; i < contacts.length; i++) {
            dump += contacts[i].displayName + "\n";
            if(contacts[i].urls && contacts[i].urls.length > 0) {
                dump += contacts[i].urls[0].value + "\n";
            }
        }
        test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

    var options = new ContactFindOptions();
    options.filter = "Test";
    options.multiple = true;
    var fields = ["*"];
    applican.contacts.find(fields, onSuccess, onError, options);
}

function contactFixture(name, finishCallback) {
    var onError = function(err) {
        setTimeout(function() { finishCallback(err); }, 0);
    };

    var onSuccess = function(contacts) {
        var i;
        for (i = 0; i < contacts.length; i++) {
            // removeの検証自体は別テストケースで実施する
            contacts[i].remove(function() { }, function () { });
        }

        setTimeout(finishCallback, 0);
    };

    var options = new ContactFindOptions();
    options.filter = name;
    options.multiple = true;
    var fields = ["*"];
    applican.contacts.find(fields, onSuccess, onError, options);
}


function removeContact(name, finishCallback) {
    var onError = function(err) {
	    var dump = "code:" + err.code + " ";
	    dump += "message:" + err.message + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var onSuccess = function() {
	    test_result = "OK : contact remove";

        setTimeout(finishCallback, 0);
    };

    var onFindSuccess = function(contacts) {
        contacts[0].remove(onSuccess, onError);
    };

    var options = new ContactFindOptions();
    options.filter = name;
    options.multiple = true;
    var fields = ["*"];
    applican.contacts.find(fields, onFindSuccess, onError, options);
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
    finishCallback();
}

// 簡易データ保存
function setSimpleStorage(key, val, finishCallback) {
    var setSimpleStorage_success = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 0);
    };

	applican.simpleStorage.set(key, val + '\'.' + (new Date().getTime()) + "改行前 改行後", setSimpleStorage_success);
}

function getSimpleStorage(key, finishCallback) {
    var getSimpleStorage_success = function(result) {
	    var dump = "getSimpleStorage_success ";
	    dump += result + "";
	    test_result = "OK" + dump;
        if (result === null) {
            simpleStorageData = null;
	    } else {
            simpleStorageData = simpleStorageData + result + " ";
	    }

        setTimeout(finishCallback, 0);
    };

	applican.simpleStorage.get(key, getSimpleStorage_success);
}

function removeSimpleStorage(key, finishCallback) {
    var removeSimpleStorage_success = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 0);
    };

	applican.simpleStorage.remove(key, removeSimpleStorage_success);
}

function clearSimpleStorage(finishCallback) {
    var clearSimpleStorage_success = function(result) {
	    test_result = "OK" + result;

        setTimeout(finishCallback, 0);
    };

	applican.simpleStorage.clear(clearSimpleStorage_success);
}

// カメラ画像クリーンアップ
function cleanupPicture(finishCallback) {
    var cleanupPictureError = function(message) {
	    var dump = "";
	    dump += "message:" + message;
	    test_result = "NG" + dump;

        setTimeout(function() { finishCallback(message); }, 0);
    };

    var cleanupPictureSuccess = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 0);
    };

	applican.camera.cleanup(cleanupPictureSuccess, cleanupPictureError);
}

/** ******************************************************************************** */

/*
* 手動テスト
*/

/** ******************************************************************************** */

// QRコード読み取り
function captureBarcode(finishCallback) {
    var captureBarcodeError = function(e) {
	    test_result = "NG : " + e;

        setTimeout(function() { finishCallback(e); }, 0);
    };

    var captureBarcodeSuccess = function(res) {
	    if (res.codeData.indexOf("applican") > -1) {
		    test_result = "OK : " + res;
	    } else {
		    test_result = "NG";
	    }
        setTimeout(finishCallback, 0);
    };

	applican.barcode.captureBarcode(captureBarcodeSuccess, captureBarcodeError);
}

// 現在向いている方角を取得
function getCurrentHeading(finishCallback) {
    // Androidバグ対応
    var callbackCalled = false;
    var currentHeadingError = function(e) {
        if (callbackCalled) {
            return;
        }
        callbackCalled = true;
	    console.log("getCurrentHeading error" + e);
	    test_result = "NG : " + e;

        setTimeout(function() { finishCallback(e); }, 0);
    };

    var currentHeadingSuccess = function(res) {
        if (callbackCalled) {
            return;
        }
        callbackCalled = true;
	    console.log("getCurrentHeading success");
	    var dump = "";
	    dump += "magneticHeading:" + res.magneticHeading + " ";
	    dump += "trueHeading:" + res.trueHeading + " ";
	    dump += "headingAccuracy:" + res.headingAccuracy + " ";
	    dump += "timestamp:" + res.timestamp + " ";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	applican.compass.getCurrentHeading(currentHeadingSuccess, currentHeadingError);
}


// 現在の加速度を取得
function getCurrentAcceleration(finishCallback) {
    // Androidバグ対応
    var callbackCalled = false;
	var currentAccelerometerError = function(error) {
        if (callbackCalled) {
            return;
        }
        callbackCalled = true;
	    test_result = "NG : ";

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var currentAccelerationSuccess = function(res) {
        if (callbackCalled) {
            return;
        }
	    console.log(res.x + " " + res.y + " " + res.z);
	    if (res.x || res.y || res.z || res.timestamp) {
            callbackCalled = true;
		    test_result = "OK : ";

            setTimeout(finishCallback, 0);
	    } else {
		    currentAccelerometerError();
	    }
    };

    applican.accelerometer.getCurrentAcceleration(currentAccelerationSuccess,currentAccelerometerError);
}

// 位置情報を取得
function getCurrentPosition(finishCallback) {
    // Androidバグ対応
    var callbackCalled = false;
    var currentPositionError = function(error) {
        if (callbackCalled) {
            return;
        }
        callbackCalled = true;
	    console.log("currentPostion error");
	    var dump = "";
	    dump += "code:" + error.code + " ";
	    dump += "message:" + error.message + " ";
	    test_result = "OK : " + dump;

        setTimeout(function() { finishCallback(error); }, 0);
    };

    var currentPositionSuccess = function(res) {
        if (callbackCalled) {
            return;
        }
        callbackCalled = true;
	    var dump = "currentPositionSuccess ";
	    dump += "latitude:" + res.coords.latitude + " ";
	    dump += "longitude:" + res.coords.longitude + " ";
	    dump += "altitude:" + res.coords.altitude + " ";
	    dump += "accuracy:" + res.coords.accuracy + " ";
	    dump += "altitudeAccuracy:" + res.coords.altitudeAccuracy + " ";
	    dump += "heading:" + res.coords.heading + " ";
	    dump += "speed:" + res.coords.speed + " ";
	    dump += "timestamp:" + res.timestamp + " ";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	var options = {
		maximumAge : 10000,
		timeout : 30000,
		enableHighAccuracy : false
	};
	applican.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError, options);
}

// 通知ダイアログ
function notificationVibrate(milliseconds, finishCallback) {
    applican.notification.vibrate(milliseconds);
    test_result = "OK";
    setTimeout(finishCallback, milliseconds + 1000);
}

// 通知ダイアログ汎用
function notificationAlert(message, title, buttonName, finishCallback) {
    window.alert(message);
    test_result = "OK";
    finishCallback();
}

// 通知ダイアログテスト用
function notificationAlertForTest(message, title, buttonName, finishCallback) {
    var alertCallback = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 0);
    };

    applican.notification.alert(message, alertCallback, title, buttonName);
}

// 確認ダイアログ
function notificationConfirm(message, title, buttonName, finishCallback) {
   var result = window.confirm(message);
    if (result) {
        test_result = "OK";
        setTimeout(finishCallback, 0);
    } else {
        test_result = "NG";
        setTimeout(function() { finishCallback(result); }, 0);
    }
}

// ///
// ローカル通知
function localNotificationSchedule1(finishCallback) {// 5秒後
    var localNotificationSchedule1Error = function(res) {
	    var dump = "";
	    dump += "code:" + res.code + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(res); }, 0);
    };

    var localNotificationSchedule1Success = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 0);
    };

	var now = parseInt((new Date()) / 1000);
	var options = {
		alertId : 1,
		alertBody : "message1",
		fireDate : now + 5,
		// iOSのみ
		alertAction : "開く",
		// iOSのみ
		applicationIconBadgeNumber : 3
	};
	applican.localNotification.schedule(localNotificationSchedule1Success, localNotificationSchedule1Error, options);
}

function localNotificationCancel1(finishCallback) {// キャンセル
	var options = {
		alertId : 1
	};
	applican.localNotification.cancel(options);

    test_result = "OK : localNotificationCancel1 ";
    setTimeout(function() {
        finishCallback();
    }, LOCAL_NOTIFICATION_CANCEL_WAIT_TIME);
}

// notification
function localNotificationSchedule2(finishCallback) {// 10秒後
    var localNotificationSchedule2Error = function(res) {
	    var dump = "localNotificationSchedule2Error";
	    dump += "code:" + res.code + " ";
        test_result = "NG : " + dump;
	    console.log(dump);

        setTimeout(function() { finishCallback(res); }, 0);
    };

    var localNotificationSchedule2Success = function() {
	    var dump = "localNotificationSchedule2Success ";
        test_result = "OK : " * dump;
	    console.log(dump);

        setTimeout(finishCallback, 0);
    };

	var now = parseInt((new Date()) / 1000);
	var options = {
		alertId : 2,
		alertBody : "message2",
		//uri : "./index.html",
		fireDate : now + 10,
		// repeatInterval: "",
		alertAction : "開く", // iOSのみ
		applicationIconBadgeNumber : 3 // iOSのみ
	};
	applican.localNotification.schedule(localNotificationSchedule2Success, localNotificationSchedule2Error, options);
}

// すべてキャンセル
function localNotificationAllCancel(finishCallback) {
	applican.localNotification.allCancel();

    test_result = "OK";
    setTimeout(function() {
        finishCallback();
    }, LOCAL_NOTIFICATION_CANCEL_WAIT_TIME);
}

// アプリ終了(Androidのみ)
function finish() {
	applican.finish();
}

// Capture
// オーディオ録音
function captureAudio(finishCallback) {
    var captureAudioError = function(err) {
	    var dump = "";
	    dump += "code:" + err.code + " ";
	    dump += "message:" + err.message + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var captureAudioSuccess = function(mediaFiles) {
	    var dump = "";
	    for (var i = 0, len = mediaFiles.length; i < len; i++) {
		    dump += mediaFiles[i].fullPath;
	    }
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	applican.capture.captureAudio(captureAudioSuccess, captureAudioError);
}

// 動画撮影
function captureVideo(finishCallback) {
    var captureVideoError = function(err) {
	    var dump = "";
	    dump += "code:" + err.code + " ";
	    dump += "message:" + err.message + "";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var captureVideoSuccess = function(mediaFiles) {
	    var dump = "";
	    for (var i = 0, len = mediaFiles.length; i < len; i++) {
		    dump += mediaFiles[i].fullPath;
	    }
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	applican.capture.captureVideo(captureVideoSuccess, captureVideoError);
}

// 画像撮影
function captureImage(finishCallback) {
    var captureImageError = function(err) {
	    test_result = "NG : " + "code : " + err.code + " message : " +  err.message;
	    captureImageStatus = true;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var captureImageSuccess = function(mediaFiles) {
	    console.log("currentImage success");
	    var dump = "";
	    for (var i = 0, len = mediaFiles.length; i < len; i++) {
		    dump += mediaFiles[i].fullPath + " ";

		    _imageData = mediaFiles[i].fullPath;
	    }
	    if (dump) {
		    test_result = "OK : " + dump;
	    } else {
		    test_result = "NG : " + dump;
	    }
	    captureImageStatus = true;

        setTimeout(finishCallback, 0);
    };

    applican.capture.captureImage(captureImageSuccess, captureImageError);
}

// GameSound
// SEを読み込む
function loadSE(finishCallback) {
    var loadSEError = function(err) {
	    var dump = "";
	    dump += "code:" + err.code + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var loadSESuccess = function() {
	    var dump = "loadSESuccess ";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

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
}

// SE再生
function playSE(track, finishCallback) {
    applican.gamesound.playSE(track);
    setTimeout(finishCallback, 1000);
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
        console.log("play SE test");
        setTimeout(finishCallback, 0);
    });
}

// SE終了
function stopSE(track, finishCallback) {
	applican.gamesound.stopSE(track);
    setTimeout(finishCallback, STOP_SOUND_WAIT_TIME);
}

// SEボリューム
function setSEVolume(track, volume, finishCallback) {
	applican.gamesound.setSEVolume(track, volume);
    setTimeout(finishCallback , SET_BGM_VOLUME_WAIT_TIME);
}

// 全てのサウンドを停止
function stopSound(finishCallback) {
	applican.gamesound.stopAllBGM();
	applican.gamesound.stopAllSE();
    setTimeout(finishCallback, STOP_SOUND_WAIT_TIME);
}

// 全てのSEを停止
function stopAllSE(finishCallback) {
	applican.gamesound.stopAllSE();
    test_result = "OK : ";
    setTimeout(finishCallback, STOP_SOUND_WAIT_TIME);
}

// サウンドデータを開放する
function releaseAllBGM(finishCallback) {
	applican.gamesound.releaseAllBGM();
    setTimeout(finishCallback, RELEASE_SOUND_DATA_WAIT_TIME);
}

function releaseSEAll(finishCallback) {
	applican.gamesound.releaseAllSE();
    setTimeout(finishCallback, RELEASE_SOUND_DATA_WAIT_TIME);
}

// 動画を指定した位置に表示
function playVideoOverlay(control, finishCallback) {
    var playVideoOverlay_error = function(error) {
        test_result = "NG : ";
        setTimeout(function() { finishCallback(error); }, 0);
    };

    var playVideoOverlay_success = function() {
        test_result = "OK : ";
        setTimeout(finishCallback, 0);
    };

	var options = {
		top : 10,
		left : (document.documentElement.clientWidth - 190) / 2,
		width : 190,
		height : 240,
		control : control
	};

	applican.video.play('sample_mpeg4.mp4', playVideoOverlay_success, playVideoOverlay_error, options);
}

// 停止
function stopVideo(finishCallback) {
	applican.video.stop();
    test_result = "OK : ";
    setTimeout(finishCallback, STOP_VIDEO_WAIT_TIME);
}

// ライトをON/OFF
function light1(flg, finishCallback) {
	applican.device.light(flg);
    setTimeout(finishCallback, LIGHT_ON_WAIT_TIME);
}

// スプラッシュ表示
function showSplash(finishCallback) {
	// javascriptでタイムアウト
    applican.splashscreen.show('splash/splash1_portrait.png', 'splash/splash1_landscape.png', SPLASH_WAIT_TIME);
    setTimeout(finishCallback, SPLASH_WAIT_TIME + 1000);
}

// スプラッシュ表示
function hideSplash(finishCallback) {
	// javascriptでタイムアウト
    async.series([
        function(callback) {
            applican.splashscreen.show('splash/splash1_portrait.png', 'splash/splash1_landscape.png');
            setTimeout(callback, SPLASH_WAIT_TIME + 1000);
        },
        function(callback) {
		    applican.splashscreen.hide();
            setTimeout(callback, SPLASH_WAIT_TIME);
        }], function(err, results) {
        setTimeout(finishCallback, 0);
    });
}

// GoogleAnalytics
function gaTrackView(finishCallback) {
    async.series([
        function(callback) {
            applican.googleAnalytics.trackView('screen_name');
            setTimeout(callback, GA_TRACKING_VIEW_WAIT_TIME);
        },
        function(callback) {
            notificationAlert("GoogleAnalyticsを確認して下さい", "GA trackView", "OK", callback);
        }
    ], function() {
        setTimeout(finishCallback, 0);
    });
}

function gaTrackEvent(finishCallback) {
    async.series([
        function(callback) {
            applican.googleAnalytics.trackEvent('category_name', 'action_name', 'label_name', 100);
            setTimeout(callback, GA_TRACKING_VIEW_WAIT_TIME);
        },
        function(callback) {
            notificationAlert("GoogleAnalyticsを確認して下さい", "GA trackEvent", "OK", callback);
        }
    ], function() {
        setTimeout(finishCallback, 0);
    });

}

// 取得した画像を→ライブラリへ保存
function saveToPhotoAlbum(finishCallback) {
    var saveToPhotoAlbumError = function(message) {
	    test_result = "NG";

        setTimeout(function() { finishCallback(message); }, 0);
    };

    var saveToPhotoAlbumSuccess = function() {
	    test_result = "OK";

        setTimeout(finishCallback, 0);
    };

	applican.camera.saveToPhotoAlbum(_imageData, saveToPhotoAlbumSuccess, saveToPhotoAlbumError);
}

// カメラ撮影(PhoneGap形式) base64で取得
var _imageData = null;
function getPicture1(finishCallback) {
    var onError = function(message) {
	    var dump = "message:" + message + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(message); }, 0);
    };

    var onSuccess = function(res) {
	    _imageData = res;
        document.getElementById('myImage').src = "data:image/jpeg;base64," + res;
	    var dump = "size:" + res.length + " ";
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	var options = {
		quality : 70,
		destinationType : applican.camera.DestinationType.DATA_URL,
		sourceType : applican.camera.PictureSourceType.CAMERA,
		encodingType : applican.camera.EncodingType.JPEG,
		targetWidth : 200,
		targetHeight : 200
	};
	applican.camera.getPicture(onSuccess, onError, options);
}

/** ******************************************************************************** */

/*
* デバッグで利用
*/

/** ******************************************************************************** */
// ログ画面表示
function showLogConsole() {
	applican.showLogConsole();
}

/** ******************************************************************************** */
// 結果をページ内に出力
function testResult(testcase, finishCallback) {
	console.log("testResult testcase" + testcase);
	async.series([
        function(callback) {
            var sql = "INSERT INTO TESTRESULT (suite_no, case_no, case_name, result) VALUES (" + '"' + suiteNo + '"' + "," + '"' + caseNo + '"' + "," + '"' + testcase + '"' + "," + '"' + encodeURIComponent(test_result) + '"' + ")";
            insertTestResult(testResultDB, sql, callback);
        },
        function(callback) {
            displayResult(testcase, callback);
        },
        function(callback) {
            console.log(testcase + "," + test_result + " ");
            fileWrite1("CaseNo-" + caseNo + " : " + testcase + ", " + test_result + "\n", callback);
        },
        function(callback) {
            upload1(callback);
        },
        function(callback) {
            varsReset(callback);
        }],
        function(err, results) {
           console.log("テスト結果処理終了");
            finishCallback();
    });
}

function displayResult(testcase, finishCallback) {
	async.series([
	function(callback) {
        var html;
        var span;
		console.log("display result suiteNo :" + suiteNo);
		console.log("testcase : " + testcase + " result : " + test_result);
		//html = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-hover-c">CaseNo-' + caseNo + " : " + testcase;
        html = document.createElement("li");
        html.setAttribute("data-corners", "false");
        html.setAttribute("data-shadow", "false");
        html.setAttribute("data-iconshadow", "true");
        html.setAttribute("data-wrapperels", "div");
        html.setAttribute("data-icon", "arrow-r");
        html.setAttribute("data-iconpos", "right");
        html.setAttribute("data-theme", "c");
        html.className = "ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-hover-c";
        html.appendChild(document.createTextNode("CaseNo-" + caseNo + " : " + testcase + " : "));

        span = document.createElement("span");
        if (test_result.indexOf("OK") < 0) {
            span.className = "ui-error";
		}
        span.appendChild(document.createTextNode(test_result));

        html.appendChild(span);

        document.getElementById("testResultArea").appendChild(html);
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
    var insertTestResult_success = function() {
       finishCallback();
    };

    var insertTestResult_error = function (error) {
       finishCallback(error);
    };

    db.exec(sql, insertTestResult_success, insertTestResult_error);
}


function testAPITemplate(finishCallback) {
    var onError = function(err) {
	    var dump = "code:" + err.code + " ";
	    dump += "message:" + err.message + " ";
	    test_result = "NG : " + dump;

        setTimeout(function() { finishCallback(err); }, 0);
    };

    var onSuccess = function(result) {
	    var dump = result;
	    test_result = "OK : " + dump;

        setTimeout(finishCallback, 0);
    };

	//applican.api.function(onSuccess, onError);
}

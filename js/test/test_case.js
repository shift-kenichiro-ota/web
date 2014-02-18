/**
 * @author mitsuo.yamazaki
 */

var async = require('async');
var $ = require('jquery');

function testBarcodeCaptureBarcode(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert("アプリカンのバーコードを読み込んでください。", "バーコード読み取り", "OK", callback);
        },
        function(callback) {
            captureBarcode(callback);
        },
        function(callback) {
            testResult("captureBarcodeの確認", callback);
        }], function() {
        console.log("testBarcodeCaptureBarcode");
        finishCallback();
    });
}

function testCameraGetPicture(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert("カメラ起動後に写真撮影を行ってください。", "getPictureの確認", "OK", callback);
        },
        function(callback) {
            getPicture1("", callback);
        },
        function(callback) {
            notificationConfirm("写真撮影が行えること", "getPictureの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("getPictureの確認", callback);
        }], function() {
        console.log("testCameraGetPicture");
        finishCallback();
    });
}

function testCameraSaveToPhotoAlbum(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert('saveToPhoAlbumの確認のため,写真撮影を行ってください。', "saveToPhotoの確認", "OK", callback);
        },
        function(callback) {
            getPicture1("", callback);
        },
        function(callback) {
            saveToPhotoAlbum(callback);
        },
        function(callback) {
            testResult("saveToPhotoAlbumの確認", callback);
        }], function() {
        console.log("testCameraSaveToPhotoAlbum");
        finishCallback();
    });
}

function testCaptureCaptureImage(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert("カメラ起動後に写真撮影を行ってください。", "captureImageの確認", "OK", callback);
        },
        function(callback) {
            notificationAlert("画像の撮影を行ってください。", "captureImageのテスト", "OK", callback);
        },
        function(callback) {
            captureImage(callback);
            alert("captureImage API呼び出し")
        },
        function(callback) {
            notificationConfirm("写真撮影が行えること", "captureImageの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("captureImageの確認", callback);
            alert("captureImage結果出力")
        }], function() {
        console.log("testCaptureCaptureImage");
        finishCallback();
    });
}

function testCaptureCaptureAudio(finishCallback) {
    async.series([
        function(callback) {
            captureAudio(callback);
        },
        function(callback) {
            testResult("captureAudioの確認", callback);
        },
        function(callback) {
            notificationConfirm("録音が行えること", "captureVideoの確認", "OK,NG", callback);
        }], function() {
        console.log("testCaptureCaptureAudio");
        finishCallback();
    });
}

function testCaptureCaptureVideo(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert("カメラ起動後にビデオ撮影を10秒ほど行ってください。", "captureImageの確認", "OK", callback);
        },
        function(callback) {
            captureVideo(callback);
        },
        function(callback) {
            notificationConfirm("ビデオ撮影が行えること", "captureVideoの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("captureVideoの確認", callback);
        }], function() {
        console.log("testCaptureCaptureVideo");
        finishCallback();
    });
}

function testAccelerometerGetCurrentAcceleration(finishCallback) {
    async.series([
        function(callback) {
            clearWatchAcceleration(callback);
        },
        function(callback) {
            getCurrentAcceleration(callback);
        },
        function(callback) {
            testResult("getCurrentAccelerationの確認", callback);
        },
        function(callback) {
            watchAcceleration(callback);
        }], function() {
        console.log("testAccelerometerGetCurrentAcceleration");
        finishCallback();
    });
}

function testCompassGetCurrentHeading(finishCallback) {
    async.series([
        function(callback) {
            clearWatchHeading(callback);
        },
        function(callback) {
            getCurrentHeading(callback);
        },
        function(callback) {
            testResult("getCurrentHeadingの確認", callback);
        },
        function(callback) {
            watchHeading(callback);
        }], function() {
        console.log("testCompassGetCurrentHeading");
        finishCallback();
    });
}

function testConnectionType(finishCallback) {
    async.series([
        function(callback) {
            checkDeviceInfo(callback);
        },
        function(callback) {
            testResult("Device Connection typeの確認", callback);
        }], function() {
        console.log("testConnectionType");
        finishCallback();
    });
}

function testDeviceGetDisplayInfo(finishCallback) {
    async.series([
        function(callback) {
            getDisplayInfo(callback);
        },
        function(callback) {
            testResult("Device Connection typeの確認", callback);
        }], function() {
        console.log("testDeviceGetDisplayInfo");
        finishCallback();
    });
}

function testGameSoundLoadSE(finishCallback) {
    async.series([
        function(callback) {
            loadSE(callback);
        },
        function(callback) {
            testResult("loadSEの確認", callback);
        }], function() {
        console.log("testGameSoundLoadSE");
        finishCallback();
    });
}

function testGameSoundSetSEVolume(finishCallback) {
    var track = TRACK_NO;
    async.series([
        function(callback) {
            loadSE(callback);
        },
        function(callback) {
            setSEVolume(track, 50, callback);
        },
        function(callback) {
            playSE(track, callback);
        },
        function(callback) {
            setSEVolume(track, 100, callback);
        },
        function(callback) {
            playSE(track, callback);
        },
        function(callback) {
            notificationConfirm("効果音のボリュームが大きくなること", "setSEVolumeの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("setSEVolumeの確認", callback);
        }], function() {
        console.log("testGameSoundSetSEVolume");
        finishCallback();
    });
}

function testGameSoundPlaySE(finishCallback) {
    async.series([
        function(callback) {
            loadSE(callback);
        }, function(callback) {
            var i = 0;
            async.whilst(
                function() {
                    return i < seList.length;
                },
                function (callback) {
                    console.log("play se : " + i);
                    playAllSE(i, callback);
                    i++;
                },
                function (err) {
                    console.log('last se list = ' + i);
                    callback();
                }
            );
        },
        function(callback) {
            notificationConfirm("全部で12種類の効果音が鳴ること", "playSEの確認", "OK,NG", callback);
        },
        function(callback) {
            notificationConfirm("各効果音が停止されていること", "stopSEの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("playSEの確認", callback);
        }], function() {
        console.log("testGameSoundPlaySE");
        finishCallback();
    });
}

function testGameSoundStopSE(finishCallback) {
    async.series([
        function(callback) {
            loadSE(callback);
        },
        function(callback) {
            playSE(3, callback);
        },
        function(callback) {
            stopSE(3, callback);
        },
        function(callback) {
            testResult("stopSEの確認", callback);
        }], function() {
        console.log("testGameSoundStopSE");
        finishCallback();
    });
}

function testGEOLocationGetCurrentPosition(finishCallback) {
    async.series([
        function(callback) {
            clearWatchPosition(callback);
        },
        function(callback) {
            getCurrentPosition(callback);
        },
        function(callback) {
            testResult("GEOLocationのgetCurrentPositionの確認", callback);
        },
        function(callback) {
            watchPosition(callback);
        }], function() {
        console.log("testGEOLocationGetCurrentPosition");
        finishCallback();
    });
}

function testGoogleAnalyticsTrackView(finishCallback) {
    async.series([
        function(callback) {
            gaTrackView(callback);
        },
        function(callback) {
            notificationConfirm("GoogleAnalyticsでViewの件数が増えていること", "GATrackViewの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("gaTrackViewの確認", callback);
        }], function() {
        console.log("testGoogleanalyticsTrackView");
        finishCallback();
    });
}

function testGoogleAnalyticsTrackEvent(finishCallback) {
    async.series([
        function(callback) {
            gaTrackEvent(callback);
        },
        function(callback) {
            notificationConfirm("GoogleAnalyticsでEventの件数が増えていること", "GATrackEventの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("gaTrackEventの確認", callback);
        }], function() {
        console.log("testGoogleAnalyticsTrackEvent");
        finishCallback();
    });
}

function testLocalNotificationSchedule(finishCallback) {
    async.series([
        function(callback) {
            localNotificationSchedule1(callback);
        },
        function(callback) {
            notificationConfirm("push通知が来ること", "scheduleの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("localNotificationのscheduleの確認", callback);
        }], function() {
        console.log("testLocalNotificationSchedule");
        finishCallback();
    });
}

function testLocalNotificationCancel(finishCallback) {
    async.series([
        function(callback) {
            localNotificationSchedule1(callback);
        },
        function(callback) {
            localNotificationCancel1(callback);
        },
        function(callback) {
            notificationAlert("5秒後のpush通知を設定しキャンセルしました。", "cancelの確認", "OK", callback);
        },
        function(callback) {
            notificationConfirm("通知が来ないこと\n（通知のスケジュールがキャンセルされていること）", "cancelの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("localNotificationのcancelの確認", callback);
        }], function() {
        console.log("testLocalNotificationCancel");
        finishCallback();
    });
}

function testLocalNotificationAllCancel(finishCallback) {
    async.series([
        function(callback) {
            localNotificationSchedule2(callback);
        },
        function(callback) {
            localNotificationSchedule1(callback);
        },
        function(callback) {
            localNotificationAllCancel(callback);
        },
        function(callback) {
            notificationAlert("5秒後、10秒後のpush通知を設定しAllCancelでキャンセルしました。", "AllCancelの確認", "OK", callback);
        },
        function(callback) {
            notificationConfirm("通知が来ないこと\n（通知のスケジュールがキャンセルされていること）", "AllCancelの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("localNotificationAllCancelの確認", callback);
        }], function() {
        console.log("testLocalNotificationAllCancel");
        finishCallback();
    });
}

function testNotificationVibrate(finishCallback) {
    console.log("testNotificationVibrate");
    testResult("notificationVibrateの確認", finishCallback);
}

function testSplashScreenShow(finishCallback) {
    async.series([
        function(callback) {
            showSplash1(callback);
        },
        function(callback) {
            notificationConfirm("スプラッシュが表示されること", "Splashのshowの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("Splashのshowの確認", callback);
        }], function() {
        console.log("testSplashScreenShow");
        finishCallback();
    });
}

function testSplashScreenHide(finishCallback) {
    async.series([
        function(callback) {
            showSplash1(callback);
        },
        function(callback) {
            notificationConfirm("スプラッシュが表示になること", "Splashのhideの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("Splashのhideの確認", callback);
        }], function() {
        console.log("testSplashScreenHide");
        finishCallback();
    });
}

function testVideoPlay(finishCallback) {
    async.series([
        function(callback) {
            playVideoOverlay(false, callback);
        },
        function(callback) {
            notificationConfirm("動画が指定の位置に表示されていること", "Videoのplayの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("playVideoの確認", callback);
        }], function() {
        console.log("testVideoPlay");
        finishCallback();
    });
}

function testVideoStop(finishCallback) {
    async.series([
        function(callback) {
            playVideoOverlay(false, callback);
        },
        function(callback) {
            stopVideo(callback);
        },
        function(callback) {
            notificationConfirm("動画が停止されていること", "Videoのstopの確認", "OK,NG", callback);
        },
        function(callback) {
            testResult("stopVideoの確認", callback);
        }], function() {
        console.log("testVideoStop");
        finishCallback();
    });
}

function testCameraCleanup(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert("カメラ撮影を行ってください。", "cleanupの確認", "OK", callback);
        },
        function(callback) {
            getPicture1("", callback);
        },
        function(callback) {
            cleanupPicture(callback);
        },
        function(callback) {
            testResult("Cameraのcleanupの確認", callback);
        }], function() {
        console.log("testCameraCleanup");
        finishCallback();
    });
}

function testContactCreate(finishCallback) {
    async.series([
        function(callback) {
            createContact(callback);
        },
        function(callback) {
            testResult("Contact createの確認", callback);
        }], function(err) {
        console.log("testContactCreate");
        finishCallback();
    });
}

function testContactSave(finishCallback) {
    async.series([
        function(callback) {
            saveContact(callback);
        },
        function(callback) {
            testResult("Contact saveの確認", callback);
        }], function() {
        console.log("testContactSave");
        finishCallback();
    });
}

function testContactRemove(finishCallback) {
    console.log("testContactRemove");
    testResult("contactRemoveの確認", finishCallback);
}

function testContactClone(finishCallback) {
    async.series([
        function(callback) {
            cloneContact(callback);
        },
        function(callback) {
            testResult("contactCloneの確認", callback);
        }], function(err) {
        console.log("testContactClone");
        finishCallback();
    });
}

function testContactFind(finishCallback) {
    console.log("testContactFind");
    testResult("contactFindの確認", finishCallback);
}

function testDatabaseOpenDatabase(finishCallback) {
    async.series([
        function(callback) {
            openDb("", callback);
        },
        function(callback) {
            testResult("databaseOpenDatabaseの確認", callback);
        }], function() {
        console.log("testDatabaseOpenDatabase");
        finishCallback();
    });
}

function testDatabaseQuery(finishCallback) {
    async.series([
        function(callback) {
            searchData(callback);
        },
        function(callback) {
            testResult("databaseQueryの確認", callback);
        }], function() {
        console.log("testDatabaseQuery");
        finishCallback();
    });
}

function testDatabaseExec(finishCallback) {
    async.series([
        function(callback) {
            openDb("", callback);
        },
        function(callback) {
            createTable(callback);
        },
        function(callback) {
            testResult("databaseExecの確認", callback);
        }], function() {
        console.log("testDatabaseExec");
        finishCallback();
    });
}

function testDatabaseExecTransaction(finishCallback) {
    async.series([
        function(callback) {
            openDb("", callback);
        },
        function(callback) {
            execTransaction(callback);
        },
        function(callback) {
            testResult("databaseExecTransactionの確認", callback);
        }], function() {
        console.log("testDatabaseExecTransaction");
        finishCallback();
    });
}

function testDeviceGetPushToken(finishCallback) {
    async.series([
        function(callback) {
            getPushToken(callback);
        },
        function(callback) {
            testResult("deviceGetPushTokenの確認", callback);
        }], function() {
        console.log("testDeviceGetPushToken");
        finishCallback();
    });
}

function testDeviceLight(finishCallback) {
    async.series([
        function(callback) {
            light1(true, callback);
        },
        function(callback) {
            notificationConfirm("ライトが点灯すること", "lightの点灯確認", "OK,NG", callback);
        },
        function(callback) {
            light1(false, callback);
        },
        function(callback) {
            notificationConfirm("ライトが消灯すること", "lightの消灯確認", "OK,NG", callback);
        }], function() {
        console.log("testDeviceLight");
        finishCallback();
    });
}

function testDocomoLocationGetCurrentPosition(finishCallback) {
    async.series([
        function(callback) {
            docomoLocation(callback);
            alert("API呼び出し")
        },
        function(callback) {
            testResult("docomoLocationの確認", callback);
            alert("結果出力");
        }], function() {
        console.log("testDocomoLocationGetCurrentPosition");
        finishCallback();
    });
}

function testDirectoryEntryMoveTo(finishCallback) {
    async.series([
        function(callback) {
            mkdir1(callback);
            alert("mkdir1");
        },
        function(callback) {
            moveTo2(callback);
            alert("moveTo2");
        },
        function(callback) {
            console.log("pre rmdir2");
            rmdir2(callback);
            console.log("post rmdir2");
            alert("rmdir2");
        }], function() {
        alert("結果出力");
        console.log("testDirectoryEntryMoveTo");
        alert("directoryMoveTo finalCallback");

        testResult("directoryMoveToの確認", finishCallback);
    });
}

function testDirectoryEntryGetDirectory(finishCallback) {
    async.series([
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            testResult("directoryGetDirectoryの確認", callback);
        }], function() {
        console.log("testDirectoryEntryGetDirectory");
        finishCallback();
    });
}

function testDirectoryEntryRemoveRecursively(finishCallback) {
    async.series([
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            mkdirInDir(callback);
        },
        function(callback) {
            rmdir1(callback);
        },
        function(callback) {
            testResult("directoryRemoveRecursivelyの確認", callback);
        }], function() {
        console.log("testDirectoryEntryRemoveRecursively");
        finishCallback();
    });
}

function testDirectoryEntryRemove(finishCallback) {
    async.series([
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            moveTo2(callback);
        },
        function(callback) {
            rmdir2(callback);
        },
        function(callback) {
            testResult("direcotryRemoveの確認", callback);
        }], function() {
        console.log("testDirectoryEntryRemove");
        finishCallback();
    });
}

function testDirectoryEntryCreateReader(finishCallback) {
    async.series([
        function(callback) {
            directoryReader1(callback);
        },
        function(callback) {
            testResult("createReaderの確認", callback);
        }], function() {
        console.log("testDirectoryEntryCreateReader");
        finishCallback();
    });
}

function testDirectoryEntryCopyTo(finishCallback) {
    async.series([
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            copyTo2(callback);
        },
        function(callback) {
            testResult("directoryCopyToの確認", callback);
        },
        function(callback) {
            rmdir1(callback);
        }], function() {
        console.log("testDirectoryEntryCopyTo");
        finishCallback();
    });
}

function testDirectoryEntryToURL(finishCallback) {
    async.series([
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            toURL2(callback);
        },
        function(callback) {
            testResult("directoryToURLの確認", callback);
        }], function() {
        console.log("testDirectoryEntryToURL");
        finishCallback();
    });
}

function testDirectoryEntryGetParent(finishCallback) {
    async.series([
        function(callback) {
            getParent2(callback);
        },
        function(callback) {
            testResult("directoryGetParentの確認", callback);
        }], function() {
        console.log("testDirectoryEntryGetParent");
        finishCallback();
    });
}

/***************************/

function testFileEntryMoveTo(finishCallback) {
    async.series([
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            moveTo1(callback);
        },
        function(callback) {
            testResult("fileMoveToの確認", callback);
        }], function() {
        console.log("testFileEntryMoveTo");
        finishCallback();
    });
}

function testFileEntryRemove(finishCallback) {
    async.series([
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            deleteFile1(callback);
        },
        function(callback) {
            testResult("fileRemoveの確認", callback);
        }], function() {
        console.log("testFileEntryRemove");
        finishCallback();
    });
}

function testFileEntryCopyTo(finishCallback) {
    async.series([
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            copyTo1(callback);
        },
        function(callback) {
            testResult("fileCopyToの確認", callback);
        }], function() {
        console.log("testFileEntryCopyTo");
        finishCallback();
    });
}

function testFileEntryToURL(finishCallback) {
    async.series([
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            toURL1(callback);
        },
        function(callback) {
            testResult("fileToURLの確認", callback);
        }], function() {
        console.log("testFileEntryToURL");
        finishCallback();
    });
}

function testFileEntryGetParent(finishCallback) {
    async.series([
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            getParent1(callback);
        },
        function(callback) {
            testResult("fileGetParentの確認", callback);
        }], function() {
        console.log("testFileEntryGetParent");
        finishCallback();
    });
}

function testFileEntryFile(finishCallback) {
    async.series([
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            fileRead1(callback);
        },
        function(callback) {
            testResult("fileの確認", callback);
        }], function() {
        console.log("testFileEntryFile");
        finishCallback();
    });
}

function testGlobalizationGetPreferredLanguage(finishCallback) {
    async.series([
        function(callback) {
            getPreferredLanguage(callback);
        },
        function(callback) {
            testResult("getPreferredLanguageの確認", callback);
        }], function() {
        console.log("testGlobalizationGetPreferredLanguage");
        finishCallback();
    });
}

function testGlobalizationGetLocaleName(finishCallback) {
    async.series([
        function(callback) {
            getLocaleName(callback);
        },
        function(callback) {
            testResult("getLocaleNameの確認", callback);
        }], function() {
        console.log("testGlobalizationGetPreferredLanguage");
        finishCallback();
    });
}

function testHTTPGet(finishCallback) {
    async.series([
        function(callback) {
            httpGet(callback);
        },
        function(callback) {
            testResult("httpGetの確認", callback);
        }], function() {
        console.log("testHTTPGet");
        finishCallback();
    });
}

function testHTTPPost(finishCallback) {
    async.series([
        function(callback) {
            httpPost(callback);
        },
        function(callback) {
            testResult("httpPostの確認", callback);
        }], function() {
        console.log("testHTTPPost");
        finishCallback();
    });
}

function testNotificationAlert(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert("alertが表示されることの確認", "notificationAlertの確認", "OK", callback);
        },
        function(callback) {
            testResult("notificationAlertの確認", callback);
        }], function() {
        console.log("testNotificationAlert");
        finishCallback();
    });
}

function testGameSoundReleaseAllSE(finishCallback) {
    async.series([
        function(callback) {
            releaseSEAll(callback);
        },
        function(callback) {
            notificationAlert("SEをリリースしました。", "releaseAllSEの確認", "OK", callback);
        },
        function(callback) {
            playSE(1, callback);
        }], function() {
        console.log("testGameSoundReleaseAllSE");
        notificationConfirm("効果音がならないこと", "GameSoundReleaseAllSE", "OK,NG", finishCallback);
    });
}

function testSimpleStorageSet(finishCallback) {
    async.series([
        function(callback) {
            setSimpleStorage("key", "val", callback);
        },
        function(callback) {
            testResult("simpleStorageSetの確認", callback);
        }], function() {
        console.log("testSimpleStorageSet");
        finishCallback();
    });
}

function testSimpleStorageClear(finishCallback) {
    async.series([
        function(callback) {
            setSimpleStorage('key1', 'val1', callback);
        },
        function(callback) {
            setSimpleStorage('key2', 'val2', callback);
        },
        function(callback) {
            getSimpleStorage('key1', callback);
        },
        function(callback) {
            getSimpleStorage('key2', callback);
        },
        function(callback) {
            clearSimpleStorage(callback);
        },
        function(callback) {
            getSimpleStorage('key1', callback);
        },
        function(callback) {
            getSimpleStorage('key2', callback);
        },
        function(callback) {
            if (simpleStorageData === null) {
                test_result = "OK";
                testResult("simpleStorageClearの確認", callback);
            } else {
                test_result = "NG : " + simpleStorageData;
                testResult("simpleStorageClearの確認", callback);
            }
        }], function() {
        console.log("testSimpleStorageClear");
        finishCallback();
    });
}

function testSimpleStorageRemove(finishCallback) {
    async.series([
        function(callback) {
            setSimpleStorage('key1', 'val1', callback);
        },
        function(callback) {
            getSimpleStorage('key1', callback);
        },
        function(callback) {
            removeSimpleStorage(callback);
        },
        function(callback) {
            getSimpleStorage('key1', callback);
        },
        function(callback) {
            if (simpleStorageData === null) {
                test_result = "OK";
                testResult("simpleStorageClearの確認", callback);
            } else {
                test_result = "NG : " + simpleStorageData;
                testResult("simpleStorageClearの確認", callback);
            }
        }], function() {
        console.log("testSimpleStorageRemove");
        finishCallback();
    });
}

function testSimpleStorageGet(finishCallback) {
    async.series([
        function(callback) {
            setSimpleStorage('key1', 'val1', callback);
        },
        function(callback) {
            getSimpleStorage('key1', callback);
        },
        function(callback) {
            testResult("simpleStorageGetの確認", callback);
        }], function() {
        console.log("testSimpleStorageGet");
        finishCallback();
    });
}

function testWiFiOn(finishCallback) {
    async.series([
        function(callback) {
            onWiFi(callback);
        },
        function(callback) {
            testResult("wifiOnの確認", callback);
        }], function() {
        console.log("testWiFiOn");
        finishCallback();
    });
}

function testWiFiOff(finishCallback) {
    async.series([
        function(callback) {
            offWiFi(callback);
        },
        function(callback) {
            testResult("wifiOffの確認", callback);
        }], function() {
        console.log("testWiFiOff");
        finishCallback();
    });
}

function testWiFiGetStatus(finishCallback) {
    async.series([
        function(callback) {
            getWiFiStatus(callback);
        },
        function(callback) {
            testResult("wifiGetStatusの確認", callback);
        }], function() {
        console.log("testWiFiGetStatus");
        finishCallback();
    });
}

function testWiFiGetCurrentSSID(finishCallback) {
    async.series([
        function(callback) {
            getCurrentSSID(callback);
        },
        function(callback) {
            testResult("wifiGetCurrentSSIDの確認", callback);
        }], function() {
        console.log("testWiFiGetCurrentSSID");
        finishCallback();
    });
}

function testWiFiConnect(finishCallback) {
    async.series([
        function(callback) {
            connectWifi1(callback);
        },
        function(callback) {
            testResult("wifiConnectの確認", callback);
        }], function() {
        console.log("testWiFiConnect");
        finishCallback();
    });
}

function testWiFiGetSSIDList(finishCallback) {
    async.series([
        function(callback) {
            getCurrentSSID(callback);
        },
        function(callback) {
            testResult("wifiGetSSIDListの確認", callback);
        }], function() {
        console.log("testWiFiGetSSIDList");
        finishCallback();
    });
}

function notificationManualTest(finishCallback) {
    async.series([
        function(callback) {
            notificationBeep(4, callback);
        },
        function(callback) {
            notificationVibrate(2000, callback);
        },
        function(callback) {
            notificationAlert("手動テストを開始します。", "手動テスト開始", "OK", callback);
        }], function() {
        console.log("notificationManualTest");
        finishCallback();
    });
}

function testFinishFinish() {
    console.log("testFinish");
    finish();
}

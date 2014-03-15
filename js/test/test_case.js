/**
 * @author mitsuo.yamazaki
 */

var async = require('async');

function testNull(finishCallback) {
    test_result = "OK :";
    testResult("何も実行しない", finishCallback);
}
function testBarcodeCaptureBarcode(finishCallback) {
    /*
    test_result = "OK :";
    testResult("captureBarcodeの確認", finishCallback);
    */
    async.series([
        function(callback) {
            notificationAlert("アプリカンのバーコードを読み込んでください。", "バーコード読み取り", "OK", callback);
        },
        function(callback) {
            captureBarcode(callback);
        }], function() {
        console.log("testBarcodeCaptureBarcode");
        testResult("captureBarcodeの確認", finishCallback);
    });
}

function testCameraGetPicture(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert("カメラ起動後に写真撮影を行ってください。", "getPictureの確認", "OK", callback);
        },
        function(callback) {
            getPicture1(callback);
        },
        function(callback) {
            notificationConfirm("写真撮影が行えること", "getPictureの確認", "OK,NG", callback);
        }], function() {
        console.log("testCameraGetPicture");
        testResult("getPictureの確認", finishCallback);
    });
}

function testCameraSaveToPhotoAlbum(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert('saveToPhoAlbumの確認のため,写真撮影を行ってください。', "saveToPhotoの確認", "OK", callback);
        },
        function(callback) {
            getPicture1(callback);
        },
        function(callback) {
            saveToPhotoAlbum(callback);
        }], function() {
        console.log("testCameraSaveToPhotoAlbum");
        testResult("saveToPhotoAlbumの確認", finishCallback);
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
        },
        function(callback) {
            notificationConfirm("写真撮影が行えること", "captureImageの確認", "OK,NG", callback);
        }], function() {
        console.log("testCaptureCaptureImage");
        testResult("captureCaptureImageの確認", finishCallback);
    });
}

function testCaptureCaptureAudio(finishCallback) {
    if (applican.device.platform === "iOS") {
        test_result = "OK : AnroidのみのAPIのためiOSはスキップ";
        testResult("captureAudioの確認", finishCallback);
        return;
    }

    async.series([
        function(callback) {
            captureAudio(callback);
        },
        function(callback) {
            notificationConfirm("録音が行えること", "captureVideoの確認", "OK,NG", callback);
        }], function() {
        console.log("testCaptureCaptureAudio");
        testResult("captureAudioの確認", finishCallback);
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
        }], function() {
        console.log("testCaptureCaptureVideo");
        testResult("captureVideoの確認", finishCallback);
    });
}

function testAccelerometerGetCurrentAcceleration(finishCallback) {
    async.series([
        function(callback) {
            clearWatchAcceleration(callback);
        },
        function(callback) {
            getCurrentAcceleration(callback);
        }], function() {
        console.log("testAccelerometerGetCurrentAcceleration");
        testResult("getCurrentAccelerationの確認", finishCallback);
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
            watchHeading(callback);
        }], function() {
        console.log("testCompassGetCurrentHeading");
        testResult("getCurrentHeadingの確認", finishCallback);
    });
}

function testConnectionType(finishCallback) {
    async.series([
        function(callback) {
            checkDeviceInfo(callback);
        }], function() {
        console.log("testConnectionType");
        testResult("Device Connection typeの確認", finishCallback);
    });
}

function testDeviceGetDisplayInfo(finishCallback) {
    async.series([
        function(callback) {
            getDisplayInfo(callback);
        }], function() {
        console.log("testDeviceGetDisplayInfo");
        testResult("Device Connection typeの確認", finishCallback);
    });
}

function testGameSoundLoadSE(finishCallback) {
    async.series([
        function(callback) {
            loadSE(callback);
        },
        function(callback) {
            releaseSEAll(callback);
        }], function() {
        console.log("testGameSoundLoadSE");
        testResult("loadSEの確認", finishCallback);
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
            releaseSEAll(callback);
        }], function() {
        console.log("testGameSoundSetSEVolume");
        testResult("setSEVolumeの確認", finishCallback);
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
            releaseSEAll(callback);
        }], function() {
        console.log("testGameSoundPlaySE");
        testResult("playSEの確認", finishCallback);
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
            notificationConfirm("各効果音が停止されていること", "stopSEの確認", "OK,NG", callback);
        },
        function(callback) {
            releaseSEAll(callback);
        }], function() {
        console.log("testGameSoundStopSE");
        testResult("stopSEの確認", finishCallback);
    });
}

function testGameSoundStopAllSE(finishCallback) {
    async.series([
        function(callback) {
            loadSE(callback);
        },
        function(callback) {
            playSE(3, callback);
        },
        function(callback) {
            stopAllSE(callback);
        },
        function(callback) {
            notificationConfirm("各効果音が停止されていること", "stopAllSEの確認", "OK,NG", callback);
        },
        function(callback) {
            releaseSEAll(callback);
        }], function() {
        console.log("testGameSoundStopAllSE");
        testResult("StopAllSEの確認", finishCallback);
    });
}function testGEOLocationGetCurrentPosition(finishCallback) {
    async.series([
        function(callback) {
            clearWatchPosition(callback);
        },
        function(callback) {
            getCurrentPosition(callback);
        },
        function(callback) {
            watchPosition(callback);
        }], function() {
        console.log("testGEOLocationGetCurrentPosition");
        testResult("GEOLocationのgetCurrentPositionの確認", finishCallback);
    });
}

function testGoogleAnalyticsTrackView(finishCallback) {
    async.series([
        function(callback) {
            gaTrackView(callback);
        },
        function(callback) {
            notificationConfirm("GoogleAnalyticsでViewの件数が増えていること", "GATrackViewの確認", "OK,NG", callback);
        }], function() {
        console.log("testGoogleanalyticsTrackView");
        testResult("gaTrackViewの確認", finishCallback);
    });
}

function testGoogleAnalyticsTrackEvent(finishCallback) {
    async.series([
        function(callback) {
            gaTrackEvent(callback);
        },
        function(callback) {
            notificationConfirm("GoogleAnalyticsでEventの件数が増えていること", "GATrackEventの確認", "OK,NG", callback);
        }], function() {
        console.log("testGoogleAnalyticsTrackEvent");
        testResult("gaTrackEventの確認", finishCallback);
    });
}

function testLocalNotificationSchedule(finishCallback) {
    async.series([
        function(callback) {
            localNotificationSchedule1(callback);
        },
        function(callback) {
            notificationConfirm("push通知が来ること", "scheduleの確認", "OK,NG", callback);
        }], function() {
        console.log("testLocalNotificationSchedule");
        testResult("localNotificationのscheduleの確認", finishCallback);
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
        }], function() {
        console.log("testLocalNotificationCancel");
        testResult("localNotificationのcancelの確認", finishCallback);
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
        }], function() {
        console.log("testLocalNotificationAllCancel");
        testResult("localNotificationAllCancelの確認", finishCallback);
    });
}


function testSplashScreenShow(finishCallback) {
    async.series([
        function(callback) {
            showSplash(callback);
        },
        function(callback) {
            notificationConfirm("スプラッシュが表示されること", "Splashのshowの確認", "OK,NG", callback);
        }], function() {
        console.log("testSplashScreenShow");
        testResult("Splashのshowの確認", finishCallback);
    });
}

function testSplashScreenHide(finishCallback) {
    async.series([
        function(callback) {
            hideSplash(callback);
        },
        function(callback) {
            notificationConfirm("スプラッシュが非表示になること", "Splashのhideの確認", "OK,NG", callback);
        }], function() {
        console.log("testSplashScreenHide");
        testResult("Splashのhideの確認", finishCallback);
    });
}

function testVideoPlay(finishCallback) {
    async.series([
        function(callback) {
            playVideoOverlay(false, callback);
        },
        function(callback) {
            notificationConfirm("動画が指定の位置に表示されていること", "Videoのplayの確認", "OK,NG", callback);
        }], function() {
        console.log("testVideoPlay");
        testResult("playVideoの確認", finishCallback);
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
        }], function() {
        console.log("testVideoStop");
        testResult("stopVideoの確認", finishCallback);
    });
}

function testCameraCleanup(finishCallback) {
    async.series([
        function(callback) {
            notificationAlert("カメラ撮影を行ってください。", "cleanupの確認", "OK", callback);
        },
        function(callback) {
            getPicture1(callback);
        },
        function(callback) {
            cleanupPicture(callback);
        }], function() {
        console.log("testCameraCleanup");
        testResult("Cameraのcleanupの確認", finishCallback);
    });
}

function testContactCreate(finishCallback) {
    async.series([
        function(callback) {
            createContact(callback);
        }], function(err) {
        console.log("testContactCreate");
        testResult("Contact createの確認", finishCallback);
    });
}

function testContactSave(finishCallback) {
    async.series([
        function(callback) {
            contactFixture("Test", callback);
        },
        function(callback) {
            saveContact(callback);
        }], function() {
        console.log("testContactSave");
        testResult("Contact saveの確認", finishCallback);
    });
}

function testContactRemove(finishCallback) {
    async.series([
        function(callback) {
            // Testは全部削除しておく
            contactFixture("Test", callback);
        },
        function(callback) {
            saveContact(callback);
        },
        function(callback) {
            // 追加した一つのTestだけ削除できれば成功
            removeContact("Test", callback);
        }], function() {
        console.log("testContactRemove");
        testResult("contactRemoveの確認", finishCallback);
    });
}

function testContactClone(finishCallback) {
    async.series([
        function(callback) {
            cloneContact(callback);
        }], function(err) {
        console.log("testContactClone");
        testResult("contactCloneの確認", finishCallback);
    });
}

function testContactFind(finishCallback) {
    async.series([
        function(callback) {
            contactFixture("Test", callback);
        },
        function(callback) {
            saveContact(callback);
        },
        function(callback) {
            findContact(callback);
        }], function() {
        console.log("testContactFind");
        testResult("contactFindの確認", finishCallback);
    });
}

function testDatabaseOpenDatabase(finishCallback) {
    async.series([
        function(callback) {
            openDb("", callback);
        }], function() {
        console.log("testDatabaseOpenDatabase");
        testResult("databaseOpenDatabaseの確認", finishCallback);
    });
}

function testDatabaseQuery(finishCallback) {
    async.series([
        function(callback) {
            openDb("", callback);
        },
        function(callback) {
            searchData(callback);
        }], function() {
        console.log("testDatabaseQuery");
        testResult("databaseQueryの確認", finishCallback);
    });
}

function testDatabaseExec(finishCallback) {
    async.series([
        function(callback) {
            openDb("", callback);
        },
        function(callback) {
            createTable(callback);
        }], function() {
        console.log("testDatabaseExec");
        testResult("databaseExecの確認", finishCallback);
    });
}

function testDatabaseExecTransaction(finishCallback) {
    async.series([
        function(callback) {
            openDb("", callback);
        },
        function(callback) {
            execTransaction(callback);
        }], function() {
        console.log("testDatabaseExecTransaction");
        testResult("databaseExecTransactionの確認", finishCallback);
    });
}

function testDeviceGetPushToken(finishCallback) {
    async.series([
        function(callback) {
            getPushToken(callback);
        }], function() {
        console.log("testDeviceGetPushToken");
        testResult("deviceGetPushTokenの確認", finishCallback);
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
        testResult("deviceLightの確認", finishCallback);
    });
}

function testDocomoLocationGetCurrentPosition(finishCallback) {
    async.series([
        function(callback) {
            docomoLocation(callback);
        }], function() {
        console.log("testDocomoLocationGetCurrentPosition");
        testResult("docomoLocationの確認", finishCallback);
    });
}

function testDirectoryEntryMoveTo(finishCallback) {
    async.series([
        function(callback) {
            rmdirFixture("newDir", callback);
        },
        function(callback) {
            rmdirFixture("newDir2", callback);
        },
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            moveTo2(callback);
        }], function() {
        console.log("testDirectoryEntryMoveTo");
        testResult("directoryMoveToの確認", finishCallback);
    });
}

function testDirectoryEntryGetDirectory(finishCallback) {
    async.series([
        function(callback) {
            rmdirFixture("newDir", callback);
        },
        function(callback) {
            mkdir1(callback);
        }], function() {
        console.log("testDirectoryEntryGetDirectory");
        testResult("directoryGetDirectoryの確認", finishCallback);
    });
}

function testDirectoryEntryRemoveRecursively(finishCallback) {
    async.series([
        function(callback) {
            rmdirFixture("newDir", callback);
        },
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            mkdirInDir(callback);
        }], function() {
        console.log("testDirectoryEntryRemoveRecursively");
        testResult("directoryRemoveRecursivelyの確認", finishCallback);
    });
}

function testDirectoryEntryRemove(finishCallback) {
    async.series([
        function(callback) {
            rmdirFixture("newDir", callback);
        },
        function(callback) {
            rmdirFixture("newDir2", callback);
        },
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            moveTo2(callback);
        }], function() {
        console.log("testDirectoryEntryRemove");
        testResult("direcotryRemoveの確認", finishCallback);
    });
}

function testDirectoryEntryCreateReader(finishCallback) {
    async.series([
        function(callback) {
            directoryReader1(callback);
        }], function() {
        console.log("testDirectoryEntryCreateReader");
        testResult("directoryEntryCreateReaderの確認", finishCallback);
    });
}

function testDirectoryEntryCopyTo(finishCallback) {
    async.series([
        function(callback) {
            rmdirFixture("newDir", callback);
        },
        function(callback) {
            rmdirFixture("newDir3", callback);
        },
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            copyTo2(callback);
        }], function() {
        console.log("testDirectoryEntryCopyTo");
        testResult("directoryCopyToの確認", finishCallback);
    });
}

function testDirectoryEntryToURL(finishCallback) {
    async.series([
        function(callback) {
            rmdirFixture("newDir", callback);
        },
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            toURL2(callback);
        }], function() {
        console.log("testDirectoryEntryToURL");
        testResult("directoryToURLの確認", finishCallback);
    });
}

function testDirectoryEntryGetParent(finishCallback) {
    async.series([
        function(callback) {
            rmdirFixture("newDir", callback);
        },
        function(callback) {
            mkdir1(callback);
        },
        function(callback) {
            getParent2(callback);
        }], function() {
        console.log("testDirectoryEntryGetParent");
        testResult("directoryGetParentの確認", finishCallback);
    });
}

/***************************/

function testFileEntryMoveTo(finishCallback) {
    async.series([
        function(callback) {
            deleteFileFixture("readme.txt", callback);
        },
        function(callback) {
            deleteFileFixture("readme2.txt", callback);
        },
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            moveTo1(callback);
        }], function() {
        console.log("testFileEntryMoveTo");
        testResult("fileMoveToの確認", finishCallback);
    });
}

function testFileEntryRemove(finishCallback) {
    async.series([
        function(callback) {
            deleteFileFixture("readme.txt", callback);
        },
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            deleteFile1(callback);
        }], function() {
        console.log("testFileEntryRemove");
        testResult("fileRemoveの確認", finishCallback);
    });
}

function testFileEntryCopyTo(finishCallback) {
    async.series([
        function(callback) {
            deleteFileFixture("readme.txt", callback);
        },
        function(callback) {
            deleteFileFixture("readme3.txt", callback);
        },
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            copyTo1(callback);
        }], function() {
        console.log("testFileEntryCopyTo");
        testResult("fileCopyToの確認", finishCallback);
    });
}

function testFileEntryToURL(finishCallback) {
    async.series([
        function(callback) {
            deleteFileFixture("readme.txt", callback);
        },
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            toURL1(callback);
        }], function() {
        console.log("testFileEntryToURL");
        testResult("fileToURLの確認", finishCallback);
    });
}

function testFileEntryGetParent(finishCallback) {
    async.series([
        function(callback) {
            deleteFileFixture("readme.txt", callback);
        },
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            getParent1(callback);
        }], function() {
        console.log("testFileEntryGetParent");
        testResult("fileGetParentの確認", finishCallback);
    });
}

function testFileEntryFile(finishCallback) {
    async.series([
        function(callback) {
            fileWriteTest(callback);
        },
        function(callback) {
            fileRead1(callback);
        }], function() {
        console.log("testFileEntryFile");
        testResult("fileの確認", finishCallback);
    });
}

function testGlobalizationGetPreferredLanguage(finishCallback) {
    async.series([
        function(callback) {
            getPreferredLanguage(callback);
        }], function() {
        console.log("testGlobalizationGetPreferredLanguage");
        testResult("getPreferredLanguageの確認", finishCallback);
    });
}

function testGlobalizationGetLocaleName(finishCallback) {
    async.series([
        function(callback) {
            getLocaleName(callback);
        }], function() {
        console.log("testGlobalizationGetPreferredLanguage");
        testResult("getLocaleNameの確認", finishCallback);
    });
}

function testHTTPGet(finishCallback) {
    async.series([
        function(callback) {
            httpGet(callback);
        }], function() {
        console.log("testHTTPGet");
        testResult("httpGetの確認", finishCallback);
    });
}

function testHTTPPost(finishCallback) {
    async.series([
        function(callback) {
            httpPost(callback);
        }], function() {
        console.log("testHTTPPost");
        testResult("httpPostの確認", finishCallback);
    });
}

function testNotificationAlert(finishCallback) {
    async.series([
        function(callback) {
            notificationAlertForTest("alertが表示されることの確認", "notificationAlertの確認", "OK", callback);
        }], function() {
        console.log("testNotificationAlert");
        testResult("notificationAlertの確認", finishCallback);
    });
}

function testNotificationVibrate(finishCallback) {
    async.series([
       function(callback) {
            notificationVibrate(1000, callback);
        },
        function(callback) {
            notificationConfirm("1秒バイブレーションすること", "notificationVibrateの確認", "OK,NG", callback);
        }], function() {
        console.log("testNotificationVibrate");
        testResult("notificationVibrateの確認", finishCallback);
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
        },
        function(callback) {
            notificationConfirm("効果音がならないこと", "GameSoundReleaseAllSE", "OK,NG", callback);
        }], function() {
        console.log("testGameSoundReleaseAllSE");
        testResult("gameSoundReleaseAllSEの確認", finishCallback);
    });
}

function testSimpleStorageSet(finishCallback) {
    async.series([
        function(callback) {
            setSimpleStorage("key", "val", callback);
        }], function() {
        console.log("testSimpleStorageSet");
        testResult("simpleStorageSetの確認", finishCallback);
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
            } else {
                test_result = "NG : " + simpleStorageData;
            }
            callback();
        }], function() {
        console.log("testSimpleStorageClear");
        testResult("simpleStorageClearの確認", finishCallback);
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
            removeSimpleStorage('key1', callback);
        },
        function(callback) {
            getSimpleStorage('key1', callback);
        },
        function(callback) {
            if (simpleStorageData === null) {
                test_result = "OK";
            } else {
                test_result = "NG : " + simpleStorageData;
            }
            callback();
        }], function() {
        console.log("testSimpleStorageRemove");
        testResult("simpleStorageRemoveの確認", finishCallback);
    });
}

function testSimpleStorageGet(finishCallback) {
    async.series([
        function(callback) {
            setSimpleStorage('key1', 'val1', callback);
        },
        function(callback) {
            getSimpleStorage('key1', callback);
        }], function() {
        console.log("testSimpleStorageGet");
        testResult("simpleStorageGetの確認", finishCallback);
    });
}

function testWiFiOn(finishCallback) {
    if (applican.device.platform === "iOS") {
        test_result = "OK : AnroidのみのAPIのためiOSはスキップ";
        testResult("wifiOnの確認", finishCallback);
        return;
    }
    async.series([
        function(callback) {
            onWiFi(callback);
        }], function() {
        console.log("testWiFiOn");
        testResult("wifiOnの確認", finishCallback);
    });
}

function testWiFiOff(finishCallback) {
    if (applican.device.platform === "iOS") {
        test_result = "OK : AnroidのみのAPIのためiOSはスキップ";
        testResult("wifiOffの確認", finishCallback);
        return;
    }

    async.series([
        function(callback) {
            offWiFi(callback);
        },
        function(callback) {
            onWiFi(callback);
        }], function() {
        console.log("testWiFiOff");
        testResult("wifiOffの確認", finishCallback);
    });
}

function testWiFiGetStatus(finishCallback) {
    if (applican.device.platform === "iOS") {
        test_result = "OK : AnroidのみのAPIのためiOSはスキップ";
        testResult("wifiGetStatusの確認", finishCallback);
        return;
    }

    async.series([
        function(callback) {
            getWiFiStatus(callback);
        }], function() {
        console.log("testWiFiGetStatus");
        testResult("wifiGetStatusの確認", finishCallback);
    });
}

function testWiFiGetCurrentSSID(finishCallback) {
    if (applican.device.platform === "iOS") {
        test_result = "OK : AnroidのみのAPIのためiOSはスキップ";
        testResult("wifiGetCurrentSSIDの確認", finishCallback);
        return;
    }

    async.series([
        function(callback) {
            getCurrentSSID(callback);
        }], function() {
        console.log("testWiFiGetCurrentSSID");
        testResult("wifiGetCurrentSSIDの確認", finishCallback);
    });
}

function testWiFiConnect(finishCallback) {
    if (applican.device.platform === "iOS") {
        test_result = "OK : AnroidのみのAPIのためiOSはスキップ";
        testResult("wifiConnectの確認", finishCallback);
        return;
    }

    async.series([
        function(callback) {
            connectWifi1(callback);
        }], function() {
        console.log("testWiFiConnect");
        testResult("wifiConnectの確認", finishCallback);
    });
}

function testWiFiGetSSIDList(finishCallback) {
    if (applican.device.platform === "iOS") {
        test_result = "OK : AnroidのみのAPIのためiOSはスキップ";
        testResult("wifiGetSSIDListの確認", finishCallback);
        return;
    }

    async.series([
        function(callback) {
            getSSIDList(callback);
        }], function() {
        console.log("testWiFiGetSSIDList");
        testResult("wifiGetSSIDListの確認", finishCallback);
    });
}

function testFinishFinish(finishCallback) {
    finish();
    test_result = "OK : finish";
    console.log("testFinish");
    tetResult("finishFnishの確認", finishCallback);
}


function testCaseTemplate(finishCallback) {
    async.series([
        function(callback) {
            // setup
            testAPITemplate(callback);
        },
       function(callback) {
           // execute
            testAPITemplate(callback);
        },
        function(callback) {
            // teardown
            testAPITemplate(callback);
        }], function() {
        console.log("testCaseTemplate");
        testResult("testCaseTemplateの確認", finishCallback);
    });
}
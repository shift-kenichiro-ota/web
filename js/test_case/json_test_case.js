define(function() {
    var test_case_json = [
        {"key" : "01", "exeflg" : true, "val": [
            "CameraGetPicture", "FinishFinish"
        ], "WebView":1},
        {"key" : "02", "exeflg" : true, "val": [
            "CameraGetPicture", "FinishFinish"
        ], "WebView":2},
        {"key" : "03", "exeflg" : true, "val": [
            "CameraGetPicture", "FinishFinish"
        ], "WebView":1},
        {"key" : "04", "exeflg" : true, "val": [
            "CameraGetPicture", "FinishFinish"
        ], "WebView":2},
        {"key" : "05", "exeflg" : true, "val": [
            "CameraGetPicture", "FinishFinish"
        ], "WebView":2},
        {"key" : "06", "exeflg" : true, "val": [
            "CameraGetPicture", "FinishFinish"
        ], "WebView":1}


        /*
        {"key" : "01", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryFile", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "02", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExecTransaction", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryMoveTo", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "03", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryFile", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageClear", "SplashScreenShow", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "04", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExecTransaction", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryToURL", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "05", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseOpenDatabase", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryFile", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageGet", "SplashScreenHide", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "06", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryFile", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenHide", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "07", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryToURL", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "08", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExecTransaction", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryCopyTo", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenHide", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "09", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryGetParent", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoStop", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "10", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryMoveTo", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "11", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryGetParent", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenHide", "VideoStop", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "12", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryGetParent", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "13", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryFile", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "14", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryMoveTo", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "15", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryToURL", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "16", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryCopyTo", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageGet", "SplashScreenHide", "VideoPlay", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "17", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryGetParent", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenShow", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "18", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExec", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryToURL", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenHide", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "19", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryMoveTo", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "20", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryGetParent", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenHide", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "21", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryGetParent", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageGet", "SplashScreenShow", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "22", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryMoveTo", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageClear", "SplashScreenShow", "VideoStop", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "23", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryCopyTo", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageGet", "SplashScreenShow", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "24", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryToURL", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenHide", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "25", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryFile", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "26", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryMoveTo", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenHide", "VideoPlay", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "27", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryFile", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "28", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryToURL", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoStop", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "29", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryFile", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenHide", "VideoStop", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "30", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryFile", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenHide", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "31", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryMoveTo", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenHide", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "32", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryCopyTo", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageGet", "SplashScreenHide", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "33", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryGetParent", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "34", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseExecTransaction", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryToURL", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenHide", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "35", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryToURL", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoStop", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "36", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryMoveTo", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenHide", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "37", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryGetParent", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenHide", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "38", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryCopyTo", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "39", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExecTransaction", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryGetParent", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageSet", "SplashScreenShow", "VideoStop", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "40", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryCopyTo", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "41", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryCopyTo", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageGet", "SplashScreenShow", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "42", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryToURL", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenHide", "VideoPlay", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "43", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryMoveTo", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "44", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseOpenDatabase", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryGetParent", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageClear", "SplashScreenHide", "VideoStop", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "45", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryFile", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageRemove", "SplashScreenHide", "VideoPlay", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "46", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryToURL", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoPlay", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "47", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryCopyTo", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageGet", "SplashScreenHide", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "48", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryCopyTo", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenHide", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "49", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExecTransaction", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryGetParent", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenShow", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "50", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExecTransaction", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryToURL", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageGet", "SplashScreenHide", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "51", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryMoveTo", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageGet", "SplashScreenHide", "VideoPlay", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "52", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryCopyTo", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "53", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryCopyTo", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 1}
        */
    ];
    return {
        test_case_list : test_case_json 
    };
});

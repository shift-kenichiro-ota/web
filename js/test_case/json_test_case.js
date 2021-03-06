define(function() {
    var test_case_json = [
        /*
        {"key" : "01", "exeflg" : true, "val" : [
            "DatabaseQuery", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "02", "exeflg" : true, "val" : [
            "DatabaseQuery", "FinishFinish"
        ], "WebView" : 2},
         {"key" : "03", "exeflg" : true, "val" : [
            "DatabaseQuery", "FinishFinish"
        ], "WebView" : 1},
         {"key" : "04", "exeflg" : true, "val" : [
            "DatabaseQuery", "DatabaseQuery", "FinishFinish"
        ], "WebView" : 1},
         {"key" : "05", "exeflg" : true, "val" : [
            "DatabaseQuery", "DatabaseQuery", "FinishFinish"
        ], "WebView" : 1},
        */

        {"key" : "01", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseOpenDatabase", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryFile", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "02", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryGetParent", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageGet", "SplashScreenHide", "VideoStop", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "03", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryMoveTo", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "04", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryCopyTo", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageClear", "SplashScreenShow", "VideoStop", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "05", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExecTransaction", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryMoveTo", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageGet", "SplashScreenHide", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "06", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryGetParent", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoPlay", "WiFiConnect", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "07", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryCopyTo", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "08", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryToURL", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "09", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseOpenDatabase", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryGetParent", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageClear", "SplashScreenShow", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "10", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExecTransaction", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryFile", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoPlay", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "11", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryGetParent", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenShow", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "12", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryMoveTo", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageClear", "SplashScreenShow", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "13", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseQuery", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryCopyTo", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageGet", "SplashScreenHide", "VideoStop", "WiFiOff", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "14", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryMoveTo", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "15", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryToURL", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageSet", "SplashScreenShow", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "16", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryMoveTo", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "17", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryFile", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageSet", "SplashScreenHide", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "18", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryToURL", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenShow", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "19", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseExec", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryMoveTo", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenShow", "VideoStop", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "20", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraCleanup", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryCopyTo", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "21", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryMoveTo", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenHide", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "22", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseQuery", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryToURL", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "23", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryFile", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenHide", "VideoStop", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "24", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryCopyTo", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "25", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExecTransaction", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryToURL", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenHide", "VideoStop", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "26", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryGetParent", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenShow", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "27", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExec", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryCopyTo", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageGet", "SplashScreenHide", "VideoPlay", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "28", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryCopyTo", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoStop", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "29", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExec", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryToURL", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenHide", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "30", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryMoveTo", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenHide", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "31", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseExecTransaction", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryCopyTo", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoPlay", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "32", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseOpenDatabase", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryGetParent", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageGet", "SplashScreenHide", "VideoStop", "WiFiOn", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "33", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraGetPicture", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryCopyTo", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenShow", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "34", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExecTransaction", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryCopyTo", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenShow", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "35", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseExecTransaction", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryGetParent", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoPlay", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "36", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryToURL", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "37", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryFile", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageSet", "SplashScreenHide", "VideoStop", "WiFiOn", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "38", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryMoveTo", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "39", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryToURL", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "40", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseOpenDatabase", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryFile", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageSet", "SplashScreenShow", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "41", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryMoveTo", "GameSoundLoadSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "42", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseQuery", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryFile", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "43", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryToURL", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageClear", "SplashScreenShow", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "44", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetDirectory", "FileEntryToURL", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationVibrate", "SimpleStorageClear", "SplashScreenShow", "VideoPlay", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "45", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseOpenDatabase", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryFile", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageGet", "SplashScreenHide", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "46", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExecTransaction", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryCreateReader", "FileEntryToURL", "GameSoundSetSEVolume", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationCancel", "NotificationAlert", "SimpleStorageGet", "SplashScreenShow", "VideoStop", "WiFiOn", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "47", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactCreate", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryFile", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageClear", "SplashScreenHide", "VideoStop", "WiFiConnect", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "48", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseQuery", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryToURL", "FileEntryGetParent", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoStop", "WiFiOff", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "49", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseOpenDatabase", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryGetParent", "FileEntryCopyTo", "GameSoundPlaySE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationCancel", "NotificationVibrate", "SimpleStorageSet", "SplashScreenHide", "VideoStop", "WiFiGetStatus", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "50", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactClone", "DatabaseExecTransaction", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryCopyTo", "FileEntryMoveTo", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackView", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageRemove", "SplashScreenHide", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "51", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureAudio", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseExec", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryGetParent", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetLocaleName", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "52", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactRemove", "DatabaseQuery", "DeviceGetDisplayInfo", "DocomoLocationGetCurrentPosition", "DirectoryEntryMoveTo", "FileEntryFile", "GameSoundReleaseAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationAlert", "SimpleStorageClear", "SplashScreenHide", "VideoPlay", "WiFiGetCurrentSSID", "FinishFinish"
        ], "WebView" : 1},
        {"key" : "53", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureVideo", "CompassGetCurrentHeading", "ConnectionType", "ContactSave", "DatabaseQuery", "DeviceGetPushToken", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemove", "FileEntryToURL", "GameSoundStopAllSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationAllCancel", "NotificationVibrate", "SimpleStorageRemove", "SplashScreenShow", "VideoStop", "WiFiGetSSIDList", "FinishFinish"
        ], "WebView" : 2},
        {"key" : "54", "exeflg" : true, "val" : [
            "AccelerometerGetCurrentAcceleration", "BarcodeCaptureBarcode", "CameraSaveToPhotoAlbum", "CaptureCaptureImage", "CompassGetCurrentHeading", "ConnectionType", "ContactFind", "DatabaseExecTransaction", "DeviceLight", "DocomoLocationGetCurrentPosition", "DirectoryEntryRemoveRecursively", "FileEntryToURL", "GameSoundStopSE", "GEOLocationGetCurrentPosition", "GlobalizationGetPreferredLanguage", "GoogleAnalyticsTrackEvent", "HTTPGet", "LocalNotificationSchedule", "NotificationAlert", "SimpleStorageRemove", "SplashScreenShow", "VideoPlay", "WiFiOn", "FinishFinish"
        ], "WebView" : 2}
    ];
    return {
        test_case_list : test_case_json 
    };
});

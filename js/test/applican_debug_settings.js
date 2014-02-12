
define( function (){
	var pfprototype_debug_settings = {};


	pfprototype_debug_settings.device = {
		name        : 'DEBUG_DEVICE',
		platform    : 'Android',
		uuid        : '123456789012345',
		version     : '4.2',
		pfprototype : '0.5'
	};



	pfprototype_debug_settings.connection = {
		type        : 'CELL_3G'		//e.g. CELL, WIFI, NONE, UNKNOWN
	};



	pfprototype_debug_settings.barcode = {
		data        : 'http://www.yahoo.co.jp/'
	};



	pfprototype_debug_settings.compass = {
		magneticHeading  : 30,
		trueHeading      : 30,
		headingAccuracy  : 0
		//timestamp        : 1361761130911,
	};
	return pfprototype_debug_settings;
});


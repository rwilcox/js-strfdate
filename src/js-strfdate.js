String.prototype.zfill = function (width){
	var str = '' + this;
	while (str.length < width) str = '0' + str;
	return str;
}

Date.prototype.strfdate = function (format){
	var dt = this;
	
	var year = dt.getFullYear();
	var month = dt.getMonth();
	var date = dt.getDate();
	var hours = dt.getHours();
	var minutes = dt.getMinutes();
	var seconds = dt.getSeconds();
	var day = dt.getDay();
	var offset = dt.getTimezoneOffset();
	
	var pieces = new Array();
	var piece;
	var previousChar = '';
	for (var c=0; c < format.length; c++){
		if (format[c] == '\\'){
			c += 1;
			piece = format[c];
		} if (format[c] == "%") {
			
			if (previousChar == "%") {
				// %% means we want to put a literal % in our string...
				piece = format[c]
			} else {
				// else we are starting a new formatting string...
				previousChar = format[c];
				continue;
			}
		} else {
			try {
				formatter = 'format_'+format[c]+'()';
				piece = eval(formatter);
			} catch (e){
				piece = format[c];
			}
		}
		pieces.push(piece);	//piece is the evaluated string from one of the format functions OR whatever we determined it should be
		previousChar = format[c];	// we want to save the current character, NOT the previously evaluated results
	}
	return pieces.join('');
	
	function format_a(){
		if (hours > 11) return 'p.m.';
		return 'a.m.';
	}
	function format_A(){
		if (hours > 11) return 'PM';
		return 'AM';
	}
	function format_b(){
		return format_M().toLowerCase();
	}
	/* function format_B(){ // not implemented } */
	function format_d(){
		return ('' + date).zfill(2);
	}
	function format_D(){
		return format_l().slice(0, 3);
	}
	function format_f(){
		if (minutes == 0) return format_g();
		return format_g() + ':' + format_i();
	}
	function format_F(){
		var NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
		return NAMES[month];
	}
	function format_g(){
		if (hours == 0) return '12';
		if (hours > 12) return ('' + (hours - 12));
		return ('' + hours);
	}
	function format_G(){
		return ('' + hours);
	}
	function format_h(){
		return format_g().zfill(2);
	}
	function format_H(){
		return format_G().zfill(2);
	}
	function format_i(){
		return ('' + minutes).zfill(2);
	}
	/* function format_I(){ // TODO: to be implemented } */
	function format_j(){
		return ('' + date);
	}
	function format_l(){
		var NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		return NAMES[format_w()];
	}
	function format_L(mod){
		var y = (mod == undefined) ? year : year + mod
		return y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)
	}
	function format_m(){
		return format_n().zfill(2);
	}
	function format_M(){
		return format_F().slice(0, 3);
	}
	function format_n(){
		return ('' + (month + 1));
	}
	function format_N(){
		var NAMES = ['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.']
		return NAMES[month];
	}
	function format_O(){
		var offset_hours = ('' +  parseInt(offset / 60)).zfill(2);
		var offset_minutes = ('' + (offset % 60)).zfill(2);
		var sign = (offset >= 0) ? '+' : '-';
		return (sign + offset_hours + offset_minutes)
	}
	function format_P(){
		if (minutes == 0 && hours == 0) return 'midnight';
		if (minutes == 0 && hours == 12) return 'noon';
		return format_f() + ' ' + format_a();
	}
	function format_r(){
		return dt.strfdate('D, j M Y H:i:s O');
	}
	function format_s(){
		return ('' + seconds).zfill(2);
	}
	function format_S(){
		if (date == 11 || date == 12 || date == 13) return 'th';
		var digit = date % 10;
		if (digit == 1) return 'st';
		if (digit == 2) return 'nd';
		if (digit == 3) return 'rd';
		return 'th';
	}
	function format_t(){
		var DAYS = [31, 28+format_L(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		return ('' + DAYS[month]);
	}
	/* function format_T(){ // TODO: to be implemented } */
	function format_U(){
		return '' + (Math.round(dt.getTime() / 1000) + (offset * 60))
	}
	function format_w(){
		return ('' + day);
	}
	function format_W(){
		var week_number;
		var jan1 = new Date();
		jan1.setDate(1);
		jan1.setMonth(0);
		jan1.setFullYear(year);
		var jan1_weekday = convertday(jan1.getDay()) + 1;
		var weekday = convertday(day) + 1;
		var day_of_year = parseInt(format_z());
		if (day_of_year <= (8 - jan1_weekday) && jan1_weekday > 4){
			if (jan1_weekday == 5 || (jan1_weekday == 6 && format_L(-1))){
				week_number = 53;
			} else {
				week_number = 52;
			}
		} else {
			if (format_L()){
				var i = 366;
			} else {
				var i = 365;
			}
			if ((i - day_of_year) < (4 - weekday)){
				week_number = 1;
			} else {
				var j = day_of_year + (7 - weekday) + (jan1_weekday - 1);
				week_number = parseInt(j / 7);
				if (jan1_weekday > 4){
					week_number -= 1;
				}
			}
		}
		return ('' + week_number);
		
		function convertday(d){
			return (7 + d - 1) % 7;
		}
	}
	function format_y(){
		return format_Y().slice(-2);
	}
	function format_Y(){
		return ('' + year);
	}
	function format_z(){
		var DAYS = [0, 31, 59+format_L(), 90, 120, 151, 181, 212, 243, 273, 304, 334]
		var result = DAYS[month] + date;
		return ('' + result);
	}
	function format_Z(){
		return '' + (offset * 60);
	}
}

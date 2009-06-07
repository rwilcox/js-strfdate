
	/**
		@function String.prototype.to_date
		@abstract a VERY trivial implementation of translating a string into a date using the same format flags as strfdate uses. 
		@throws A TypeError if format string doesn't match...
		@discussion WARNING! This is Just What I Needed At The Time. It is by no means a complete or good implementation!!! Patches kindly accepted!!! I'm also not a computer scientist, so I don't actually know how to write a parser...
		@param format the format of the string, used to translate it into a date format
		@result a date object or nil if can't perform the translation
	*/
String.prototype.to_date = function(format)	{
	var results = this.to_date_chunks(format);
	return new Date( results[0], results[1] - 1, results[2] );
}
	
String.prototype.to_date_chunks = function (format){
	var yearPiece = 0;
	var monthPiece = 0;
	var dayPiece = 0;
	
	var pieces = new Array();
	var piece;
	var previousChar = '';
	var currentPlaceInSelf = 0;
	
	for (var c=0; c < format.length; c++){
		if (format[c] == "%") {
			
			if (previousChar == "%") {
				// %% means we to look for a literal % in our string...
				if ( format[c] == this[currentPlaceInSelf] ) {
					currentPlaceInSelf +=  1;
				}
				else {
					throw new TypeError("Invaid date format! Expected " + format[c] + " got " + this[currentPlaceInSelf] + " for string '" + this + "'");	
				}
				previousChar = "";		//clear out previous character, don't let parser get confused on this %, which was escaped out. 
				continue;
			} else {
				// else we are starting a new formatting string...
				previousChar = format[c];
				continue;
			}
		}
		if(previousChar == "%") {
			if(format[c] == "Y") {
				yearPiece = this.substr(currentPlaceInSelf, 4);
				currentPlaceInSelf +=  4;
			}
			if(format[c] == "m") {
				monthPiece = this.substr(currentPlaceInSelf, 2);
				currentPlaceInSelf +=  2;
			}
			if(format[c] == "d") {
				dayPiece = this.substr(currentPlaceInSelf, 2);
				currentPlaceInSelf +=  2;
			}
		}
		else {
			// so our current character is not a %, nor is it a character directly following a %. So it must be an item in the format string
			// (if it is not we must raise an exception, because we are off course)
			if ( format[c] == this[currentPlaceInSelf] ) {
				currentPlaceInSelf += 1;
			} else {
				throw new TypeError("Invaid date format! Expected " + format[c] + " got " + this[currentPlaceInSelf] + " for string '" + this + "'");
			}
		} 
		//currentPlaceInSelf = currentPlaceInSelf + 1;
		
		previousChar = format[c];
	}
	
	return [yearPiece, monthPiece, dayPiece];
}


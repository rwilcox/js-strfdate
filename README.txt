JS strfdate

Description:
    This JavaScript project implements strfdate for JavaScript date instances. It also implements a to_date function on String instances, that takes a strfdate format string and returns a valid date object from the passed in string.
    
    I took code from <http://www.djangosnippets.org/snippets/84/>, modified it to handle C format, instead of Django format,
    date format strings, and added some tests.
    
    Framework of project created with Dr. Nic William's helpful newjs gem (http://newjs.rubyforge.org/).

Example:
   
	strfdate:
	  	a = new Date(2009, 05 -1, 05);
    	a.strfdate("%m-%d-%Y");  // will be "05-05-2009"
	
	to_date:
		a = "05-31-2009";
		var res = a.to_date("%m-%d-%Y");	//res will be a JS Date object

Why would I want to use this?:

	JavaScript doesn't have a good way to format strings from dates, so perhaps you'd like this way (which uses C standard strftime format strings).
	
	OR perhaps you want to have a unified date format string format across languages (say, Ruby and JavaScript).
    
    
Author:
    Ryan Wilcox, http://www.wilcoxd.com
    
License:
	Public Domain

Status:
	Probably you can find better code that does this, and better JS from me.


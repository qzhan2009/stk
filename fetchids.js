var jsdom;
try {
  jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
  jsdom = require("jsdom"); // jsdom <= 9.x
}

var jquery = require("jquery");

var index = 1;

function load()
{
    var url = "http://data.eastmoney.com/soft_new/bbsj/201609/yysj/gpdm/asc/" + index + ".html"

    jsdom.env(
    url, 
	function (errors, window) {
        var $ = jquery(window);
            
        var fs = require('fs');
        
        var rows = $("#dt_1 tbody").find("tr");

        if (rows.length == 0)
            return;

        rows.each(function (i, tr) {
                
                
            $("td", tr).each(function (j, td) {
                if (j == 0)
                {	
                    console.log($(td).text());
                }
                
            });                      
        });
        
        index++;
        load();
            
        
    });
}




load();

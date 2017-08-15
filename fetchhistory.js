var fs = require("fs");
var rl = require("readline");
var exec = require('child_process').execSync;

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

var file = process.argv[2];
var start = "20000101";
var end = new Date().yyyymmdd();

function loadData()
{

	var first = true;
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file),
	});
	
	
	lineReader.on('line', function(line) {
		
		var id = parseInt(line);

		var code;

		if (id > 600000)
			code = "0" + line;
		else
			code = "1" + line;

		var cmd = "wget \"http://quotes.money.163.com/service/chddata.html?code="+ code + 
		"&start=" + start + "&end=" + end + "&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP\" -O ntes/" + line + ".cvs";

		exec(cmd);

	});

	lineReader.on('close', function() {

		
	});
}
exec("mkdir -p ntes");
loadData();


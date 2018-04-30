var fs = require("fs");
var rl = require("readline");
var exec = require('child_process').execSync;

var file = process.argv[2];

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
			code = "sh" + line;
		else
			code = "sz" + line;

		var cmd = "wget http://emweb.securities.eastmoney.com/PC_HSF10/ProfitForecast/ProfitForecastAjax?code=" + code + " -O forecast/" + line + ".json"

		exec(cmd);

	});

	lineReader.on('close', function() {

		
	});
}
exec("mkdir -p forecast");
loadData();


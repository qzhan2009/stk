var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var ebit = process.argv[3];
var r_inc1 = process.argv[4];
var r_inc3 = process.argv[5];
var p_inc1 = process.argv[6];
var p_inc3 = process.argv[7];
var file1 = "report/" + id + ".csv";
var file2 = "ntes/" + id + ".cvs";
var file3 = "forecast/" + id + ".json";

var profile_ttm = undefined;
var profile_2018 = undefined;
var profile_2019 = undefined;
var profile_2020 = undefined;
var price = undefined;
var volume = undefined;
var target_price = undefined;

var profile = [];
var Q = undefined;

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file1),
	});
	
	lineReader.on('line', function(line) {
		if (line.startsWith("#"))
			return;
		var tokens = line.split(",");
		profile.push(parseFloat(tokens[2]) * 10000);
		if (!Q) {
			date = tokens[0];
			if (date.endsWith("12-31"))
				Q = 4;
			else if (date.endsWith("09-30"))
				Q = 3;
			else if (date.endsWith("06-30"))
				Q = 2;
			else
				Q = 1;	
		}
		if (profile.length >= 5)
			lineReader.close();
		
				
	});

	lineReader.on('close', function() {
		profile_ttm = profile[0] + profile[Q] - profile[4];
		getVolume();
	});

}

function getForecast()
{
	fs.readFile(file3, 'utf8', function(err, data) {
        	if (err) throw err;
                obj = JSON.parse(data);
                obj.Result.yctj.data.forEach(function(entry) {
                	if (entry.rq == "2018年预测") {
                        	if (entry.jlr.indexOf("亿") != -1)
					profile_2018 = parseFloat(entry.jlr) * 10000 * 10000 ;
                                else if (entry.jlr.indexOf("万") != -1)
                                        profile_2018 = parseFloat(entry.jlr) * 10000;
                        }
			else if (entry.rq == "2019年预测") {
                        	if (entry.jlr.indexOf("亿") != -1)
					profile_2019 = parseFloat(entry.jlr) * 10000 * 10000;
                                else if (entry.jlr.indexOf("万") != -1)
                                        profile_2019 = parseFloat(entry.jlr) * 10000;
                        }
			else if (entry.rq == "2020年预测") {
                        	if (entry.jlr.indexOf("亿") != -1)
					profile_2020 = parseFloat(entry.jlr) * 10000 * 10000;
                                else if (entry.jlr.indexOf("万") != -1)
                                        profile_2020 = parseFloat(entry.jlr) * 10000;
                        }

                });
		if (profile_2019 & profile_2018) {
			target_price = profile_ttm / volume;
			//console.log("profile per share = " + target_price);
			if (profile_2020) {
				target_price = target_price * (8.5 + (profile_2019/profile_2018-1) *100 + (profile_2020/profile_2019-1) * 100);
			} else {
				target_price = target_price * (8.5 + 2 * (profile_2019/profile_2018-1) * 100);
			}	
			display();
		}
	});

}

function getVolume()
{

	var lineReader = rl.createInterface({
		input: fs.createReadStream(file2),
	});
	
	var row = 0;
	lineReader.on('line', function(line) {

		if (row == 1)
		{
			var tokens = line.split(",");
			price = parseFloat(tokens[3]);
			volume = parseFloat(tokens[13]) / price;
			//console.log("volume = " + volume);
			lineReader.close();
		}
		row++;
	});

	lineReader.on('close', function() {
		getForecast();	
	});


}

function display()
{

	if (target_price && profile_ttm < profile_2018)
		console.log(id + " " + ebit + " " + r_inc1 + " " + r_inc3 + " " + p_inc1 + " " + p_inc3 + " " + price + " " + target_price + " " + target_price / price + " " +

			profile_ttm + " " + profile_2018 + " " + profile_2019 + " " + profile_2020 + " " + volume);
}
loadData();


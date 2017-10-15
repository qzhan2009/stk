var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var r_inc1 = process.argv[3];
var r_inc3 = process.argv[4];
var p_inc1 = process.argv[5];
var p_inc3 = process.argv[6];
var file1 = "report/" + id + ".csv";
var file2 = "ntes/" + id + ".cvs";

var profile_ttm = undefined;
var market_value = undefined;
var long_term_debet = undefined;
var cash = undefined;

var profile = [];
var Q = undefined;

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file1),
	});

	var i=0;	
	lineReader.on('line', function(line) {
		if (line.startsWith("#"))
			return;
		var tokens = line.split(",");

		if (i==0) {
			debet = parseFloat(tokens[4] * 10000);
			st_debet = parseFloat(tokens[5] * 10000);
			long_term_debet = debet - st_debet;
			cash = parseFloat(tokens[6] * 10000);
			i++;
		}

		profile.push(parseFloat(tokens[3]) * 10000);
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
		if (!long_term_debet)
			return;
		profile_ttm = profile[0] + profile[Q] - profile[4];
		getMarketValue();
	});

}

function getMarketValue()
{

	var lineReader = rl.createInterface({
		input: fs.createReadStream(file2),
	});
	
	var row = 0;
	lineReader.on('line', function(line) {

		if (row == 1)
		{
			var tokens = line.split(",");
			market_value = parseFloat(tokens[13]);
			lineReader.close();
		}
		row++;
	});

	lineReader.on('close', function() {
		display();	
	});
}

function display()
{
	var pe = (market_value + long_term_debet - cash) / profile_ttm;
	if (pe > 0)
	console.log(id + " " + pe + " " + r_inc1  + " " + r_inc3 + " " + p_inc1 + " " + p_inc3 + " " + market_value + " " + profile_ttm + " " + long_term_debet + " " + cash); 
}
/*
function displayHeader()
{
	console.log("#id price target_price rate ttm 2017 2018 2019");
}
*/

//displayHeader();
loadData();


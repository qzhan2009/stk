var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var tag = process.argv[3];
var file1 = "report/" + id + ".csv";
var file2 = "ntes/" + id + ".cvs";
var file3 = "forecast/" + id + ".json";

var profile = undefined;
var profile2 = 0;
var revenue = undefined;
var debet = undefined;
var d_rate = undefined;
var cash = undefined;
var revenue2 = 0;
var marketValue = 1;
var increase1 = 0;
var increase2 = 0;
var r_increase1 = 0;
var r_increase2 = 0;
var f_profile = undefined;
var f_profile2 = undefined;

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file1),
	});
	
	i = 0;
	target1 = -1;
	target4 = -1;
	target5 = -1;
	lineReader.on('line', function(line) {
		i++;
		tokens = line.split(",");
		if (tokens[0] == tag) {
			profile = parseFloat(tokens[2]) / 10000;
			revenue = parseFloat(tokens[1]);
			debet = parseFloat(tokens[3]) / 10000;
			cash = parseFloat(tokens[5]) / 10000;
			d_rate = parseFloat(tokens[3]) / parseFloat(tokens[4]); 
			target1 = i+1;
			target4 = i+4;
			target5 = i+5; 
		}
		else if (i==target1) {
			revenue2 = parseFloat(tokens[1]);
			profile2 = parseFloat(tokens[2]) / 10000;
		}
		else if (i==target4) {
			increase1 = profile / ( parseFloat(tokens[2]) / 10000 );
			r_increase1 = revenue / (parseFloat(tokens[1]));
		}
		else if (i==target5) {
			increase2 = profile2 / ( parseFloat(tokens[2]) / 10000 );
			r_increase2 = revenue2 / (parseFloat(tokens[1]));
		}
	});

	lineReader.on('close', function() {
		getMarketValue();
	});

}

function getForecast()
{
	fs.readFile(file3, 'utf8', function(err, data) {
        	if (err) throw err;
                obj = JSON.parse(data);
                obj.Result.yctj.data.forEach(function(entry) {
                	if (entry.rq == "2017年预测") {
                        	if (entry.jlr.indexOf("亿") != -1)
					f_profile = parseFloat(entry.jlr);
                                else if (entry.jlr.indexOf("万") != -1)
                                        f_profile = parseFloat(entry.jlr) / 10000;
                        }
			else if (entry.rq == "2018年预测") {
                        	if (entry.jlr.indexOf("亿") != -1)
					f_profile2 = parseFloat(entry.jlr);
                                else if (entry.jlr.indexOf("万") != -1)
                                        f_profile2 = parseFloat(entry.jlr) / 10000;
                        }

                });
		if (f_profile && f_profile2)
			display();
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
			 marketValue = parseFloat(tokens[13]) / 100000000;
		}
		row ++;
	});

	lineReader.on('close', function() {
		getForecast();	
	});


}

function display()
{
	if (profile)  
	console.log(id + " " + profile + " " + marketValue + " " + marketValue / profile + " " + increase1 + " " + increase2 + " " + revenue + " " + r_increase1 + " " + r_increase2 + " " + f_profile + " " + marketValue / f_profile + " " + f_profile2 + " " + marketValue / f_profile2 + " " + debet + " " + (debet + marketValue - cash) / profile + " " + d_rate + " " + cash);
}
if (tag)
	loadData();


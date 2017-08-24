var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var tag = process.argv[3];
var file1 = "report/" + id + ".csv";
var file2 = "ntes/" + id + ".cvs";

var profile = 0.00000001;
var profile2 = 0;
var marketValue = 1;
var increase1 = 0;
var increase2 = 0;

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
			target1 = i+1;
			target4 = i+4;
			target5 = i+5; 
		}
		else if (i==target1)
			profile2 = parseFloat(tokens[2]) / 10000;	
		else if (i==target4)
			increase1 = profile / ( parseFloat(tokens[2]) / 10000 );
		else if (i==target5)
			increase2 = profile2 / ( parseFloat(tokens[2]) / 10000 );
	});

	lineReader.on('close', function() {
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
			 marketValue = parseFloat(tokens[13]) / 100000000;
		}
		row ++;
	});

	lineReader.on('close', function() {
		
		display();
	});


}

function display()
{
	console.log(id + " " + profile + " " + marketValue + " " + marketValue / profile + " " + increase1 + " " + increase2);
}
if (tag)
	loadData();


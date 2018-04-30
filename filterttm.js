var fs = require("fs");
var rl = require("readline");

var file = process.argv[2];

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file),
	});
	
	lineReader.on('line', function(line) {
	
		tokens = line.split(" ");
		var id = tokens[0];
		var revenue = parseInt(tokens[1]);
		var profile = parseInt(tokens[2]);
		var inc1 = parseFloat(tokens[6]);
		var inc2 = parseFloat(tokens[7]);
		var inc3 = parseFloat(tokens[8]);
		filter(revenue, profile,inc1, inc2, inc3, line);
	});
}

function filter(revenue, profile, inc1,inc2,inc3, line)
{
	if (revenue < 16 || profile < 16)
		return;

	if (inc3 < (0.3 / 1.3) * 100)
		return;
	if (inc2 < (0.2 / 1.2) * 100)
		return;
	if (inc1 < (0.1 / 1.1) * 100)
		return;
	console.log(line);
}

loadData();


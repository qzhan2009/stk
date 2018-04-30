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
		var r_inc1 = parseFloat(tokens[4]);
		var r_inc3 = parseFloat(tokens[5]);
		var fr = parseFloat(tokens[6]);
		filter(line, r_inc1, r_inc3, fr);
	});
}

function filter(line, r_inc1, r_inc3, fr)
{
	if (fr < 1.3)
		return;
	if (r_inc1 * 3 < r_inc3)
		return;
	console.log(line + " " + r_inc1 / r_inc3);
}

loadData();


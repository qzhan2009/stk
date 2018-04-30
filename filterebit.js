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
		var pe = parseFloat(tokens[1]);
		filter(pe, line);
	});
}

function filter(pe, line)
{

	if (pe > 25)
		return;
	console.log(line);
}

loadData();


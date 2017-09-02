var fs = require("fs");
var rl = require("readline");

var file = process.argv[2];
var thresh = process.argv[3];

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file),
	});

	lineReader.on('line', function(line) {
		tokens = line.split(" ");

		pe = parseFloat(tokens[3],10);
		ins1 = parseFloat(tokens[4], 10);
		ins2 = parseFloat(tokens[5], 10);

		if (pe > parseInt(thresh, 10))
			return;
		if (ins1 < 0 || ins2 < 0)
			return;
		if (ins1 < ins2)
			return;
		
		if (ins2 < 1.1)
			return;
		
		console.log(line);
	});
}

loadData();

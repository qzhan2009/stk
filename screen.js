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

		pe = parseFloat(tokens[3],10);
		ins1 = parseFloat(tokens[4], 10);
		ins2 = parseFloat(tokens[5], 10);
		r_ins1 = parseFloat(tokens[7], 10);
		r_ins2 = parseFloat(tokens[8], 10);
		fpe = parseFloat(tokens[10], 10);

		if (pe > 50)
			return;
		if (fpe > 25)
			return;
		if (ins1 < 0 || ins2 < 0)
			return;
		if (ins1 < ins2)
			return;
		
		if (ins2 < 1.1)
			return;

		if (r_ins1 < 1.1)
			return;
		
		console.log(line);
	});
}

loadData();

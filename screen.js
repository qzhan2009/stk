var fs = require("fs");
var rl = require("readline");

var file = process.argv[2];
var file2 = process.argv[3];

var blacklist = [];
var pe_thresh = 60;
var fpe_thresh = 30;

function loadBlacklist()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file2),
	});

	lineReader.on('line', function(line) {
		blacklist.push(line);
	});

	lineReader.on('close', function() {
		loadData();
	});	
	
}

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
		fpe2 = parseFloat(tokens[12], 10);

		if (blacklist.includes(tokens[0]))
			return;
		
		if (pe > pe_thresh)
			return;
		if (fpe > fpe_thresh)
			return;
		if (ins1 < 0 || ins2 < 0)
			return;
		if (ins1 < ins2)
			return;
		
		if (ins2 < 0.7)
			return;
		if (ins1 < 1.1)
			return;

		if (r_ins1 < 1.1)
			return;

		if (fpe / pe < 0.4)
			return;

		if (fpe / fpe2 < 1.1)
			return;
		
		console.log(line);
	});
}

loadBlacklist();

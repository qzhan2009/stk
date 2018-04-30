var fs = require("fs");
var rl = require("readline");

var file1 = process.argv[2];
var file2 = process.argv[3];

var exclude = [];

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file1),
	});

	lineReader.on('line', function(line) {
		tokens = line.split(" ");

		id = tokens[0];
		if (!exclude.includes(id))
			console.log(line);
	});
}

function loadExclude()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file2),
	});

	lineReader.on('line', function(line) {
		exclude.push(line);
	});

	lineReader.on('close', function() {
		loadData();
	});
}

loadExclude();

var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var file = "report/" + id + ".csv";

var r = [];
var p = [];

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file),
	});
	
	var row = 0;
	lineReader.on('line', function(line) {
	
		if (row > 0 && row < 13)
		{
			tokens = line.split(",");
			r.push(parseInt(tokens[1],10));
			p.push(parseInt(tokens[2],10));
		}	
		row++;
	});

	lineReader.on('close', function() {
		showReport();
	});
}

function showReport()
{
	if (r.length < 10 || p.length < 10)
		return;
	
	for (i=0; i<9; i++)
	{
		if (isNaN(r[i]))
			return;
		if (isNaN(p[i]))
			return;
	}

	var a0 = "N"
	if (r[0] > r[4] && r[4] > r[8] )
		a0 = "A";
	
	
	b0 = "N"
	if (p[0] > p[4] * 1.07 && p[4] > p[8] && p[0] > 0 && p[4] > 0 )
		b0 = "A";
	console.log(a0+b0 + " " + r[0]/r[4] + " " + r[4] / r[8] 
		+ " " + p[0]/p[4] + " " + p[4]/p[8]);
}

loadData();


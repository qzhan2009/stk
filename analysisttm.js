var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var file = "ttm/" + id + ".csv";

var r = [];
var p = [];
var inc1_p = undefined;
var inc2_p = undefined;
var inc3_p = undefined;
var inc1_r = undefined;
var inc2_r = undefined;
var inc3_r = undefined;

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file),
	});
	
	lineReader.on('line', function(line) {
	
		tokens = line.split(",");
		r.push(parseInt(tokens[3],10));
		p.push(parseInt(tokens[4],10));
	});

	lineReader.on('close', function() {
		analysis();
	});
}

function analysis()
{
	var ri = 0;
	var pi = 0;
	for (i=0; i<r.length-1; i++)
		if (r[i] > r[i+1])
			ri++;
		else
			break;
	for (i=0; i<p.length-1; i++)
		if (p[i] > p[i+1])
			pi++;
		else
			break;

	if (r.length < 13)
		return;
	
	if (p.length < 13)
		return;

	inc1_r = ((r[0] - r[4])	/ r[0] * 100).toFixed(2);
	inc2_r = ((r[0] - r[8]) / r[0] * 100).toFixed(2);
	inc3_r = ((r[0] - r[12]) / r[0] * 100).toFixed(2);
	inc1_p = ((p[0] - p[4])	/ p[0] * 100).toFixed(2);
	inc2_p = ((p[0] - p[8]) / p[0] * 100).toFixed(2);
	inc3_p = ((p[0] - p[12]) / p[0] * 100).toFixed(2);;
	
	console.log(id + " " + ri + " " + pi + " " + inc1_r + " " + inc2_r + " " + inc3_r + " " + inc1_p + " " + inc2_p + " " + inc3_p);
}

loadData();


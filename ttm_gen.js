var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var file = "report/" + id + ".csv";

var d = [];
var r = [];
var p = [];

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file),
	});
	
	lineReader.on('line', function(line) {
		if (line.startsWith("#"))
			return;
		var tokens = line.split(",");
		d.push(tokens[0]);
		r.push(parseFloat(tokens[1]));
		p.push(parseFloat(tokens[2]));
				
	});

	lineReader.on('close', function() {
		processData();
	});

}

function processData()
{
	var len = d.length;

	for (i=0; i<d.length-4; i++) {
		var Q = undefined;
		date = d[i];
                if (date.endsWith("12-31"))
                        Q = 4;
                else if (date.endsWith("09-30"))
                        Q = 3;
                else if (date.endsWith("06-30"))
                        Q = 2;
                else
                	Q = 1;	

		var ttm_p = p[i] + p[i+Q] - p[i+4];
		var ttm_r = r[i] + r[i+Q] - r[i+4];
		console.log(d[i] + " " + ttm_r + " " + ttm_p); 
	}
}

loadData();


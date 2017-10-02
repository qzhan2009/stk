var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var file = "report/" + id + ".csv";

var d = [];
var r = [];
var p = [];
var ttm_p = [];
var ttm_r = [];
var ttm_sm_p = [];
var ttm_sm_r = [];

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

		ttm_p.push(p[i] + p[i+Q] - p[i+4]);
		ttm_r.push(r[i] + r[i+Q] - r[i+4]);

	}

	var count = ttm_p.length;
	var pre_r = ttm_r[count-1];
	var pre_p = ttm_p[count-1];

	for (i=count-1; i>=0; i--) {
		ttm_sm_r[i] = (ttm_r[i] + pre_r * 3)/4;
		ttm_sm_p[i] = (ttm_p[i] + pre_p * 3)/4;
		pre_r = ttm_sm_r[i];
		pre_p = ttm_sm_p[i];
	}	

	for (i=0; i<count; i++) {
		console.log(d[i] + "," + ttm_r[i] + "," + ttm_p[i] + "," + ttm_sm_r[i] + "," + ttm_sm_p[i]);
	}
}

loadData();


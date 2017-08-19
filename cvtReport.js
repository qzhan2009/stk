var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var file = "report/" + id + "_.csv";
var tokens = [];

var d = [];
var r = [];
var p = []; 

function convert()
{
        var lineReader = rl.createInterface({
                input: fs.createReadStream(file),
        });

	row = 0;	
        lineReader.on('line', function(line) {
		
		tokens = line.split(",");
		tokens = tokens.slice(1, tokens.length-1);
		row++;
		if (row == 1)
			d = tokens;
		else if (row == 5)
			r = tokens;
		else if (row == 11)
			p = tokens;
        });

	lineReader.on('close', function() {
		console.log("date,revenue,profile");
		for (i=0; i<d.length; i++) {
			console.log(d[i] +"," + r[i] + "," + p[i]);
		}
	});

}

convert();


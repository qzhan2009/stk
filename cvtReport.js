var fs = require("fs");
var rl = require("readline");

var id = process.argv[2];
var file1 = "financial/" + id + ".csv";
var file2 = "cash/" + id + ".csv";
var tokens = [];

var dt = [];
var r = [];
var p = []; 
var d = [];
var sd = [];
var c = [];

function display()
{		
	console.log("#date,revenue,profile,debet,st_debet,cash");
	for (i=0; i<d.length; i++) {

		if (r[i] == "--" || p[i] == "--")
			break;
		console.log(dt[i] +"," + r[i] + "," + p[i] + "," + d[i] + "," + sd[i] + "," + c[i]);
	}
}

function loadData2()
{
        var lineReader = rl.createInterface({
                input: fs.createReadStream(file2),
        });

	row = 0;	
        lineReader.on('line', function(line) {
		
		tokens = line.split(",");
		tokens = tokens.slice(1, tokens.length-1);
		row++;
		if (row == 57)
			c = tokens;
        });

	lineReader.on('close', function() {
		display();
	});
}

function loadData1()
{
        var lineReader = rl.createInterface({
                input: fs.createReadStream(file1),
        });

	row = 0;	
        lineReader.on('line', function(line) {
		
		tokens = line.split(",");
		tokens = tokens.slice(1, tokens.length-1);
		row++;
		if (row == 1)
			dt = tokens;
		else if (row == 5)
			r = tokens;
		else if (row == 11)
			p = tokens;
		else if (row == 17)
			d = tokens;
		else if (row == 18)
			sd = tokens;
        });

	lineReader.on('close', function() {
		loadData2();
	});

}

loadData1();


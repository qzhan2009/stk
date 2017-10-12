var fs = require("fs");
var rl = require("readline");

var file = process.argv[2];

var lines=[];
var ids =[];
var ebit=[];
var r_inc1=[];
var r_inc3=[];
var p_inc1=[];
var p_inc3=[];
var forecast = [];

function pk()
{
	for (i=0; i<lines.length-1; i++)
	{
		for (j=i+1; j<lines.length; j++)
		{
			if (ebit[i] < ebit[j] && forecast[i] > forecast[j] && r_inc1[i] > r_inc1[j] && r_inc3[i] > r_inc3[j] && p_inc1[i] > p_inc1[j] && p_inc3[i] > p_inc3[j])
				console.log(ids[i] + " " + ids[j]); 
			if (ebit[i] > ebit[j] && forecast[i] < forecast[j] && r_inc1[i] < r_inc1[j] && r_inc3[i] < r_inc3[j] && p_inc1[i] < p_inc1[j] && p_inc3[i] < p_inc3[j])
				console.log(ids[j] + " " + ids[i]); 
		}
	}	
}

function loadData()
{
	var lineReader = rl.createInterface({
		input: fs.createReadStream(file),
	});

	lineReader.on('line', function(line) {
		tokens = line.split(" ");

		lines.push(line);
		ids.push(tokens[0]);
		ebit.push(parseFloat(tokens[1],10));
		r_inc1.push(parseFloat(tokens[2],10));
		r_inc3.push(parseFloat(tokens[3],10));
		p_inc1.push(parseFloat(tokens[4],10));
		p_inc3.push(parseFloat(tokens[5],10));
		forecast.push(parseFloat(tokens[6], 10));
	});

	lineReader.on('close', function() {
		pk();
	});
}

loadData();

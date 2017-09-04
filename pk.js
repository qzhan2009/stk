var fs = require("fs");
var rl = require("readline");

var file = process.argv[2];

var lines=[];
var ids =[];
var lins=[];
var pe=[];
var p_ins=[];
var r_ins=[];
var fpe=[];

function pk()
{
	for (i=0; i<lines.length-1; i++)
	{
		for (j=i+1; j<lines.length; j++)
		{
			if (pe[i] < pe[j] && p_ins[i] > p_ins[j] && r_ins[i] > p_ins[j] && fpe[i] < fpe[j])
				console.log(ids[j] + " " + ids[i]); 
			if (pe[i] > pe[j] && p_ins[i] < p_ins[j] && r_ins[i] < p_ins[j] && fpe[i] > fpe[j])
				console.log(ids[i] + " " + ids[j]); 
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
		pe.push(parseFloat(tokens[3],10));
		p_ins.push(parseFloat(tokens[4], 10));
		r_ins.push(parseFloat(tokens[7], 10));
		fpe.push(parseFloat(tokens[10], 10));

	});

	lineReader.on('close', function() {
		pk();
	});
}

loadData();

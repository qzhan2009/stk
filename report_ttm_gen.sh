#!/bin/bash

mkdir -p report
mkdir -p ttm
while read line
do
	echo $line
	node cvtReport.js $line	> report/$line.csv
	node ttm_gen.js $line > ttm/$line.csv
done < $1

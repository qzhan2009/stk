#!/bin/bash

mkdir -p financial
mkdir -p cash
mkdir -p report
mkdir -p ttm
while read line
do
	wget http://quotes.money.163.com/service/zycwzb_$line.html?type=report -O financial/$line".csv"
	wget http://quotes.money.163.com/service/xjllb_$line.html -O cash/$line".csv"
	node cvtReport.js $line	> report/$line.csv
	node ttm_gen.js $line > ttm/$line.csv
	rm -f report/$line"_.csv"
done < $1

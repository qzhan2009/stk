#!/bin/bash

mkdir -p report
while read line
do
	wget http://quotes.money.163.com/service/zycwzb_$line.html?type=report -O report/$line"_.csv"
	node cvtReport.js $line	> report/$line.csv
	rm -f report/$line"_.csv"
done < $1

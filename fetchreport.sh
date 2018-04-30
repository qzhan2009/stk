#!/bin/bash

mkdir -p financial
mkdir -p cash
while read line
do
	wget http://quotes.money.163.com/service/zycwzb_$line.html?type=report -O financial/$line".csv"
	wget http://quotes.money.163.com/service/xjllb_$line.html -O cash/$line".csv"
done < $1

#!/bin/bash

while read line
do
	echo $line `node analysisReport.js $line`
done < $1

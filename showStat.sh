#!/bin/bash

while read line
do
	#node fetchvolume.js $line
	#node fetchrevenue.js $line
	#node showPEMV.js $line $2
	node showStat.js $line $2
done < $1

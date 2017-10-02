#!/bin/bash

while read line
do
	echo `node analysisttm.js $line`
done < $1

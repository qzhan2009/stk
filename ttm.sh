#!/bin/bash

while read line
do
	node ttm.js $line
done < $1

#!/bin/bash

while read line
do
	node pe.js $line
done < $1

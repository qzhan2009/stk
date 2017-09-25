#!/bin/bash

while read line
do
	node ebit.js $line
done < $1

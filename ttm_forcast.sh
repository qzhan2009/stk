#!/bin/bash

while read line
do
	node ttm_forcast.js $line
done < $1

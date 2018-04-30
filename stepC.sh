#!/bin/bash

\rm -r tmp
./analysisttm.sh ids | tee tmp
sed '/^$/d' tmp > tmp.tmp
cat tmp.tmp | sort -k 3 -n -r > stepC.out
\rm -r tmp
\rm -f tmp.tmp

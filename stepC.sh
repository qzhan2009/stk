node filterttm.js stepB.out > tmp
cat tmp | awk '{ print $1 }' | sort -k 1 > stepC.out
rm -f tmp


node filterttm.js stepB.out > tmp
cat tmp | awk '{ print $1" "$4" "$6" "$7" "$9}' | sort -k 1 > stepC.out
rm -f tmp


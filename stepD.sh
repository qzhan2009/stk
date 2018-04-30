node filterttm.js stepC.out > tmp
cat tmp | awk '{ print $1" "$4" "$6" "$7" "$9}' | sort -k 1 > stepD.out
rm -f tmp

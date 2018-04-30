node finalfilter stepH.out > tmp
cat tmp | sort -k 8 -r > result$1
rm -f tmp 

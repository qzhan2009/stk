node pk2.js stepG.out > tmp
cat tmp | awk '{ print $2 }' | sort | uniq > tmp2
node clean.js stepG.out tmp2 > stepH.out 
rm -f tmp
rm -f tmp2

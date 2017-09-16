node fetchhistory.js step1.out
#node fetchforecast.js step1.out
./showStat.sh step1.out 2017-06-30 | tee tmp 
cat tmp | sort -k 1 -n > step2.out 
rm -f tmp



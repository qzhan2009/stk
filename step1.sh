node fetchids > ids
./fetchreport.sh ids 
\rm -f tmp 
./analysisReport.sh ids | tee tmp
cat tmp | grep AA | awk '{ print $1 }' > step1.out 
rm -f tmp


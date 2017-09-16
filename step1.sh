node fetchids.js > ids
./fetchreport.sh ids
node fetchforecast.js ids
\rm -f tmp 
./analysisReport.sh ids | tee tmp
cat tmp | grep AA | awk '{ print $1 }' > step1.out 
rm -f tmp


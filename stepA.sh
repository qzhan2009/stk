node fetchids.js > ids
./fetchreport.sh ids
node fetchforecast.js ids
\rm -f tmp 


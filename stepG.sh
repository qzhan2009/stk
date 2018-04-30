./ttm_forcast.sh stepF.out | tee tmp
cat tmp | awk '{ print $1" "$2" "$3" "$4" "$5" "$6" "$9}' > stepG.out
rm -f tmp 

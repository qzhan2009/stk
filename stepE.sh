node fetchhistory.js stepD.out
./ebit.sh stepD.out | tee tmp
cat tmp | sort -k 2 -n > stepE.out
rm -r tmp

node filterebit.js stepE.out > tmp
cat tmp | awk '{ print $1" "$2" "$3" "$4" "$5" "$6}' | sort -k 1 > stepF.out
rm -f tmp


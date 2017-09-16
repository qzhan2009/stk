node screen.js step2.out blacklist > screen.out
node pk.js screen.out > pk.out;
cat pk.out | awk '{ print $1 }' | sort | uniq > exclude.out
node clean.js screen.out exclude.out > result

 basepath=$(cd `dirname $0`; pwd)
 mongodbpath=${basepath}/mongodb-linux-x86_64-2.6.12

 echo "=================================================" >> $basepath/start.log
 echo "starting... time: `date`" >> $basepath/start.log
 
 export NVM_DIR="/home/plunker/nvm-0.33.2"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
 nvm use --delete-prefix v0.10.22 >> $basepath/start.log
 
 $mongodbpath/bin/mongod --dbpath $mongodbpath/db/ >> $basepath/start.log & 
 
 cd $basepath/plunker_www 
 node server.js >> $basepath/start.log & 
 
 cd $basepath/plunker_run
 node server.js >> $basepath/start.log & 
 
 cd $basepath/plunker_embed
 node server.js >> $basepath/start.log & 
 
 cd $basepath/plunker_api
 node server.js >> $basepath/start.log & 
 
 
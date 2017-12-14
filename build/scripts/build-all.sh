#!/bin/bash
seedDir=`pwd`/../jigsaw-seed

cd `dirname $0`

chmod a+x ./sauce_connect_setup.sh
./sauce_connect_setup.sh

node make-demo-independent.js
gulp ensure-url-matches-path
gulp jigsaw:build-release:clean
# ng test --code-coverage --watch false
# cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
sh build-tourist.sh
sh integrate-with-seed.sh
sh sauce_connect_block.sh
cd $seedDir # run e2e in seed directory
ng build -prod -aot
ng e2e

sh ./sauce_connect_teardown.sh

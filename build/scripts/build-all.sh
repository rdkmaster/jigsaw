#!/bin/bash
seedDir=`pwd`/../jigsaw-seed

chmod a+x ./sauce_connect_setup.sh
./sauce_connect_setup.sh

node buid/scripts/make-demo-independent.js
gulp ensure-url-matches-path
gulp jigsaw:build-release:clean
sh buid/scripts/build-tourist.sh
sh buid/scripts/integrate-with-seed.sh
sh buid/scripts/sauce_connect_block.sh
cd $seedDir # run e2e in seed directory
ng build -prod -aot
ng e2e

sh ./sauce_connect_teardown.sh

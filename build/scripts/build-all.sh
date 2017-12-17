#!/bin/bash
seedDir=`pwd`/../jigsaw-seed

chmod a+x build/scripts/sauce_connect_setup.sh
build/scripts/sauce_connect_setup.sh

node build/scripts/make-demo-independent.js
gulp ensure-url-matches-path
gulp jigsaw:build-release:clean
sh build/scripts/build-tourist.sh
sh build/scripts/integrate-with-seed.sh
sh build/scripts/sauce_connect_block.sh
cd $seedDir # run e2e in seed directory
ng build -prod -aot
ng e2e

sh build/scripts/sauce_connect_teardown.sh

#!/bin/bash
home=`pwd`

touristDir=`pwd`/../jigsaw-tourist
mkdir -p $touristDir
git clone https://github.com/rdkmaster/jigsaw-tourist.git $touristDir
cd $touristDir
git checkout v9.0
npm install

#update jigsaw npm package
rm -fr node_modules/@rdkmaster/jigsaw
cp -r $home/dist/@rdkmaster/jigsaw node_modules/@rdkmaster/

ng build --prod --aot

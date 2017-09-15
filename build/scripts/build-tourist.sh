#!/bin/bash
home=`pwd`

touristDir=$1
echo "--------------------------------------------------"
echo $touristDir
exit



mkdir -p $touristDir
git clone https://github.com/rdkmaster/jigsaw-tourist.git $touristDir
cd $touristDir
npm install

#update jigsaw npm package
rm -fr node_modules/@rdkmaster/jigsaw
cp -r $home/dist/releases/jigsaw node_modules/@rdkmaster/

ng build -prod -aot

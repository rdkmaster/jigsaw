#!/bin/bash
home=`pwd`

seedDir=`pwd`/../jigsaw-seed
rm -fr $seedDir
mkdir -p $seedDir
cd $seedDir
git clone https://github.com/rdkmaster/jigsaw-seed.git .


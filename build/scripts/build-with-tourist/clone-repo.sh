#!/bin/bash
home=`pwd`

touristDir=`pwd`/../jigsaw-tourist
mkdir -p $touristDir
cd $touristDir
git clone https://github.com/rdkmaster/jigsaw-tourist.git .
git checkout master

#!/bin/bash
home=$(cd "$(dirname "$0")"; pwd)
workDir="/tmp/jigsaw-seed"

echo '##############################'
echo home=$home
echo workDir=$workDir
echo '##############################'

#if [ -e $workDir ]; then
	rm -fr $workDir
#fi
mkdir -p $workDir
git clone https://github.com/rdkmaster/jigsaw-seed.git $workDir
cd $workDir
echo '##############################'
pwd
echo '##############################'
npm i

echo '------------------------------'
npm help install
echo '------------------------------'


#cd src/app
#for file in `find $PWD | xargs ls -d`
#do
#	if [ -d $file ]; then
#		continue
#	fi
#	sed -i 's/from\s\+"\(\.\.\/\)\*rdk/from "@rdkmaster\/jigsaw\/typings/g' $file
#	sed -i "s/from\s\+'\(\.\.\/\)\*rdk/from '@rdkmaster\/jigsaw\/typings/g" $file
#done


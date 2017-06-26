#!/bin/bash
home=$(cd "$(dirname "$0")"; pwd)
workDir="/tmp/jigsaw-seed"

echo '##############################'
echo $home
echo '##############################'

rm -fr $workDir
git clone https://github.com/rdkmaster/jigsaw-seed.git $workDir
cd $workDir
npm install



#cd src/app
#for file in `find $PWD | xargs ls -d`
#do
#	if [ -d $file ]; then
#		continue
#	fi
#	sed -i 's/from\s\+"\(\.\.\/\)\*rdk/from "@rdkmaster\/jigsaw\/typings/g' $file
#	sed -i "s/from\s\+'\(\.\.\/\)\*rdk/from '@rdkmaster\/jigsaw\/typings/g" $file
#done


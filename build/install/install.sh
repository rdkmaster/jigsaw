#!/bin/sh

scriptDir=$(cd `dirname $0`; pwd)
#cd $scriptDir/../../

if [ -d $scriptDir/../../node_modules ]; then
	echo "directory node_modules existed!"
	exit 1
fi

echo "Downloading dependency package..."
rm -f node_modules.zip
wget http://rdk.zte.com.cn/jigsaw/misc/node_modules.zip

if [ ! -e node_modules.zip ]; then
	echo "Unable to download node_modules.zip, please check your network configuration."
	exit 1
fi

echo "Unpackaging..."
unzip node_modules.zip -d $scriptDir/../../ >/dev/null
rm -f node_modules.zip

echo "Compiling..."
cd $scriptDir/../../
chmod +x node_modules/.bin/ng
npm start

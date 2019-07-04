#!/bin/bash
home=`pwd`

seedDir=`pwd`/../jigsaw-seed
rm -fr $seedDir
mkdir -p $seedDir
git clone https://github.com/rdkmaster/jigsaw-seed.git $seedDir
cd $seedDir
git checkout -b upgrade-to-ng8 origin/upgrade-to-ng8
npm install

#update jigsaw npm package
rm -fr node_modules/@rdkmaster/jigsaw
cp -r $home/dist/releases/jigsaw node_modules/@rdkmaster/

#copy demo source and e2e source.
rm -fr ./e2e
cp -r $home/e2e ./

rm -fr src/app src/assets src/index.html src/typings.d.ts
cp -r $home/src/app $home/src/index.html $home/src/jigsaw/typings.d.ts src/

rm -fr ./protractor.conf.js
cp -r $home/protractor-config-for-components.js ./protractor.conf.js

mkdir -p src/mock-data
cp -r $home/src/mock-data src/

echo "processing .angular-cli.json"
sed -i '11 i\ "mock-data",' .angular-cli.json

cd src/app
for file in `find $PWD | xargs ls -d`
do
	if [ -d $file ]; then
		continue
	fi
	echo "processing $file"
	sed -i 's/\(}\s\+from\s\+\)"\(\.\.\/\)*jigsaw\/.\+"\s*;\?\s*$/\1"@rdkmaster\/jigsaw";/g' $file
	sed -i "s/\(}\s\+from\s\+\)'\(\.\.\/\)*jigsaw\/.\+'\s*;\?\s*$/\1'@rdkmaster\/jigsaw';/g" $file
done

cd $home

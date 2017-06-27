#!/bin/bash
home=`pwd`

mkdir -p $SEED_DIR
git clone https://github.com/rdkmaster/jigsaw-seed.git $SEED_DIR
cd $SEED_DIR
npm install

#update rdk npm package
rm -fr node_modules/@rdkmaster/jigsaw
cp -r $home/dist/releases/jigsaw node_modules/@rdkmaster/

#copy demo source and e2e source.
rm -fr ./e2e
cp -r $home/e2e ./

rm -fr src/app src/assets src/styles.scss
cp -r $home/src/app $home/src/assets $home/src/styles.scss src/

rm -fr ./protractor.conf.js
cp -r $home/protractor.conf.js ./

cd src/app
for file in `find $PWD | xargs ls -d`
do
	if [ -d $file ]; then
		continue
	fi
	echo "processing $file"
	sed -i 's/\(}\s\+from\s\+\)"\(\.\.\/\)*rdk\/.\+"\s*;\?\s*$/\1"@rdkmaster\/jigsaw";/g' $file
	sed -i "s/\(}\s\+from\s\+\)'\(\.\.\/\)*rdk\/.\+'\s*;\?\s*$/\1'@rdkmaster\/jigsaw';/g" $file
done

cd $home

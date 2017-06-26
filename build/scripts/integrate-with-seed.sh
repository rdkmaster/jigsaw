#!/bin/bash
home=`pwd`

echo '##############################'
echo home=$home
echo SEED_DIR=$SEED_DIR
echo '##############################'

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

cd src/app
for file in `find $PWD | xargs ls -d`
do
	if [ -d $file ]; then
		continue
	fi
	sed -i 's/from\s\+"\(\.\.\/\)\*rdk/from "@rdkmaster\/jigsaw\/typings/g' $file
	sed -i "s/from\s\+'\(\.\.\/\)\*rdk/from '@rdkmaster\/jigsaw\/typings/g" $file
done

cd $home

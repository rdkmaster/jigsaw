
cd src/app
for file in `find $PWD | xargs ls -d`
do
	if [ -d $file ]; then
		continue
	fi
	sed -i 's/from\s\+"\(\.\.\/\)\*rdk/from "@rdkmaster\/jigsaw\/typings/g' $file
	sed -i "s/from\s\+'\(\.\.\/\)\*rdk/from '@rdkmaster\/jigsaw\/typings/g" $file
done


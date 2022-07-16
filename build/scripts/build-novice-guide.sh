#!/bin/bash

scriptDir=$(cd `dirname $0`; pwd)
cd $scriptDir/../..

echo "building novice guide..."

# 必须保持novice-guide.ts的独立性，不允许它依赖其他内容
cat src/jigsaw/common/novice-guide/novice-guide.ts | grep -P "import\s*\{" > /dev/null
if [ "$?" == "0" ]; then
    echo "Error: it is NOT allowed to import anything inside of novice-guide.ts!!"
    exit 1
fi

if [ ! -e "dist/@rdkmaster/jigsaw" ]; then
    mkdir -p dist/@rdkmaster/jigsaw
fi

./node_modules/.bin/tsc --module commonjs --target es6 --outDir dist/@rdkmaster/jigsaw \
    src/jigsaw/common/novice-guide/novice-guide.ts
if [ "$?" != "0" ]; then
    echo "Error: failed to build novice guide"
    exit 1
fi

sed -i "2 i window.jigsaw = window.jigsaw || {};(exports => {" dist/@rdkmaster/jigsaw/novice-guide.js
echo "})(window.jigsaw);" >> dist/@rdkmaster/jigsaw/novice-guide.js

./node_modules/.bin/terser dist/@rdkmaster/jigsaw/novice-guide.js -c -m -o dist/@rdkmaster/jigsaw/novice-guide.min.js

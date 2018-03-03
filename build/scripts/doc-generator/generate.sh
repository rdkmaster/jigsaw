#!/bin/bash
scriptDir=$(cd `dirname $0`; pwd);
home=$scriptDir/../../..
output=$1

cd $home
rm -f documentation/documentation.json
compodoc src/jigsaw -p tsconfig.json --silent --disableSourceCode --disableGraph \
    --disableCoverage --disablePrivate --disableInternal --disableLifeCycleHooks \
    --disableRoutesGraph --exportFormat json
if [ "$?" != "0" ]; then
    echo "ERROR: cannot generate documentation(json)!"
    exit 1
fi

cd $scriptDir
node json-parser.js $home/documentation/documentation.json $output/fragments
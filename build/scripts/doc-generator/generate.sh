#!/bin/bash
scriptDir=$(cd `dirname $0`; pwd);
home=$scriptDir/../../..
output=$1

if [ "$output" == "" ]; then
    echo "ERROR: need an output dir"
    exit 1
fi
mkdir -p $output

# if output is not an absolute dir...
cd $output
output=`pwd`

cd $home
rm -fr $output/documentation.json $output/fragments
compodoc src/jigsaw -p tsconfig.json --silent --disableSourceCode --disableGraph \
    --disableCoverage --disablePrivate --disableInternal --disableLifeCycleHooks \
    --disableRoutesGraph --exportFormat json --output $output
if [ "$?" != "0" ]; then
    echo "ERROR: cannot generate documentation(json)!"
    exit 1
fi

cd $scriptDir
node json-parser.js $output
node comp-data-relationship-svg-parser.js
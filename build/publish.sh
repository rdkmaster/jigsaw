#!/bin/bash

scriptDir=$(cd `dirname $0`; pwd);

cd $scriptDir/..
jigsawRepo=`pwd`
cd $jigsawRepo/..
uedSiteRepo=`pwd`

target=$1

function checkRepo() {
    local repo=$1
    if [ ! -d $repo ]; then
        echo "Error: the repo $repo is not exists or is not a directory"
        exit 1
    fi
    cd $repo
    local code=0
#    git status | grep "分支 master" > /dev/null
#    if [ "$?" != "0" ]; then
#        echo "Error: the repo $repo is not in master branch"
#        exit 1
#    fi
    git status | grep "干净的工作区" > /dev/null
    if [ "$?" != "0" ]; then
        echo "Error: the repo $repo is not clean"
        exit 1
    fi
    git status | grep "与上游分支 'origin/master' 一致" > /dev/null
    if [ "$?" != "0" ]; then
        echo "Error: the repo $repo has unpushed commits"
        exit 1
    fi
    echo "Great! the repo $repo is ready to work!"
}

function publishUed() {
    checkRepo $jigsawRepo
    checkRepo $uedSiteRepo

    cd $jigsawRepo
    node build/build.js jigsaw-app-external prod
    if [ "$?" != "0" ]; then
        echo "Error: failed to build jigsaw external app!"
        exit 1
    fi

    cd $uedSiteRepo
    git pull origin master
    rm -fr ./*
    cp -r $jigsawRepo/dist/* ./
    git add .
    git commit -m 'auto updated'
#    git push origin master
    if [ "$?" != "0" ]; then
        echo "Error: failed to push built files to gitee.com!"
        exit 1
    fi
    echo "Success to publish jigsaw external app to gitee.com!"
}

function getNewVersion() {
    local proxy=`git config --list --local | grep http.proxy | sed "s#http.proxy=##"`
    local pkg=`curl -x "$proxy" -s -L https://cdn.jsdelivr.net/npm/@rdkmaster/jigsaw@latest/package.json`
    if [ "$pkg" == "" ]; then
        pkg=`curl -x "$proxy" -s -L https://unpkg.com/@rdkmaster/jigsaw@latest/package.json`
    fi
    if [ "$pkg" == "" ]; then
        echo "Error: failed to read the latest version num of jigsaw!"
        exit 1
    fi
    local curVersion=`echo $pkg | grep -Po '"version": ".+?"'`
    local version1=`echo $curVersion | grep -Po "\d+\.\d+\."`
    local version2=`echo $curVersion | grep -Po '\d+"' | grep -Po "\d+"`
    version2=$((version2+1))
    echo $version1$version2
}

function publishNpm() {
    checkRepo $jigsawRepo

    cd $jigsawRepo
    ./node_modules/.bin/gulp build:jigsaw:clean
    if [ "$?" != "0" ]; then
        echo "Error: failed to build jigsaw lib!"
        exit 1
    fi
    local newVersion=`getNewVersion`
    sed -i 's#"version":\s*".\+"#"version":"'$newVersion'"#' dist/@rdkmaster/jigsaw/package.json

    echo "publishing jigsaw lib to npm registry with new version $newVersion ..."
#    npm publish --tag latest --access public dist/@rdkmaster/jigsaw
    if [ "$?" != "0" ]; then
        echo "Error: failed to publish jigsaw lib to npm registry!"
        exit 1
    fi
    echo "Success to publish jigsaw lib to npm registry!"
}

if [ "$target" == "ued" ]; then
    publishUed
elif [ "$target" == "npm" ]; then
    publishNpm
else
    echo "Error: invalid publish target, need used/npm"
    exit 1
fi


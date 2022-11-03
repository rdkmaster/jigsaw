#!/bin/bash

function md5Dir() {
    for file in ` ls -a $1 `
    do
        if [ $file == . ] || [ $file == .. ]; then
            continue
        fi
        if [ -d $1/$file ]; then
            md5Dir $1/$file
        else
            allMd5sum="$allMd5sum | `md5sum $1/$file`"
        fi
    done
}

function checkRepo() {
    local repo=$1
    if [ ! -d $repo ]; then
        echo "Error: the repo $repo is not exists or is not a directory"
        exit 1
    fi
    cd $repo
    local code=0
    git status | grep "分支 master" > /dev/null
    if [ "$?" != "0" ]; then
        echo "Error: the repo $repo is not in master branch"
        exit 1
    fi
    git status | grep "干净的工作区" > /dev/null
    if [ "$?" != "0" ]; then
        echo "Error: the repo $repo is not clean"
        exit 1
    fi
    git status | grep "您的分支领先 'origin/master' 共" > /dev/null
    if [ "$?" == "0" ]; then
        echo "Error: the repo $repo has unpushed commits"
        exit 1
    fi
    echo "Great! the repo $repo is ready to work!"
}

function publishToGitee() {
    echo "publishing to gitee server...."
    if [[ "$GITEE_USER" == "" || "$GITEE_PWD" == "" ]]; then
        echo "Error: invalid gitee user or password, need this info to auto deploy ued site"
        exit 1
    fi
    local uedSiteRepo=$jigsawRepo/../ued-site-latest
    checkRepo $uedSiteRepo

    cd $uedSiteRepo
    git pull origin master
    rm -fr ./*
    cp -r $jigsawRepo/dist/* ./
    git add .
    git commit -m 'auto updated'
    git push origin master
    if [ "$?" != "0" ]; then
        echo "Error: failed to push built files to gitee.com!"
        exit 1
    fi
    echo "Success to push files jigsaw external app to gitee.com!"

    cd $jigsawRepo
    node build/tools/deploy-ued-sites.js
    if [ "$?" != "0" ]; then
        echo "Error: failed to deploy jigsaw external web site!"
        exit 1
    fi
    echo "Success to publish jigsaw external web site to gitee.com!"
}

function publishToRDK() {
    echo "publishing to rdk server...."
    if [ "$AWADE_ALL_WORK_DIR" == "" ]; then
        echo "Error: invalid AWADE_ALL_WORK_DIR environment variable!"
        exit 1
    fi
    local deployDir=$AWADE_ALL_WORK_DIR/ued-site/code-base-mirror/web-site/master
    if [ ! -d $deployDir ]; then
        echo "Error: invalid dir $deployDir!"
        exit 1
    fi
    rm -fr $deployDir/*
    cp -r $jigsawRepo/dist/* $deployDir/
    echo "Success to publish jigsaw external web site to $deployDir!"
}

function publishUed() {
    if [[ "$server" != "gitee" && "$server" != "rdk" ]]; then
        echo "Error: invalid target server, need gitee/rdk"
        exit 1
    fi

    cd $jigsawRepo
    git pull
    node build/build.js jigsaw-app-external prod
    if [ "$?" != "0" ]; then
        echo "Error: failed to build jigsaw external app!"
        exit 1
    fi
    if [ "$server" == "gitee" ]; then
        publishToGitee
    else
        publishToRDK
    fi
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
    npm whoami
    if [ "$?" != "0" ]; then
        echo "Error: npm is not logged in, use npm login and try again"
        exit
    fi

    cd $jigsawRepo
    ./node_modules/.bin/gulp build:jigsaw:clean
    if [ "$?" != "0" ]; then
        echo "Error: failed to build jigsaw lib!"
        exit 1
    fi
    local newVersion=`getNewVersion`
    sed -i 's#"version":\s*".\+"#"version":"'$newVersion'"#' dist/@rdkmaster/jigsaw/package.json

    echo "publishing jigsaw lib to npm registry with new version $newVersion ..."
    npm publish --tag latest --access public dist/@rdkmaster/jigsaw
    if [ "$?" != "0" ]; then
        echo "Error: failed to publish jigsaw lib to npm registry!"
        exit 1
    fi
    echo "Success to publish jigsaw lib to npm registry!"
}

#######################################################################

target=$1
if [[ "$target" != "ued" &&  "$target" != "npm" ]]; then
    echo "Error: invalid publish target, need ued/npm"
    echo "Usage:"
    echo "  sh publish.sh ued rdk"
    echo "  sh publish.sh ued gitee"
    echo "  sh publish.sh npm"
    exit 1
fi

jigsawRepo=$(cd `dirname $0`/..; pwd);
checkRepo $jigsawRepo

if [ "$target" == "ued" ]; then
    server=$2
    publishUed
elif [ "$target" == "npm" ]; then
    allMd5sum=""
    publishNpm
fi

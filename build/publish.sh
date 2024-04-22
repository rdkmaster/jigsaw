#!/bin/bash

source ~/.bashrc

function checkRepo() {
    local repo=$1
    if [ ! -d $repo ]; then
        echo "Error: the repo $repo is not exists or is not a directory"
        exit 1
    fi
    cd $repo
    git status | grep -P "(位于分支|On branch) master" > /dev/null
    if [ "$?" != "0" ]; then
        echo "Error: the repo $repo is not in branch master!"
        exit 1
    fi
    git status | grep -P "(您的分支领先|Your branch is ahead of) 'origin/.+'" > /dev/null
    if [ "$?" == "0" ]; then
        echo "Error: the repo $repo has unpushed commits!"
        exit 1
    fi
    if [ "`git status --porcelain`" != "" ]; then
        echo "Error: the repo $repo is not clean!"
        exit 1
    fi
    echo "Great! the repo $repo is ready for work!"
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
    if [ "`git status --porcelain`" == "" ]; then
        echo "Info: there is nothing updated to the ued site!"
        return 1
    fi

    git add .
    git commit -m 'auto updated'
    git push origin master
    if [ "$?" != "0" ]; then
        echo "Error: failed to push built files to gitee.com!"
        exit 1
    fi
    echo "Success to push files jigsaw external app to gitee.com!"

    cd $jigsawRepo
    node build/tools/deploy-ued-sites.js --headless
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
    node build/build.js jigsaw-app-external prod dist "/latest/"
    if [ "$?" != "0" ]; then
        echo "Error: failed to build jigsaw external app!"
        exit 1
    fi
    node build/build.js jigsaw-app-internal prod dist/internal-demo "/latest/internal-demo/"
    if [ "$?" != "0" ]; then
        echo "Error: failed to build jigsaw internal app!"
        exit 1
    fi

    if [ "$server" == "gitee" ]; then
        publishToGitee
    else
        publishToRDK
    fi
}

tmpNpmPackagePath=/tmp/jigsaw-npm-package

function getNewVersion() {
    local pkg=`cat $tmpNpmPackagePath/node_modules/@rdkmaster/jigsaw/package.json`
    local curVersion=`echo $pkg | grep -Po '"version":\s*".+?"'`
    local version1=`echo $curVersion | grep -Po "\d+\.\d+\."`
    local version2=`echo $curVersion | grep -Po '\d+"' | grep -Po "\d+"`
    version2=$((version2+1))
    echo $version1$version2
}

function md5Dir() {
    for file in ` ls -a $1 `
    do
        if [ $file == . ] || [ $file == .. ]; then
            continue
        fi
        if [ -d $1/$file ]; then
            md5Dir $1/$file
        elif [ "$file" != "package.json" ]; then
            allMd5sum="$allMd5sum | `md5sum $1/$file`"
        fi
    done
}

function getPublishedNpmChecksum() {
    rm -fr $tmpNpmPackagePath
    mkdir $tmpNpmPackagePath
    cd $tmpNpmPackagePath
    npm install @rdkmaster/jigsaw --no-optional >/dev/null 2>&1
    if [ "$?" != "0" ]; then
        return 1
    fi
    cd node_modules/@rdkmaster/jigsaw
    allMd5sum="" && md5Dir .
    echo $allMd5sum | md5sum
}

function noticePublishError() {
    echo "----------------------------------------------------"
    echo "$1"
    echo "----------------------------------------------------"
}

function publishNpm() {
    npm whoami
    if [ "$?" != "0" ]; then
        echo "Error: npm is not logged in, use npm login and try again"
        exit
    fi

    cd $jigsawRepo
    local nextVersion=$1
    local dry=$2
    echo "Publishing jigsaw & formly with next version: $nextVersion ..."

    echo "Publishing target: publish:jigsaw"
    ./node_modules/.bin/gulp publish:jigsaw --tag latest --nextVersion $nextVersion $dry || {
        noticePublishError "Failed to publish publish:jigsaw"
        exit 1
    }
    echo "Publishing target: publish:formly"
    ./node_modules/.bin/gulp publish:formly --tag latest --nextVersion $nextVersion $dry || {
        noticePublishError "Failed to publish publish:formly"
        exit 1
    }
    node build/install-governance-dependencies.js || {
        noticePublishError "Failed to install dependencies for governance version!"
        exit 1
    }
    echo "Publishing target: publish:governance:jigsaw"
    ./node_modules/.bin/gulp publish:governance:jigsaw --tag governance --nextVersion $nextVersion-g1 $dry || {
        noticePublishError "Failed to publish publish:governance:jigsaw"
        exit 1
    }
    echo "Publishing target: publish:governance:formly"
    ./node_modules/.bin/gulp publish:governance:formly --tag governance --nextVersion $nextVersion-g1 $dry || {
        noticePublishError "Failed to publish publish:governance:formly"
        exit 1
    }
    echo "All targets published to npm !!!!!!!!!!"
}

function updateJigsawRepo() {
    cd $jigsawRepo
    git pull
    npm install
    cd build
    npm install
}

function onExit() {
    cd $jigsawRepo
    git checkout .
}
trap onExit EXIT

#######################################################################

target=$1
if [[ "$target" != "ued" &&  "$target" != "npm" ]]; then
    echo "Error: invalid publish target, need ued/npm"
    echo "Usage:"
    echo "  sh publish.sh ued rdk"
    echo "  sh publish.sh ued gitee"
    echo "  sh publish.sh npm \$nextVersion --dry"
    exit 1
fi

echo "================= `date` ================="
echo "publishing with param: $*"
echo "========================================================================"

jigsawRepo=$(cd `dirname $0`/..; pwd);
checkRepo $jigsawRepo
updateJigsawRepo

if [ "$target" == "ued" ]; then
    server=$2
    publishUed
elif [ "$target" == "npm" ]; then
    publishNpm $2 $3
fi

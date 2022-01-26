#!/bin/bash

function printUsageAndExit() {
    echo "----------------------------------------------------------------------------------------------------"
    echo $1
    echo "----------------------------------------------------------------------------------------------------"
    echo "用法：下面命令之一"
    echo "  提交一个 [新增]：      sh tools/commit.sh new 本次提交的简要说明（必选），解决了 @123和@456（可选）"
    echo "  提交一个 [故障]：      sh tools/commit.sh fix 本次提交的简要说明（必选），解决了 @123和@456（可选）"
    echo "  提交一个 [优化]：      sh tools/commit.sh opt 本次提交的简要说明（必选），解决了 @123和@456（可选）"
    echo "  "
    echo "  提交一个 [破坏性修改]：sh tools/commit.sh bc  本次提交的简要说明（必选），解决了 @123和@456（可选）"
    echo "  "
    echo "  将代码推送给服务器：   sh tools/commit.sh push"
    echo "----------------------------------------------------------------------------------------------------"
    echo "其他：通过自然语言让当前commit与issue关联的方法"
    echo "  例子1： 解决@123、@456"
    echo "  例子2： 解决了@123、@456"
    echo "  例子3： 关联@123、@456"
    echo "  例子4： 关联@123，解决了@456"
    exit 1
}

command=$1
if [[ "$command" != "new" && "$command" != "fix" && "$command" != "opt" && "$command" != "bc" && "$command" != "push" ]];then
    printUsageAndExit '未支持的指令 ['$command']，必须是 new / fix / opt / bc / push 之一'
fi

if [[ "$command" == "push" ]]; then
    git push $*
    exit 0
fi

shift 1
message=$*

if [[ "$message" == "" ]]; then
    printUsageAndExit '提交的信息不能为空！'
fi

if [[ "$command" == "new" ]]; then
    message="[新增] $message"
fi

if [[ "$command" == "fix" ]]; then
    message="[故障] $message"
fi

if [[ "$command" == "opt" ]]; then
    message="[优化] $message"
fi

if [[ "$command" == "bc" ]]; then
    message="[破坏性修改] $message"
fi

echo "正在提交：$message ..."
git commit -m "$message"

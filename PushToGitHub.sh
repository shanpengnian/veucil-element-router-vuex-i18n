#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 全局配置
git config --global user.name "shanpengnian"
git config --global user.email "shanpengnian@163.com"

# 提交描述
msg='支持i18n'

# 提交仓库地址
githubUrl=git@github.com:shanpengnian/veucil-element-router-vuex-i18n.git

git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:master # 推送到github master分支
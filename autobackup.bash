#!/bin/bash

set -e

git config --global user.email "autodeploy@local"
git config --global user.name "autodeploy"

node main.js

if [[ `git status --porcelain` ]]; then
    git add -A && \
    git commit -m \"autobackup-$(date '+%y%m%d')\" && \
    git push && \
    echo "We did it!"
else
    echo "No changes to commit"
fi
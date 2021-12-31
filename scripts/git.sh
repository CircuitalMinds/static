#!/usr/bin/env bash


OPTION=$1
F_PATH=$2
BRANCH=$3
URL=$4

if [[ $OPTION == "clone" ]];
then
  cd $F_PATH && git clone -b $BRANCH $URL
elif [[ $OPTION == "push" ]];
then
  cd $F_PATH && git add . && git commit -m 'autocommit'
  cd $F_PATH && git push
fi

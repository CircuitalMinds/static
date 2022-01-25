#!/usr/bin/env bash


OPTION=$1
FOLDER_PATH=$2
BRANCH=$3
URL=$4

if [[ $OPTION == "clone" ]];
then
  cd $FOLDER_PATH && git clone -b $BRANCH $URL
elif [[ $OPTION == "push" ]];
then
  cd $FOLDER_PATH && git add . && git commit -m 'autocommit'
  cd $FOLDER_PATH && git push
fi

#!/usr/bin/env bash


GO_PATH="cd $1"
OPTION="$2"
if [[ $OPTION == "serve" ]];
then
    echo "$( $GO_PATH && bundle exec jekyll serve -l -o -H [ --host 192.168.50.7 --port 8080 ] )"
elif [[ $OPTION == "build" ]];
then
    $GO_PATH && echo "$3" | sudo -S bundle exec jekyll build -d /var/www/circuitalminds
fi

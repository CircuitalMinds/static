# !/usr/bin/bash


VideoContainers () {
    Folder="$HOME/Videos/containers"
    for i in $( ls $Folder )
    do
      ContentPath="$Folder/$i/videos"
      for j in "$( ls $ContentPath )"
      do
        echo "$j"
      done
    done
}

Range () {
  Start=$1
  Stop=$2
  echo "$( seq $Start $Stop )"
}


mount_disk () {
    disk="sda"
    sudo mount /dev/$disk /media/alanmatzumiya
}

zip_folder () {
    sizes=$"5m"
    out_path=$"files.zip"
    folder_path=$""
    zip -r -s $sizes $out_path $folder_path
}

unzip_folder () {
    folder_path=$""
    zip $folder_path
}

function Update () {
    FILE="$(echo $HOME)/login"

    GET_UPDATE="sudo apt-get update"
    UPDATE="sudo apt update"
    GET_UPGRADE="sudo apt-get upgrade"
    UPGRADE="sudo apt upgrade"
    GET_CLEAN="sudo apt-get clean"
    CLEAN="sudo apt autoremove"

    while read i; do
    for s in $i
    do
      if [ s != "" ];
      then
        PWD=$s
      fi
    done
    done < $FILE

    echo $PWD | sudo -S $GET_UPDATE && $UPDATE && $GET_UPGRADE && $UPGRADE && $GET_CLEAN && $CLEAN && $UPDATE
}

Range 1 10
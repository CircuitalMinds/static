# !/usr/bin/bash


FILENAME=$"requirements.txt"
NAME=$1

function CreateFile () {
    echo "# Requirements" > "$FILENAME"
    for i in $CONTENT
    do
      echo "$i" >> "$FILENAME"
    done
}

function Install () {
    python -m pip install virtualenv
    python -m virtualenv environment
    VENV_ACTIVATE=$"source ./environment/bin/activate"
    $VENV_ACTIVATE && python -m pip install --upgrade pip && python -m pip install -r $FILENAME
}

function App () {
    CONTENT=$" numba mpmath imageio imageio-ffmpeg matplotlib bs4 selenium
       geckodriver_autoinstaller termcolor numpy scipy "
}

function Api () {
    CONTENT=$" flask flask-cors flask_sqlalchemy gunicorn requests Werkzeug PyYAML "
    echo "$CONTENT"
}

if [[ $NAME == "App" ]];
then
  CONTENT="$(App)"
elif [[ $NAME == "Api" ]];
then
  CONTENT="$(Api)"
fi

$(CreateFile)
$(Install)
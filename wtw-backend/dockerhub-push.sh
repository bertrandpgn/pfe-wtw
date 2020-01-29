#! /bin/bash

if [ "$1" != "" ]; then
    echo "Building backend with tag $1"
    docker build -t wtw-backend .
    docker tag wtw-backend cake1234/wtw-backend:$1
    docker push cake1234/wtw-backend:$1
else
    echo "Tag is empty"
fi
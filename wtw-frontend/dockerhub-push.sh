#! /bin/bash

if [ "$1" != "" ]; then
    echo "Building frontend with tag $1"
    docker build -t wtw-frontend .
    docker tag wtw-frontend cake1234/wtw-frontend:$1
    docker push cake1234/wtw-frontend:$1
else
    echo "Tag is empty"
fi
#! /bin/bash
docker build -t wtw-backend .
docker tag wtw-backend cake1234/wtw-backend
docker push cake1234/wtw-backend

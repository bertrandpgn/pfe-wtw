#! /bin/bash
docker build -t wtw-frontend .
docker tag wtw-frontend cake1234/wtw-frontend
docker push cake1234/wtw-frontend

#!/bin/sh

sudo docker run -d -p 80:80 cake1234/wtw-frontend
sudo docker run -d -p 4001:4001 cake1234/wtw-backend
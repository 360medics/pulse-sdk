#!/bin/bash

DIST_CLIENT_KEY="PULSE_CLIENT_KEY"

rm -rf ./dist/*
npm run build

cp ./dist/bundle.js ./demo/demo-dist/bundle.js
cp ./demo/favicon.ico ./demo/demo-dist/favicon.ico
cp ./demo/demo-dist/index.dist.html ./demo/demo-dist/index.html

# add client key
sed -i '' "s/DIST_CLIENT_KEY/${DIST_CLIENT_KEY}/g" demo/demo-dist/index.html

rsync -a --delete demo/demo-dist/ root@159.223.15.71:/home/srv/sdk --exclude demo/demo-dist/index.dist.html

rm ./demo/demo-dist/index.html
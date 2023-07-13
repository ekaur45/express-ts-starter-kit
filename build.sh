#!/bin/sh

# Author : Waqas Ahmad
# Copyright (c) mighty-coders.com
# Script follows here:
npm i
npm run build
cd build
npm i
cp .env.example .env 
pm2 delete -s ts_api
pm2 start index.js --name ts_api
exit
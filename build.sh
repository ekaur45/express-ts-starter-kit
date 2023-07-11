#!/bin/sh

# Author : Zara Ali
# Copyright (c) Tutorialspoint.com
# Script follows here:
npm run build
cd build
npm i
cp .env.example .env 
npm run start:prod
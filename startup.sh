#!/bin/bash

DIR_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

rm ${DIR_PATH}/mongod.log

mongod --dbpath ${DIR_PATH}/data --fork --logpath ${DIR_PATH}/mongod.log
npm start --prefix ${DIR_PATH}

# kill mongod server after control+c
kill $(ps aux | grep 'mongod' | grep -v grep | awk '{print $2}')
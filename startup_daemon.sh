#!/bin/bash

DIR_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

rm ${DIR_PATH}/log/mongod.log

mongod --dbpath ${DIR_PATH}/data --storageEngine=wiredTiger --fork --logpath ${DIR_PATH}/log/mongod.log

cd ${DIR_PATH}

nohup node bin/www > ${DIR_PATH}/log/stdout.txt 2> ${DIR_PATH}/log/stderr.txt &

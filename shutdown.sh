#!/usr/bin/env bash

# kill mongod server after control+c
kill $(ps aux | grep 'mongod' | grep -v grep | awk '{print $2}')

#kill node server
kill $(lsof -i :3000 | awk '{print $2}')

echo "shutdown"
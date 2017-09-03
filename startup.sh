#!/bin/bash

rm /Users/marcus.chiu/ComputerScience/MyProjects/LogTwo/mongod.log

mongod --dbpath /Users/marcus.chiu/ComputerScience/MyProjects/LogTwo/data --fork --logpath /Users/marcus.chiu/ComputerScience/MyProjects/LogTwo/mongod.log
npm start --prefix /Users/marcus.chiu/ComputerScience/MyProjects/LogTwo

# kill mongod server after control+c
kill $(ps aux | grep 'mongod --dbpath /Users/marcus.chiu/ComputerScience/MyProjects/LogTwo/data --fork --logpath /Users/marcus.chiu/ComputerScience/MyProjects/LogTwo/mongod.lo' | grep -v grep | awk '{print $2}')
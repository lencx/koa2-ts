#!/usr/bin/env bash
if [ ! -d "database" ]; then
    mkdir database
fi

if [ ! -d "mongodb/log" ]; then
    mkdir log/mongodb/
fi

mongod -f ./mongod.conf
# yarn dev
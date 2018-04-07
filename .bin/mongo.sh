#!/usr/bin/env bash
if [ ! -d "database" ]; then
    mkdir database
fi

if [ ! -d "mongodb/log" ]; then
    mkdir mongodb/log
fi

mongod -f mongodb/mongod.conf
yarn dev
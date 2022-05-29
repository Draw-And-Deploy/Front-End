#!/bin/bash
echo "Clearing the directory"
if [ ! -d /var/www/frontend ]; then
    mkdir -p /var/www/frontend
else
    rm -rf /var/www/frontend/* 2>/dev/null
    rm -rf /var/www/frontend/.* 2>/dev/null
fi
pwd
echo "Copying files to /var/www/frontend/ directory"
cp -r frontend/build/* /var/www/frontend/

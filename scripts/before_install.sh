#!/bin/bash
set -e

if [ ! -d /var/www/frontend ]; then
    mkdir -p /var/www/frontend
else
    rm -rf /var/www/frontend/* 2>/dev/null
    rm -rf /var/www/frontend/.* 2>/dev/null
fi

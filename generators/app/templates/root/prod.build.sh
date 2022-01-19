#!/usr/bin/env bash

yarn
yarn build
pm2-runtime start ecosystem.config.js

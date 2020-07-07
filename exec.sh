#!/usr/bin/env bash

docker build -t letstravel .
docker run -p 3000:3000 --init letstravel
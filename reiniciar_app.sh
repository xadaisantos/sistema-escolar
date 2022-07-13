#!/bin/bash

CURRENT_UID=$(id -u):$(id -g) docker-compose down
CURRENT_UID=$(id -u):$(id -g) docker-compose up -d
docker-compose ps
#!/bin/bash


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
RLIB_DOCKER_CONTAINER=rlib-nginx

if [ "$(docker ps -aq --filter name=$RLIB_DOCKER_CONTAINER)" ]; then
	echo Removing existing $RLIB_DOCKER_CONTAINER docker container...
	docker rm -f $(docker ps -aq --filter name=$RLIB_DOCKER_CONTAINER)
fi

echo Running $RLIB_DOCKER_CONTAINER docker container...
docker create -p 3300:9001 --name $RLIB_DOCKER_CONTAINER -i nginx
docker cp $DIR/nginx.conf $(docker ps -aq --filter name=$RLIB_DOCKER_CONTAINER):etc/nginx/nginx.conf
docker cp $DIR/../assets $(docker ps -aq --filter name=$RLIB_DOCKER_CONTAINER):/
docker start $(docker ps -aq --filter name=$RLIB_DOCKER_CONTAINER)
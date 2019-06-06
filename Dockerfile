# Use node base image
FROM node:latest AS build
ENV NODE_ENV=development

# Create a working app directory
WORKDIR /app

# Copy the package.json file into app directory to install the npm packages
COPY ./package.json /app

# Install all the npm packages
RUN yarn install --pure-lockfile

# Copy all the files of the project into the app directory
COPY . /app

# Run the yarn run build script
RUN yarn build

# Base image that is derived from alpine and has R installed as a shared library
FROM achillesrasquinha/rpy2

# Add label for metadata
LABEL maintainer achillesrasquinha@gmail.com

# Install dependencies
RUN apk update \
	&& apk --no-cache add \
	build-base \
	git \
	python3-dev \
	python3-tkinter \
	graphviz-dev \
	curl \
	postgresql-dev \
	freetype-dev \
	openblas-dev 

# Install Java
RUN { \
	echo '#!/bin/sh'; \
	echo 'set -e'; \
	echo; \
	echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
	} > /usr/local/bin/docker-java-home \
	&& chmod +x /usr/local/bin/docker-java-home

ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk \
    PATH=$PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin \
    JAVA_VERSION=8u212 \
    JAVA_ALPINE_VERSION=8.212.04-r0

RUN set -x \
	&& apk add --no-cache \
	openjdk8="$JAVA_ALPINE_VERSION" \
	&& [ "$JAVA_HOME" = "$(docker-java-home)" ]

# Copy the pip requirements file into the container
COPY ./requirements.txt  /requirements.txt

# Install pip packages
RUN pip3 install --upgrade pip \
    && echo "http://dl-8.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && ln -s /usr/include/locale.h /usr/include/xlocale.h \ 
    && pip3 install numpy pyyaml \
    && pip3 install setuptools wheel \
    && pip3 install javabridge \
    && pip3 install -r /requirements.txt \
    && rm /requirements.txt

# Work in the app directory of the container
WORKDIR /app

# Change the app directory into volumes
VOLUME /app

# Use docker build args to copy the static asset files built previously into this container
RUN rm -rf /app/candis/app/assets
COPY --from=build  /app/candis/app/assets  /app/candis/app/assets

# Export python path
ENV PYTHONPATH="/app/candis"

# Expose port 5000 and 8888
EXPOSE 5000 8888

# Launch Candis server
CMD ["python3", "-m", "candis"]	

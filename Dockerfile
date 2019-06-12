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
CMD ["yarn", "build"]

# Use ubuntu as base image
FROM  ubuntu:xenial

# Add labels for metadata
LABEL maintainer achillesrasquinha@gmail.com

# Install dependencies
RUN apt-get update --fix-missing \
    && apt-get install -y --no-install-recommends \
    apt-transport-https \
    gcc \
    git \
    python3-dev \ 
    python3-pip \
    python3-tk \
    software-properties-common \ 
    graphviz-dev \
    wget

# Install Java
RUN wget https://d3pxv6yz143wms.cloudfront.net/8.212.04.2/java-1.8.0-amazon-corretto-jdk_8.212.04-2_amd64.deb && \
    apt-get update &&  apt-get install java-common && apt-get install -y --no-install-recommends apt-utils && \
    dpkg --install java-1.8.0-amazon-corretto-jdk_8.212.04-2_amd64.deb

# Install R
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9 \
    && add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/' \
    && apt-get update \
    && apt-get install -y r-base 

# Copy the R directory into the container
COPY ./R /R

# Run setup.R script to install required R packages
RUN cd /R \
    && Rscript setup.R

# Copy the pip requirements file into the container
COPY ./requirements.txt  /requirements.txt

# Install pip packages
RUN pip3 install --upgrade pip \
    && pip install setuptools wheel \
    && pip install numpy pyyaml \
    && pip install --no-binary javabridge -r /requirements.txt \
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

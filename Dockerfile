# Use ubuntu as base image
FROM  ubuntu:xenial

# Add labels for metadata
LABEL maintainer="achillesrasquinha@gmail.com"

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
    wget \
# Install Java
    && wget https://d3pxv6yz143wms.cloudfront.net/8.212.04.2/java-1.8.0-amazon-corretto-jdk_8.212.04-2_amd64.deb && \
    apt-get update &&  apt-get install java-common && apt-get install -y --no-install-recommends apt-utils && \
    dpkg --install java-1.8.0-amazon-corretto-jdk_8.212.04-2_amd64.deb \
# Install R
    && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9 \
    && add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/' \
    && apt-get update \
    && apt-get install -y r-base

# Copy the R directory into the container
COPY ./R /R

# Copy the pip requirements file into the container
COPY ./requirements.txt  /requirements.txt

# Run setup.R script to install required R packages
RUN cd /R \
    && Rscript setup.R \
# Install pip packages
    && python3 -m pip install --upgrade pip \
    && pip3 install setuptools wheel \
    && pip3 install numpy pyyaml \
    && pip3 install --no-binary javabridge -r /requirements.txt \
    && rm /requirements.txt

# Work in the app directory of the container
WORKDIR /app

# Change the app directory into volumes
VOLUME /app

# Export python path
ENV PYTHONPATH="/app/candis"

# Expose port 5000 and 8888
EXPOSE 5000 8888

# Launch Candis server
CMD ["python3", "-m", "candis"]

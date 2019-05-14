FROM python:3.7-alpine

# Add labels for metadata
LABEL maintainer achillesrasquinha@gmail.com

# Install dependencies
RUN apk update \
	&& apk add --no-cache --virtual build-deps gcc musl-dev\
    && apk add --no-cache git python3-dev python3-tkinter graphviz-dev wget

# Install Java
RUN wget https://d3pxv6yz143wms.cloudfront.net/8.212.04.2/java-1.8.0-amazon-corretto-jdk_8.212.04-2_amd64.deb && \
    apt-get update && apt-get install java-common && apt-get install -y --no-install-recommends apt-utils && \
    dpkg --install java-1.8.0-amazon-corretto-jdk_8.212.04-2_amd64.deb

# Install R
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9 \
    && add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/' \
    && apt-get update \
    && apt-get install -y r-base 

# Copy the pip requirements file into the container
COPY ./requirements.txt  /requirements.txt

# Install pip packages
RUN pip3 install --upgrade pip 
RUN pip3 install setuptools wheel \
    && pip3 install numpy pyyaml \
    && pip3 install --no-binary javabridge -r /requirements.txt

# Create the app directory in the container
RUN mkdir app

# Change the app directory into volumes
VOLUME /app

# Work in the app directory of the container
WORKDIR /app

# Export python path
ENV PYTHONPATH="/app/candis"

# Expose port 5000
EXPOSE 5000 8888

# Launch Candis
CMD ["python3", "-m", "candis"]

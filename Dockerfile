FROM  ubuntu:xenial
LABEL maintainer achillesrasquinha@gmail.com

RUN apt-get update --fix-missing
RUN apt-get install -y --no-install-recommends \
                apt-transport-https \
                gcc \
                git \
                python3-dev \ 
                python3-pip \
                python3-tk \
                software-properties-common \ 
                graphviz-dev \
				wget

# Install Java.
RUN wget https://d3pxv6yz143wms.cloudfront.net/8.212.04.2/java-1.8.0-amazon-corretto-jdk_8.212.04-2_amd64.deb && \
    apt-get update &&  apt-get install java-common && apt-get install -y --no-install-recommends apt-utils && \
    dpkg --install java-1.8.0-amazon-corretto-jdk_8.212.04-2_amd64.deb

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9 
RUN add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/' 
RUN apt-get update 
RUN apt-get install -y r-base 
RUN pip3 install --upgrade pip 
RUN pip3 install setuptools 
RUN pip3 install wheel 
RUN pip3 install numpy
RUN pip3 install pyyaml \
        && git clone https://github.com/HelikarLab/candis.git 
        # && pip3 install -r ./candis/requirements.txt 
        # && pip3 install ./candis 
        # && rm -rf /var/lib/apt/lists/* 
        # && rm -rf /var/cache/oracle-jdk8-installer

COPY . /app

WORKDIR /app

RUN pip3 install --no-binary javabridge -r requirements.txt
RUN pip3 install .

EXPOSE 5000

CMD ["candis"]

FROM ubuntu:xenial
LABEL maintainer achillesrasquinha@gmail.com

RUN apt-get update \
        && apt-get install -y --no-install-recommends \
                apt-transport-https \
                gcc \
                git \
                python3-dev \
                python3-pip \
                python3-tk \
                software-properties-common \
                graphviz-dev \
        && echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections \
        && add-apt-repository -y ppa:webupd8team/java \
        && apt-get update \
        && apt-get install -y --no-install-recommends oracle-java8-installer \
        && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9 \
        && add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/' \
        && apt-get update \
        && apt-get install -y r-base \ 
        && pip3 install setuptools \
        && pip3 install wheel \
        && pip3 install numpy \
        && pip3 install pyyaml \
        && git clone https://github.com/HelikarLab/candis.git \
        && pip3 install -r ./candis/requirements.txt \
        && pip3 install ./candis \
        && rm -rf /var/lib/apt/lists/* \
        && rm -rf /var/cache/oracle-jdk8-installer

EXPOSE 5000

CMD ["candis"]
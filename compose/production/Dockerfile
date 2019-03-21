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
	&& echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections 

RUN add-apt-repository -y ppa:webupd8team/java \ 
    && apt-get update \
    && apt-get install -y --no-install-recommends oracle-java8-installer \
    && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9 \
    && add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/' \
    && apt-get update \
    && apt-get install -y r-base 

COPY . /app

WORKDIR /app

RUN pip3 install --upgrade pip
RUN pip3 install setuptools wheel \
    && pip3 install numpy pyyaml \
    && pip3 install --no-binary javabridge -r ./requirements/production.txt

ENV PYTHONPATH="/app/candis"

EXPOSE 5000

CMD ["python3", "-m", "candis"]

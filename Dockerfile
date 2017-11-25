# Python Runtime
FROM python:3-slim

WORKDIR /candis

ADD . /candis

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "-m", "candis"]

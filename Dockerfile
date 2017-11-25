# python runtime
FROM python:3-slim

# container
WORKDIR /candis
ADD . 	/candis

RUN python get-candis

EXPOSE 5000

CMD ["candis"]
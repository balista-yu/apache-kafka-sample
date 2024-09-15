FROM --platform=linux/x86_64 mysql:8.2

ENV TZ=Asia/Tokyo

COPY ./infra/docker/mysql/conf/my.cnf /etc/my.cnf
RUN chmod 644 /etc/my.cnf

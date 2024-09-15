FROM confluentinc/cp-kafka-connect-base:latest

# コネクターをインストール
RUN confluent-hub install --no-prompt confluentinc/kafka-connect-jdbc:latest
RUN confluent-hub install --no-prompt confluentinc/kafka-connect-s3:latest

USER root
RUN yum -y update && yum install -y sudo

RUN echo 'appuser ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER appuser
WORKDIR /home/appuser

# mysqlのドライバーをインストール
RUN sudo curl -k -SL "https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-9.0.0.tar.gz" \
     | sudo tar -xzf - -C /usr/share/java/kafka/ --strip-components=1 mysql-connector-j-9.0.0/mysql-connector-j-9.0.0.jar

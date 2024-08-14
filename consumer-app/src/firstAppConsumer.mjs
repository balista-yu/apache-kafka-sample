import {Kafka} from 'kafkajs';

// 1. KafkaConsumerに必要な設定
const kafka = new Kafka({
    clientId: 'my-app', brokers: ['kafka01:9092', 'kafka02:9092', 'kafka03:9092'],
});

// 2. KafkaクラスタからMessageを受信（Consume）するオブジェクト生成
const consumer = kafka.consumer({
    groupId: 'FirstAppConsumerGroup',
})

const topicName = 'first-app'

const subscribe = async () => {
    try {
        await consumer.connect();
        // 3. 受信（subscribe）するTopicを登録
        await consumer.subscribe({topics: [topicName], fromBeginning: true})

        // 4. Messageを受信し、コンソールに表示する
        await consumer.run({
            autoCommit: false, eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
                try {
                    const key = message.key ? message.key.toString() : 'null';
                    const value = message.value.toString();
                    console.log(`key: ${key}, value: ${value}`);

                    // 5. 処理が完了したMessageのOffsetをCommitする
                    await consumer.commitOffsets([{
                        topic,
                        partition,
                        offset: (parseInt(message.offset, 10) + 1).toString()
                    }]);
                } catch (error) {
                    console.error(`Deserialization error: ${error.message}`);
                }
            }
        })

        for (let count = 0; count < 300; count++) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        // 6. KafkaConsumerをクローズして終了
        await consumer.disconnect();
    }
}

subscribe();

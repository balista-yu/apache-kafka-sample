import {Kafka} from 'kafkajs';

// KafkaJS v2.0.0 でパーティショニングのデフォルト動作が変更されたことで警告が表示される
// Producerの作成時にパーテーショナを選択することで回避できるが、一旦警告を抑止するようにしています
// @see https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner
process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1';

// 1. KafkaProducerに必要な設定
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka01:9092', 'kafka02:9092', 'kafka03:9092'],
});

// 2. KafkaクラスタにMessageを送信（produce）するオブジェクト生成
const producer = kafka.producer({allowAutoTopicCreation: true,});

const topicName = 'first-app'

const produce = async () => {
    try {
        await producer.connect();
        for (let i = 1; i <= 100; i++) {
            // 3. 送信するMessageを生成
            const message = {
                key: i.toString(),
                value: i.toString(),
            }
            const producerRecord = {
                topic: topicName,
                messages: [message]
            }

            // 4. Messageを送信し、Ackを受け取った時にpartition、offsetを確認
            const metadataRecords = await producer.send(producerRecord);
            metadataRecords.forEach(metadata => {
                console.log(`Success partition: ${metadata.partition}, offset: ${metadata.baseOffset}`)
            })
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        // 5. KafkaProducerをクローズして終了
        await producer.disconnect();
    }
}

produce();

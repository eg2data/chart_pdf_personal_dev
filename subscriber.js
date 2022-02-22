import amqp from 'amqplib/callback_api.js';
import {generateChart, generateFile, rsyncFile } from "./generateChart.js";

amqp.connect('amqp://localhost', (connectionError, connection) => {
    if(connectionError) {
        throw connectionError;
    }
    // Step 2: create channel
    connection.createChannel((channelError, channel) => {
        if(channelError) {
            throw channelError;
        }
        //Step 3: assert queue
        const queueName = "task_queue_4";
        channel.assertQueue(queueName, {
            durable: false
        });
        // Step 4: receive message
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

        // 여기서부터는, queue에 메시지가 있어야만 작동한다.
        // 그런데 pm2를 사용하면, 없어도 그냥.. 돈..다.
        channel.consume(queueName, async (message) => {
            console.log("test1")

            try {
                    if (message !== null) {
                        console.log(" [x] Received data");
                        const data = JSON.parse(message.content)
                        // clustering
                        const charts = await generateChart(data)
                        console.log('chart generated')
                        const pages = await generateFile(data, charts)
                        console.log(pages + ' files written')
                        // 여기서, rsync 명령어까지 순차적으로 사용될 수 있도록 할 생각.
                        // pm2 관련해서.. rsyncFile은 조건부로 돌려야할 것 같은데 음.
                        await rsyncFile()
                    } else {
                        console.log("empty queue")
                    }
                } catch(ex) {
                    console.log(ex);
                } finally {
                    channel.ack(message);
                }


        }, {
                noAck: false
            });
    });
});




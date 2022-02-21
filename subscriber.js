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

        channel.consume(queueName, async (message) => {
                try {
                    console.log(" [x] Received data");
                    const data = JSON.parse(message.content)
                    // clustering
                    const charts = await generateChart(data)
                    console.log('chart generated')
                    const pages = await generateFile(data, charts)
                    console.log(pages + ' files written')
                    // 여기서, rsync 명령어까지 순차적으로 사용될 수 있도록 할 생각.
                    await rsyncFile()
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




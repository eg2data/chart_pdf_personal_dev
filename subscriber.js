import amqp from 'amqplib/callback_api.js';
import {generateChart, generateFile } from "./generateChart.js";

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
        const queueName = process.env.QUEUE_NAME; // .env
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
                    // rsync - 사용안함
                    // await rsyncFile()
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




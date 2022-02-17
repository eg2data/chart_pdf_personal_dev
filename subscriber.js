import amqp from 'amqplib/callback_api.js';
import { generateChart} from "./generateChart.js";


export function subscribe() {
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
        // channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

            channel.consume(queueName, (message) => {
                // console.log(" [x] Received %s", message.content);
                const data = JSON.parse(message.content)
                generateChart(data)
            }, {
                noAck: true
            });

    });
});
}


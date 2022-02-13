import amqp from 'amqplib/callback_api.js';

// export function subscribe(callback) { // 비동기적 사고방식이 필요하다. 중요하다.
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
        const queueName = "task_queue_3";
        channel.assertQueue(queueName, {
            durable: false
        });
        // Step 4: receive message
        channel.prefetch(1); // 이게 맞는지 확인필요
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

        channel.consume(queueName, (message) => {
            console.log(" [x] Received %s", message.content);
            const data = JSON.parse(message.content)
            console.log(data);
            // callback(data); // 비동기적 사고방식이 필요하다. 중요하다.
        }, {
            noAck: true
        });
    });
});
// }

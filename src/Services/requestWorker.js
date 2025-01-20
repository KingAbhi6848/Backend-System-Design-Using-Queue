import amqp from 'amqplib';
import { configDotenv } from 'dotenv';
configDotenv();
export const startWorker = async (userId)=>{
  const connection = await amqp.connect(process.env.RABBITMQ_URI);
  const channel = await connection.createChannel();
  const queueName = `queue_${userId}`;
  await channel.assertQueue(queueName, { durable: true });
  channel.prefetch(1);
  channel.consume(queueName, async (msg) => {
      if (msg) {
          const request = JSON.parse(msg.content.toString());
          try {
              console.log('Processing:', request);
              await new Promise((resolve) => setTimeout(resolve, 2000)); 
              channel.ack(msg);
          } catch (error) {
              console.error('Error processing request:', error);
              channel.nack(msg, false, true);
          }
      }
  });
}
import amqp from 'amqplib';

export const queueService = async (userId, data)=>{

  try {
    
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
   
    const channel = await connection.createChannel();
  
    const queueName = `queue_${userId}`;
    await channel.assertQueue(queueName,{durable:true});
    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(data)));
    await channel.close();
    await connection.close();
  }
   catch (error) {
    console.log(error);
  }

}

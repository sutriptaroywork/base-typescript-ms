// import connectionEvent from '@/events/connection.event';
// import { ConsumerOptionsInteface, consumerOptions } from '@/connections/rabbitmq/rabbitmq.config';
// import { RabbitMQConnection, RabbitmqChannelClient } from '@buzzsports/sportsbuzz11-connection-provider';
// import { RabbitMqInstanceInterface } from '@/connections/rabbitmq/rabbitmq';

// /**
//  * Base class for RabbitMQ
//  * start consumer only once
//  */
// export default abstract class BaseMessageQueue {
//   private consumerOptions: ConsumerOptionsInteface;
//   private queueInstance: InstanceType<typeof RabbitMQConnection>;
//   private connection: RabbitMqInstanceInterface;
//   private channel: RabbitmqChannelClient;
//   private queueName: string;

//   /**
//    * setting values after rabbitmq successful RabbitMQ connection
//    * @param queueConnection RabbitMQ connection object
//    */
//   constructor(queueConnection: RabbitMqInstanceInterface, queueName: string) {
//     this.connection = queueConnection;
//     this.consumerOptions = consumerOptions;
//     this.queueName = queueName;

//     if (!this.connection || !this.queueName) {
//       throw new Error('Invalid parameters, RabbitMQ Connection and Queue Name is required');
//     }

//     // setting instance and channel after the connection
//     connectionEvent.on('ready', () => {
//       this.queueInstance = this.connection.getRabbitmqInstance();
//       this.channel = this.connection.getChannel();
//       this.acknowledge = this.connection.acknowledge;
//       // console.log(this.channel, this.rabbitmqInstance)
//       if (!this.connection || !this.channel || !this.queueInstance) throw new Error('Queue Publisher Connection Failed');
//     });
//   }

//   /**
//    * Publishing data to the Queue
//    * @param {Object} payload Object data to be published
//    */
//   publish = (payload: any): void => {
//     if (!this.connection || !this.channel || !this.queueInstance) throw new Error('Queue Publisher Connection Failed');
//     this.queueInstance.publish(this.channel, this.queueName, payload);
//   };

//   /**
//    * Consumer of the Queue
//    * Must be initialized after Successful connections
//    * @param {function} callback callback function which will get triggered when consumer gets data
//    * return data in callback is in raw format
//    */
//   consume = (callback: (consumedData: any) => void): void => {
//     connectionEvent.on('ready', () => {
//       if (this.connection && this.channel && this.queueInstance) {
//         console.log(`#####STARTED CONSUMING ${this.queueName} QUEUE#####`);
//         this.queueInstance.consume(this.channel, this.queueName, callback, this.consumerOptions);
//       }
//     });
//   };

//   /**
//    * for acknowledging, pass raw data in the acknowledge function
//    */
//   acknowledge = (data: any) => {
//     if (this.channel && !consumerOptions.noAck) {
//       this.channel.ack(data);
//     }
//   };

//   /**
//    * Return Queue name
//    * @returns Queue name
//    */
//   getQueueName = () => {
//     return this.queueName;
//   };
// }

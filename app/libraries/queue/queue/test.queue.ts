import BaseMessageQueue from '../base.queue';
import QueueInstance from '@/connections/rabbitmq/rabbitmq';

export class TestQueue extends BaseMessageQueue {
  constructor() {
    super(QueueInstance, process.env.TEST_QUEUE || 'TEST_QUEUE');
  }
}

// new TestQueue().consume(console.log);

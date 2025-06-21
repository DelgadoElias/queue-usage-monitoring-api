import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('monitoring')
export class MonitoringController {
  constructor(
    @InjectQueue('api-usage-queue') private readonly usageQueue: Queue,
  ) {}

  @Post('record')
  async record(
    @Body() data: { userId: string; apiName: string; origin: string },
  ) {
    await this.usageQueue.add('record-usage', data);
    return { message: 'Uso encolado' };
  }
}

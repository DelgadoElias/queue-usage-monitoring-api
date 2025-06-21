import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MonitoringProcessor } from 'src/monitoring/monitoring.processor';
import { MonitoringService } from 'src/monitoring/monitoring.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT ?? '0'),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'api-usage-monitoring',
    }),
  ],
  providers: [MonitoringProcessor, MonitoringService],
})
export class QueueModule {}

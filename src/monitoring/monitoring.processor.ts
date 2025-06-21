import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MonitoringService } from '../monitoring/monitoring.service';

@Processor('api-usage-queue')
export class MonitoringProcessor {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Process()
  async handle(job: Job) {
    const { userId, apiName, origin } = job.data;
    await this.monitoringService.recordUsage({ userId, apiName, origin });
  }
}

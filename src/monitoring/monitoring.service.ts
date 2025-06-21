import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MonitoringService {
  private prisma = new PrismaClient();

  public async recordUsage(data: {
    userId: string;
    apiName: string;
    origin: string;
  }) {
    const { apiName, origin, userId } = data;
    const config = await this.prisma.apiConfig.findFirst({
      where: {
        apiName,
      },
    });
    if (!config) {
      throw new Error(`No config found for ${apiName}`);
    }
    const cost = config.costPerCall;
    const usage = await this.prisma.apiUsage.create({
      data: {
        userId: userId,
        apiName,
        cost,
        origin,
        calledAt: new Date(),
      },
    });

    return HttpStatus.OK;
  }
}

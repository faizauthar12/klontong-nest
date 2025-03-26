import { Controller, Get, Query, Res } from '@nestjs/common';
import { LogService } from './log.service';
import { Response } from 'express';

@Controller('log')
export class LogController {
  constructor(private logService: LogService) {}

  @Get()
  async findAll(
    @Res() response: Response,
    @Query('page') page: number = 1,
    @Query('per_page') per_page: number = 10,
  ) {
    const logsResponse = await this.logService.findAll(page, per_page);

    response.status(200).json({
      status: 200,
      message: 'Logs have been retrieved successfully',
      data: logsResponse.data,
      total: logsResponse.total,
      page: page,
      per_page: per_page,
    });
  }
}

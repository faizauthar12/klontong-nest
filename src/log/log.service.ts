import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogSchema } from './log.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogSchema)
    private logRepository: Repository<LogSchema>,
  ) {}

  async create(createLogDto: CreateLogDto): Promise<LogSchema> {
    createLogDto.created_at = new Date();
    const newLog = this.logRepository.create(createLogDto);

    return await this.logRepository.save(newLog);
  }

  async findAll(
    page: number,
    per_page: number,
  ): Promise<{ data: LogSchema[]; total: number }> {
    const queryBuilder = this.logRepository.createQueryBuilder('logs');
    queryBuilder.orderBy('logs.created_at', 'DESC');

    const total = await queryBuilder.getCount();

    const skip = (page - 1) * per_page;
    queryBuilder.skip(skip).take(per_page);

    const logs = await queryBuilder.getMany();

    return { data: logs, total };
  }
}

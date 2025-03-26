import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { CategorySchema } from './category.entity';
import { LogService } from '../log/log.service';
import { CreateLogDto } from '../log/dto/create-log.dto';

@EventSubscriber()
export class CategorySubscriber
  implements EntitySubscriberInterface<CategorySchema>
{
  constructor(
    dataSource: DataSource,
    private logService: LogService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return CategorySchema;
  }

  async afterInsert(event: InsertEvent<CategorySchema>) {
    const logDto = new CreateLogDto();
    logDto.module = 'Category';
    logDto.event = 'INSERT';
    logDto.payload = JSON.stringify(event.entity);

    try {
      await this.logService.create(logDto);
    } catch (error) {
      console.error('Error creating log:', error);
    }
  }

  async afterUpdate(event: UpdateEvent<CategorySchema>) {
    const logDto = new CreateLogDto();
    logDto.module = 'Category';
    logDto.event = 'UPDATE';
    logDto.payload = JSON.stringify(event.entity);

    try {
      await this.logService.create(logDto);
    } catch (error) {
      console.error('Error creating log:', error);
    }
  }

  async afterRemove(event: RemoveEvent<CategorySchema>) {
    const logDto = new CreateLogDto();
    logDto.module = 'Category';
    logDto.event = 'DELETE';
    logDto.payload = JSON.stringify(event.entity);

    try {
      await this.logService.create(logDto);
    } catch (error) {
      console.error('Error creating log:', error);
    }
  }
}

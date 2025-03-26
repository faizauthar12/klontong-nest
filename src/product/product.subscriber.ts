import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { ProductSchema } from './product.entity';
import { LogService } from '../log/log.service';
import { CreateLogDto } from '../log/dto/create-log.dto';

@EventSubscriber()
export class ProductSubscriber
  implements EntitySubscriberInterface<ProductSchema>
{
  constructor(
    dataSource: DataSource,
    private logService: LogService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return ProductSchema;
  }

  async afterInsert(event: InsertEvent<ProductSchema>) {
    const logDto = new CreateLogDto();
    logDto.module = 'Product';
    logDto.event = 'INSERT';
    logDto.payload = JSON.stringify(event.entity);

    try {
      await this.logService.create(logDto);
    } catch (error) {
      console.error('Error creating log:', error);
    }
  }

  async afterUpdate(event: UpdateEvent<ProductSchema>) {
    const logDto = new CreateLogDto();
    logDto.module = 'Product';
    logDto.event = 'UPDATE';
    logDto.payload = JSON.stringify(event.entity);

    try {
      await this.logService.create(logDto);
    } catch (error) {
      console.error('Error creating log:', error);
    }
  }

  async afterRemove(event: RemoveEvent<ProductSchema>) {
    const logDto = new CreateLogDto();
    logDto.module = 'Product';
    logDto.event = 'DELETE';
    logDto.payload = JSON.stringify(event.entity);

    try {
      await this.logService.create(logDto);
    } catch (error) {
      console.error('Error creating log:', error);
    }
  }
}

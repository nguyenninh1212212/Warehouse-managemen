import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { OrderEnum } from 'src/enums/order.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  status: OrderEnum;
}

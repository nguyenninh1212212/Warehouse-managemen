import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

class OrderItemDto {
  @ApiProperty({ example: '65f1234567890abcdef12345' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @IsNotEmpty()
  items: OrderItemDto[];
  @IsNotEmpty()
  buyerId: string;
}

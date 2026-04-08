import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateBuyerDto {
  @ApiProperty({
    example: 'Nguyễn An Ninh',
    description: 'Họ và tên khách hàng',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'ninh@example.com',
    description: 'Email khách hàng',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '0987654321',
    description: 'Số điện thoại',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;
}

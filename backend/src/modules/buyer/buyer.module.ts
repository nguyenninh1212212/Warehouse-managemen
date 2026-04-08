import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Buyer, BuyerSchema } from './schemas/buyer.schema';
import { RolesModule } from '../auth/roles/roles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Buyer.name, schema: BuyerSchema }]),
    RolesModule,
  ],
  controllers: [BuyerController],
  providers: [BuyerService],
  exports: [BuyerService],
})
export class BuyerModule {}

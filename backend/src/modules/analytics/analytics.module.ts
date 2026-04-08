import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AiModule } from '../ai/ai.module';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { RolesModule } from '../auth/roles/roles.module';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [AiModule, ProductsModule, OrdersModule, RolesModule],
})
export class AnalyticsModule {}

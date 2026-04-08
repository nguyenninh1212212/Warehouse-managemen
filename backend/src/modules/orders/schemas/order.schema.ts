import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { OrderEnum } from 'src/enums/order.enum';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' })
  buyerId: string;

  @Prop([
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number,
    },
  ])
  items: any[];

  @Prop()
  totalAmount: number;

  @Prop({ default: OrderEnum.PENDING })
  status: OrderEnum;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

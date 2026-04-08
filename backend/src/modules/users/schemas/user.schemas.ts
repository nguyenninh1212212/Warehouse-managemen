import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleEnum } from 'src/modules/auth/roles/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    required: true,
    select: false,
  })
  password_key: string;

  @Prop()
  refreshToken: string;

  @Prop()
  about: string;

  @Prop()
  birthday: Date;

  @Prop()
  height: number;

  @Prop()
  weight: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

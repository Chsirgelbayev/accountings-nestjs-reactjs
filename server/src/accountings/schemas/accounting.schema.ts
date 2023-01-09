import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { defaultUserId, refUser } from '../constants/accountings.constants';

export type IAccounting = Accounting & Document;

@Schema({ timestamps: true })
export class Accounting {
    @Prop({ required: true })
    body: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true, default: new Date() })
    date: Date;

    @Prop({ required: true, default: defaultUserId, ref: refUser })
    userId: mongoose.Schema.Types.ObjectId;
}

export const accountingsSchema = SchemaFactory.createForClass(Accounting);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs';
import { NextFunction } from 'express';
import { Document } from 'mongoose';
import { Accounting } from '../accountings/accountings.schema';

export type IUser = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, select: false })
    password: string;

    comparePassword(password: string) {
        return bcryptjs.compareSync(password, this.password);
    }
}

export const usersSchema = SchemaFactory.createForClass(User);

usersSchema.pre('save', async function (next: NextFunction) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);

    next();
});

usersSchema.pre('remove', async function (next: NextFunction) {
    await this.$model(Accounting.name).deleteMany({ userId: this.id });

    next();
});

usersSchema.loadClass(User);
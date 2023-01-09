import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs';
import { NextFunction } from 'express';
import { Document } from 'mongoose';
import { Accounting } from '../../accountings/schemas/accounting.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    readonly id: string;

    @Prop({ required: true })
    login: string;

    @Prop({ required: true, select: false })
    password: string;

    comparePassword(password: string): boolean {
        return bcryptjs.compareSync(password, this.password);
    }
}

export const usersSchema = SchemaFactory.createForClass(User);

usersSchema.pre('save', async function (next: NextFunction): Promise<void> {
    if (!this.isModified('password')) {
        return next();
    }

    const salt: string = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);

    next();
});

usersSchema.pre('remove', async function (next: NextFunction): Promise<void> {
    await this.$model(Accounting.name).deleteMany({ userId: this.id });

    next();
});

usersSchema.loadClass(User);

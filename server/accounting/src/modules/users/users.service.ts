import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { messages } from 'src/common/data/messages';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, User } from './users.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly usersSchema: Model<IUser>
    ) {}

    async getAllUsers(): Promise<User[]> {
        const users = await this.usersSchema.find();

        if (!users.length) {
            throw new NotFoundException(messages.MESG_USERS_NOT_FOUND);
        }

        return users;
    }

    async getUser(id: string): Promise<User> {
        const user = await this.usersSchema.findById(id);

        if (!user) {
            throw new NotFoundException(messages.MESG_USER_NOT_FOUND);
        }

        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
        const user = await this.usersSchema.findByIdAndUpdate(
            id,
            updateUserDto
        );

        if (!user) {
            throw new NotFoundException(messages.MESG_USER_NOT_FOUND);
        }

        return user;
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.usersSchema.findById(id);

        if (!user) {
            throw new NotFoundException(messages.MESG_USER_NOT_FOUND);
        }

        await user.remove();
    }
}

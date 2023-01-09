import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument, User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly _usersSchema: Model<UserDocument>
    ) {}

    public async getAllUsers(): Promise<User[]> {
        const users: User[] = await this._usersSchema.find();

        if (!users.length) {
            throw new NotFoundException('');
        }

        return users;
    }

    public async getUser(id: string): Promise<User> {
        const user: User = await this._usersSchema.findById(id);

        if (!user) {
            throw new NotFoundException('');
        }

        return user;
    }

    public async updateUser(
        updateUserDto: UpdateUserDto,
        id: string
    ): Promise<User> {
        const user: User = await this._usersSchema.findByIdAndUpdate(
            id,
            updateUserDto
        );

        if (!user) {
            throw new NotFoundException('');
        }

        return user;
    }

    public async deleteUser(id: string): Promise<void> {
        const user = await this._usersSchema.findById(id);

        if (!user) {
            throw new NotFoundException('');
        }

        await user.remove();
    }
}

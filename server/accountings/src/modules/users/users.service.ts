import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExceptionMessage } from 'src/common/enums/exception-message.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, User } from './users.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly usersSchema: Model<IUser>
    ) {}

    public async getAllUsers(): Promise<User[]> {
        const users: User[] = await this.usersSchema.find();

        if (!users.length) {
            throw new NotFoundException(ExceptionMessage.USERS_NOT_FOUND);
        }

        return users;
    }

    public async getUser(id: string): Promise<User> {
        const user: User = await this.usersSchema.findById(id);

        if (!user) {
            throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
        }

        return user;
    }

    public async updateUser(
        updateUserDto: UpdateUserDto,
        id: string
    ): Promise<User> {
        const user: User = await this.usersSchema.findByIdAndUpdate(
            id,
            updateUserDto
        );

        if (!user) {
            throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
        }

        return user;
    }

    public async deleteUser(id: string): Promise<void> {
        const user = await this.usersSchema.findById(id);

        if (!user) {
            throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
        }

        await user.remove();
    }
}

import { Injectable } from '@nestjs/common';
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'ledinhnhat1102',
            password: 'nhat123',
        },
        // Thêm người dùng khác nếu cần
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}

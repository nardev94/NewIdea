import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(userData: Partial<UserEntity>): Promise<UserEntity> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async findById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { id } });
    }
}

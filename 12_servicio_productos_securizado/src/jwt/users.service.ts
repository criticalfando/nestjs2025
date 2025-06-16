import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './usersDto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
/*    private readonly users = [
    { id: 1, username: 'admin', password: 'admin', role: 'admin' },
    { id: 2, username: 'user', password: 'user', role: 'user' },
    { id: 3, username: 'guest', password: 'guest', role: 'user'},
    { id: 4, username: 'nando', password: 'nando', role: 'admin'}
  ]; */

  constructor(@InjectRepository(User)private usersRepository: Repository<User>) {}

  async findByUsername(username:string):Promise<User>{
    return this.usersRepository.findOne({ where: { username } });
  }

}

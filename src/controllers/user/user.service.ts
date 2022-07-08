import {HttpStatus, Injectable} from '@nestjs/common';
import { UserRepository } from 'src/modules/database/repositories/userRepository.service';
@Injectable()
export class UserService {
    // private readonly logger = new WinstonLogger(AuthService.name);

    constructor(
        private readonly userRepository: UserRepository
    ) {}

     async getAll(id){
        const users = await this.userRepository.getAll(id)
        return users;
     }

     async findById(id:number){
        const user = await this.userRepository.findById(id)
        return user;
     }

}
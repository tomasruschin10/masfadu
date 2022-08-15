import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { UserSubject } from '../../../models/userSubject.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class UserSubjectRepository {
    constructor(
        @Inject('USER_SUBJECT_REPOSITORY')
        private userSubjectsRepository: Repository<UserSubject>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save userSubject
        const userSubject = await this.userSubjectsRepository.create(request)
        await this.userSubjectsRepository.save(userSubject)
        
        //return
        return userSubject
    }

    async getAll(): Promise<UserSubject[] | string> {
        return await this.userSubjectsRepository.find();
    }


    async getById(id): Promise<UserSubject | string> {
        const userSubject = await this.userSubjectsRepository.findOne(id)
        if (!userSubject) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return userSubject;
    }


    async update(id: number, request): Promise<any> {
        let userSubject = await this.userSubjectsRepository.findOne(id);
        if (!userSubject)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        userSubject = await this.sharedService.updateObject(userSubject, request)

        await this.userSubjectsRepository.save(userSubject);

        return userSubject;
    }

    async delete(id): Promise<any> {
        const userSubject = await this.userSubjectsRepository.findOne(id);
        if (!userSubject)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.userSubjectsRepository.delete(userSubject.id);

        return userSubject;

    }

}
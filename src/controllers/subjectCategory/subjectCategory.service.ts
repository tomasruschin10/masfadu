import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { UserSubjectRepository } from 'src/modules/database/repositories/userSubjectRepository.service';
import { SubjectCategoryRepository } from '../../modules/database/repositories/subjectCategoryRepository.service';
@Injectable()
export class SubjectCategoryService {

    constructor(
        private readonly subjectCategoryRepository: SubjectCategoryRepository,
        private readonly userSubjectRepository: UserSubjectRepository
    ) {}

    async create(request: any){

      const subjectCategory = await this.subjectCategoryRepository.create(request)
      if (!subjectCategory) throw new BadRequestException(['incorrect data'])     

      return subjectCategory;
   }

   async getAll(data, id){
      let subjectCategorys = await this.subjectCategoryRepository.getAll(data, id)
      if(data.userData.userRole[0].role_id == 2){
         subjectCategorys = await this.addStudentExtraInfo(data.userData, subjectCategorys)
      }
      return subjectCategorys;
   }

   async getById(id:number){
      const subjectCategory = await this.subjectCategoryRepository.getById(id)
      return subjectCategory;
   }

   async update(id:number, request: any){

      const subjectCategory = await this.subjectCategoryRepository.update(id, request)

      return subjectCategory;
   }

   async delete(id: number){
      const subjectCategory = await this.subjectCategoryRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

   async addStudentExtraInfo(userData, data) {
      let res = {data: null, total: null, on: null, prom: null}
      let on = 0
      let points = 0
      let count = 0
      let total = 0
      
      let userSubjects = await this.userSubjectRepository.getAll(userData.id, userData.career_id)
         for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].subject.length; j++) {
               total++
               data[i].subject[j].userSubject = userSubjects.find(a => a.subject_id == data[i].subject[j].id)
               if (data[i].subject[j].userSubject) {
                  if(data[i].subject[j].userSubject.score>=4) {
                     on++
                  }
                  if(data[i].subject[j].userSubject.score) {
                     count++
                     points += data[i].subject[j].userSubject.score
                  }
               }
            }
         }
      
      if (points && count) {
         res.prom = parseFloat((points / count).toFixed(2))   
      }
      res.total = total
      res.on = on
      res.data = data
      return res
   }

     

}
import { HttpException, HttpService, HttpStatus, Injectable } from "@nestjs/common"
import { UserRepository } from "../database/repositories/userRepository.service"

@Injectable()
export class SharedService {

    constructor(
        private readonly httpService: HttpService,
        private readonly userRepository: UserRepository,

    ) { }

    toArray(data: Object): Array<Object> {
        let keys = Object.keys(data)
        let res = []

        for (let item of keys) {
            data[item].id = item
            res.push(data[item])
        }
        return res
    }

    async updateObject(object, request) {
        Object.keys(object).map(key => {
            if (request[key] || request[key] == 0) {
                if (request[key] != '') {
                    object[key] = request[key]
                }
            }
        })

        return object
    }

    async sendNotification(request, userData?) {
        // let userInfo: any = jwt.decode(bearer.substring(7))
        let title = request.title
        let user_to = request.user_to
        let user = userData ? userData : await this.userRepository.findById(user_to)
        // if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        // if (!user.device_token) throw new HttpException('User device token not found', HttpStatus.NOT_FOUND)
        if (!user) return 'User not found'
        if (!user.device_token) return 'User device token not found'
        const requestConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const body = {
            "to": user.device_token,
            "title": title,
            "body": request.message.substring(0, 100),
            "sound": "default"
        }
        await this.httpService.post(`https://exp.host/--/api/v2/push/send`, body, requestConfig).toPromise().then(async (v) => console.log(true)).catch((err) => console.log(false))
        return true
    }

}



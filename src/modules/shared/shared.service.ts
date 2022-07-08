import { Injectable } from "@nestjs/common"

@Injectable()
export class SharedService {

    toArray(data: Object): Array<Object> {
        let keys = Object.keys(data)
        let res = []

        for (let item of keys) {
            data[item].id = item
            res.push(data[item])
        }
        return res
    }

    async updateObject(object, request){
        Object.keys(object).map(key => {
            if(request[key] || request[key] == 0){
                if(request[key] != ''){
                    object[key] = request[key]
                }
            } 
        })

        return object
    }

}

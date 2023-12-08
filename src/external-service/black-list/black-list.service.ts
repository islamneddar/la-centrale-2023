import {IBlackListService} from "@/external-service/black-list/black-list-service-interface";

export class BlackListService implements IBlackListService{

    async isRegisterNumberBlocked(registerNumber: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(registerNumber === "AA123AA"){
                    resolve(true)
                } else resolve(false)
            }, 50)
        })
    }
}
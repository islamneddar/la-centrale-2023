import {Vehicle} from "@/domain/annonce/annonce.dto";
import {IQuotationService} from "@/external-service/quotation/quotation-service-interface";

export class QuotationService implements IQuotationService{
    public async getQuotation(vehicul : Vehicle): Promise<number> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(35000)
            }, 50)
        })
    }
}
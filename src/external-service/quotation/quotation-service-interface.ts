import {Vehicle} from "@/domain/annonce/annonce.dto";

export interface IQuotationService {
    getQuotation(vehicul : Vehicle): Promise<number>;
}
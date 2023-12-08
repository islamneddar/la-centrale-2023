import {AnnonceService} from "@/domain/annonce/annonce.service";
import {QuotationService} from "@/external-service/quotation/quotation.service";
import {IBlackListService} from "@/external-service/black-list/black-list-service-interface";
import {BlackListService} from "@/external-service/black-list/black-list.service";
import {IQuotationService} from "@/external-service/quotation/quotation-service-interface";

export class ExternalServiceDi {
    private readonly quotationService: IQuotationService;
    private readonly blackListService: IBlackListService;

    constructor() {
        this.quotationService = new QuotationService();
        this.blackListService = new BlackListService();
    }

    public getQuotationService(): IQuotationService {
        return this.quotationService;
    }

    public getBlackListService(): IBlackListService {
        return this.blackListService;
    }
}

export const externalServiceDI = new ExternalServiceDi();
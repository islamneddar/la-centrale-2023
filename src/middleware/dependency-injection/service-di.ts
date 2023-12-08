import {AnnonceService} from "@/domain/annonce/annonce.service";
import {ExternalServiceDi, externalServiceDI} from "@/middleware/dependency-injection/external-service-di";

export class ServiceDi {
    private readonly annonceService: AnnonceService;

    constructor(readonly externalServices: ExternalServiceDi) {
        this.annonceService = new AnnonceService(
            externalServices.getQuotationService(),
            externalServices.getBlackListService()
        );
    }

    public getAnnonceService(): AnnonceService {
        return this.annonceService;
    }
}

export const serviceDi = new ServiceDi(externalServiceDI);
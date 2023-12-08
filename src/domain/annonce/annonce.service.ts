import {CreateAnnonceInput} from "@/domain/annonce/annonce.dto";
import {AnnonceRuleScamType} from "@/domain/annonce/annonce.enum";
import {QuotationService} from "@/external-service/quotation/quotation.service";
import {calculateAlphanumericRateInString, calculateNumericRateInString, inPricingInRange} from "@/util";
import {IBlackListService} from "@/external-service/black-list/black-list-service-interface";

export class AnnonceService {
    constructor(
        private readonly quotationService: QuotationService,
        private readonly blackListService: IBlackListService
    ) {}
    async validateScam(annonce : CreateAnnonceInput) {
        const rules :string[] = []
        const firstName = annonce.contacts.firstName;
        if(firstName.length <= 2) {
            rules.push(AnnonceRuleScamType.RULE_FIRST_NAME_LENGTH)
        }

        const lastName = annonce.contacts.lastName;
        if(lastName.length <= 2) {
            rules.push(AnnonceRuleScamType.RULE_LAST_NAME_LENGTH)
        }

        const emailPrefixPart = annonce.contacts.email.split("@")[0];
       const proportionAlphanumeric = calculateAlphanumericRateInString(emailPrefixPart)
        if(proportionAlphanumeric <= 0.7) {
            rules.push(AnnonceRuleScamType.RULE_ALPHA_RATE)
        }

        const proportionNumber = calculateNumericRateInString(emailPrefixPart);
        if(proportionNumber >= 0.3) {
            rules.push(AnnonceRuleScamType.RULE_NUMBER_RATE)
        }

        const quotation = await this.quotationService.getQuotation(annonce.vehicle);
        const isPriceInRange = inPricingInRange({
            quotation,
            price : annonce.price,
            max : 20,
            min : 20
        })

        if(!isPriceInRange) {
            rules.push(AnnonceRuleScamType.RULE_PRICE_QUOTATION_RATE)
        }

        const registerNumber = annonce.vehicle.registerNumber;
        const isBlacklisted = await this.blackListService.isRegisterNumberBlocked(registerNumber);
        if (isBlacklisted) {
            rules.push(AnnonceRuleScamType.RULE_REGISTER_NUMBER_BLOCK_LIST)
        }
        return rules;
    }


}
import {ServiceDi} from "@/middleware/dependency-injection/service-di";
import {ExternalServiceDi} from "@/middleware/dependency-injection/external-service-di";
import * as assert from "assert";
import {AnnonceRuleScamType} from "@/domain/annonce/annonce.enum";
import fakerModule from "faker";
import {CreateAnnonceInput} from "@/domain/annonce/annonce.dto";

const faker = fakerModule

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
}

// mock quotation service and black list service

const annonce = {
    contacts : {
        firstName : "chris",
        lastName : "dupony",
        email : "test@gmail.com",
        phone : {
            value : "06070890"
        }
    },
    creationDate : "2020-01-09T09:02:22:610Z",
    price : 42000,
    publicationOptions : ["STRENGTHS", "BOOST_VO"],
    refernce : "B3005362",
    vehicle: {
        make : "HONDA",
        model : "CR-V",
        version : "IV.....",
        category : "SUV....",
        registerNumber : "AA123AB",
        mileage : 100000
    }
}



describe("AnnonceService", () => {
    let services;
    let externalServices;
    let annonceTest : any = {};

    beforeEach(() => {
        externalServices = new ExternalServiceDi();
        services = new ServiceDi(externalServices);
        annonceTest = deepClone<CreateAnnonceInput>(annonce);

    })

    describe("when the annonce is not a scam", () => {
        it("should return an empty array", async () => {
            const rules = await services.getAnnonceService().validateScam(annonceTest);
            assert.deepStrictEqual(rules, [])
        })
    })

    describe("when the annonce is a scam", () => {
        describe("the first name has 2 or less character", () => {
            it("should return the rule RULE_FIRST_NAME_LENGTH", async () => {
                annonceTest.contacts.firstName = faker.random.alphaNumeric(2);
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [AnnonceRuleScamType.RULE_FIRST_NAME_LENGTH])
            })

            it('should return the rule RULE_FIRST_NAME_LENGTH', async () => {
                annonceTest.contacts.firstName = faker.random.alphaNumeric(1);
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [AnnonceRuleScamType.RULE_FIRST_NAME_LENGTH])
            });
        })


        describe("the last name has 2 or less character", () => {
            it("should return the rule RULE_LAST_NAME_LENGTH when last name have 2 characters", async () => {
                annonceTest.contacts.lastName = faker.random.alphaNumeric(2);
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [AnnonceRuleScamType.RULE_LAST_NAME_LENGTH])
            })

            it('should return the rule RULE_LAST_NAME_LENGTH when last name have 1 character', async () => {
                annonceTest.contacts.lastName = faker.random.alphaNumeric(1);
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [AnnonceRuleScamType.RULE_LAST_NAME_LENGTH])
            });
        })

        describe("the email prefix part has less than or equal 70% of alphanumeric characters", () => {
            it("should return the rule RULE_ALPHA_RATE when it equal 70%", async () => {
                annonceTest.contacts.email = "11rrtte,,,@gmail.com";
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [AnnonceRuleScamType.RULE_ALPHA_RATE])
            })

            it("should return the rule RULE_ALPHA_RATE when it less than 70%", async () => {
                annonceTest.contacts.email = "11rrtt+,,,@gmail.com";
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [AnnonceRuleScamType.RULE_ALPHA_RATE])
            })

            it("should not return the rule RULE_ALPHA_RATE when it greater than 70%", async () => {
                annonceTest.contacts.email = "email-email@gmail.com";
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [])
            })
        })

        describe("the email prefix part has more than or equal 30% of numeric characters", () => {
            it("should return the rule RULE_NUMBER_RATE when it equal 30%", async () => {
                annonceTest.contacts.email = "112abcdzee@gmail.com";
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [AnnonceRuleScamType.RULE_NUMBER_RATE])
            })

            it("should return the rule RULE_NUMBER_RATE when it greater than 30%", async () => {
                annonceTest.contacts.email = "a1d1g1g1k4@gmail.com";
                const rules = await services.getAnnonceService().validateScam(annonceTest);
                assert.deepStrictEqual(rules, [AnnonceRuleScamType.RULE_NUMBER_RATE])
            })

            it("should not return the rule RULE_NUMBER_RATE when it less than 30%", async () => {
                    annonceTest.contacts.email = "test15test@gmail.com"
                    const rules = await services.getAnnonceService().validateScam(annonceTest);
                    assert.deepStrictEqual(rules, [])
                }
            )
        })

    })


})


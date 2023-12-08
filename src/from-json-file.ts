import fs from "fs"
import {serviceDi} from "@/middleware/dependency-injection/service-di";
import {CreateAnnonceInput} from "@/domain/annonce/annonce.dto";

(() => {
    fs.readFile('./src/data.json', 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        const annonceInput = JSON.parse(data) as CreateAnnonceInput;
        // Validate input is not done as we assume that the input is valid
        const rules = await serviceDi.getAnnonceService().validateScam(annonceInput);
        console.log({
            reference: annonceInput.refernce,
            scam: rules.length > 0,
            rules
        })
    });
})()
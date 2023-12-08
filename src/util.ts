export const inPricingInRange = (params : {
    price : number,
    quotation : number,
    max : number,
    min : number
}) => {
    if(params.max < 0 || params.min < 0) throw new Error("max and min must be positive")
    if(params.max > 100 || params.min > 100) throw new Error("max and min must be lower than 100")

    const lowerPriceRange = params.quotation * ((100 - params.min) / 100);
    const upperPriceRange = params.quotation * ((100 + params.max) / 100);

    return params.price >= lowerPriceRange && params.price <= upperPriceRange;
}


export const calculateNumericRateInString = (str : string) => {
    const strLength = str.length;
    const numberNumericPrefix = str.replace(/[^0-9]/g, "").length;
    return numberNumericPrefix / strLength;
}

export const calculateAlphanumericRateInString = (str : string) => {
    const strLength = str.length;
    const numberAlphanumericPrefix = str.replace(/[^a-zA-Z0-9]/g, "").length;
    return numberAlphanumericPrefix / strLength;
}
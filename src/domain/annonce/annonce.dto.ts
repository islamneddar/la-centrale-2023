import {
    IsArray,
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsPhoneNumber,
    IsString,
    ValidateNested
} from "class-validator";

class Contact {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('FR')
    phone: { value: string };
}

export class Vehicle {
    @IsNotEmpty()
    @IsString()
    make: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsString()
    version: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    registerNumber: string;

    @IsNotEmpty()
    @IsNumber()
    mileage: number;
}

export class CreateAnnonceInput{
    @ValidateNested()
    @IsNotEmpty()
    contacts : Contact;

    @IsNotEmpty()
    @IsDateString()
    creationDate: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsArray()
    publicationOptions: string[];

    @IsNotEmpty()
    @IsString()
    refernce: string;

    @ValidateNested()
    @IsNotEmpty()
    vehicle: Vehicle;
}
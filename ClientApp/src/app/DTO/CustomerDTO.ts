import { FormGroup } from "@angular/forms";

export class CustomerDto {
    country_code: string;
    country_code_alpha: string;
    country_name: string;
    firstname_ascii: string;
    firstname_country_frequency: string;
    firstname_country_rank: string;
    id: string;
    lastname_ascii: string;
    lastname_country_frequency: string;
    lastname_country_rank: string;
    phone_Number: string;
    primary_language: string;
    primary_language_code: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    balance: number;
    initials: string;
    currency: string;
    password: string;
    salutation: string;

    constructor(form: FormGroup, id: string) {
        const customer = form.value;

        this.country_code = customer.countryCode || '';
        this.country_code_alpha = customer.countryCodeAlpha || '';
        this.country_name = customer.countryName || '';
        this.firstname_ascii = customer.firstNameAscii || '';
        this.firstname_country_frequency = customer.firstNameCountryFrequency || '';
        this.firstname_country_rank = customer.firstNameCountryRank || '';
        this.id = id;
        this.lastname_ascii = customer.lastNameAscii || '';
        this.lastname_country_frequency = customer.lastNameCountryFrequency || '';
        this.lastname_country_rank = customer.lastNameCountryRank || '';
        this.phone_Number = customer.phoneNumber || '';
        this.primary_language = customer.primaryLanguage || '';
        this.primary_language_code = customer.primaryLanguageCode || '';
        this.firstname = customer.firstName || '';
        this.lastname = customer.lastName || '';
        this.email = customer.email || '';
        this.gender = customer.gender || '';
        this.balance = customer.balance || 0;
        this.initials = customer.initials || '';
        this.currency = customer.currency || '';
        this.password = customer.password || '';
        this.salutation = customer.salutation || '';
    }
}
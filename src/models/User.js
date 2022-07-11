import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        // Individual name. <= 100 characters Match pattern: [a-zA-Z]
        type: String,
        required: [true, "name is requerid"],
        validate: [/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "invalid name"],
        min: [3, "the name must be 3 or more characters long"],
        max: [100, "name must have less than 100 characters"]
    },
    motherName: {
        // Individual's mother name. This field can be filled with "DESCONHECIDO" in cases where the mother is unknown. <= 80 characters' Match pattern: [a-zA-Z]
        type: String,
        required: [true, "mother name is requerid"],
        validate: [/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "invalid name"],
        min: [3, "the mother name must be 3 or more characters long"],
        max: [80, "the mother name must have less than 100 characters"]
    },
    birthDate: {
        // Individual's date of birth (ISO 8601 format). >= 10 characters <= 10 characters
        type: String,
        required: [true, "birthdate is requerid"],
        validate: [/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, "invalid date, the format must be yyyy-mm-dd"],
        min: [10, "invalid date, the format must be yyyy-mm-dd"],
        max: [10, "invalid date, the format must be yyyy-mm-dd"]
    },
    gender: {
        // Individual gender. <= 1 characters Allowed values: M F O N
        type: String,
        validate: [/[MFON]/, "invalid entry, the system only allow M, F, O AND N"],
        max: [1, "only one character is allowed"]
    },
    document: {
        // Individual's national registration ID.' >= 11 characters<= 11 characters Match pattern: [0-9]
        type: String,
        required: [true, "national registration id is required"],
        // CPF validation function
        validate: [function(cpf){	
            if (typeof cpf !== "string") return false
            cpf = cpf.replace(/[\s.-]*/igm, '')
            if (
                !cpf ||
                cpf.length != 11 ||
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999" 
            ) {
                return false
            }
            var sum = 0
            var remain
            for (var i = 1; i <= 9; i++) 
                sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
            remain = (sum * 10) % 11
            if ((remain == 10) || (remain == 11))  remain = 0
            if (remain != parseInt(cpf.substring(9, 10)) ) return false
            sum = 0
            for (var i = 1; i <= 10; i++) 
                sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
            remain = (sum * 10) % 11
            if ((remain == 10) || (remain == 11))  remain = 0
            if (remain != parseInt(cpf.substring(10, 11) ) ) return false
            return true
        }, "invalid national registration"]
    },
    emancipatedMinor: {
        // Emancipated minor registration.
        type: Boolean
    },
    idNumber: {
        // Individual's state registration ID.' <= 18 characters
        type: String,
        max: [18, "state registration id must have 18 characters or less"]
    },
    identityIssuingEntity: {
        // Individual’s ID card issuer entity. <= 6 characters
        type: String,
        max: [6, "card issuer entity must have 6 characters or less"]
    },
    federativeUnit: {
        // Individual’s ID card issuer state. <= 2 characters
        type: String,
        max: [2, "card issuer state must have 2 characters"]
    },
    issuingDateIdentity: {
        // Individual’s ID card issuing date (ISO 8601 format). <= 10 characters
        type: String,
        validate: [/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, "invalid date, the format must be yyyy-mm-dd"],
        max: [10, "invalid date, the format must be yyyy-mm-dd"]
    },
    idMaritalStatus: {
        // Individual’s marital Status ID (1 = Single; 2 = Married; 3 = Legally Separated; 4 = Widower; 5 = Divorced; 6 = Co-habitant; 7 = Separated).
        type: Number,
        validate: [/^[1-7]+$/, "invalid entery"],
        max: [1, "only one characters is alowed"]
    },
    idOccupationType: {
        // Individual’s occupation Type ID (1 = Retired; 2 = Employees; 3 = Liberal professional; 4 = Self-Employed; 5 = Others).
        type: Number,
        validate: [/^[1-5]+$/, "invalid entery"],
        max: [1, "only one characters is alowed"]
    },
    idNationality: {
        // Individual’s nationality ID (1 = Brazilian; 2 = Foreign). If uploading the category "RNE _FRONT" and "RNE_VERSE" in "Upload Document Individuals" endpoint, idNationality must be "2".
        type: Number,
        validate: [/^[1-2]+$/, "invalid entery"],
        max: [1, "only one characters is alowed"]
    },
    fatherName: {
        // Individual’s father name. <= 80 characters Match pattern: [a-zA-Z]
        type: String,
        validate: [/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "invalid name"],
        min: [3, "the father name must be 3 or more characters long"],
        max: [80, "the father name must have less than 100 characters"]
    },
    email: {
        // Individual's email address. (If BaaS Model Client, email is required).' <= 50 characters
        type: String,
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email"],
        max: [50, "the email must have less than 50 characters"]
    },
    incomeValue: {
        // Individual’s revenue. This field is required if the end user has an Alias Account. <= 100000000000000
        type: Number,
        max: [100000000000000, "the value has exceeded the allowed limit"]
    },
    isPep: {
        // Indicates if the person is politically exposed.
        type: Boolean
    },
    isPepSince: {
        // Date when the person became an exposed person (ISO 8601 format). >= 10 characters <= 10 characters
        type: String,
        validate: [/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, "invalid date, the format must be yyyy-mm-dd"],
        min: [10, "invalid date, the format must be yyyy-mm-dd"],
        max: [10, "invalid date, the format must be yyyy-mm-dd"] 
    },
    address: {
        zipCode: {
            // Zip code. <= 8 characters Match pattern: [0-9]
            type: String,
            required: [true, "zipcode is required"],
            validate: [/^[0-9]+$/, "invalid zipcode, only numbers is alowed"],
            max: [8, "zipcode must have less than 8 characters"]
        },
        street: {
            // Street name. >= 1 characters <= 40 characters
            type: String,
            required: [true, "street name is required"],
            min: [1, "street must have 1 character or more"],
            max: [40, "street must have less than 40 characters"]
        },
        number: {
            // Address number >= 0
            type: Number,
            required: [true, "address number is required"],
            min: 0
        },
        complement: {
            // Address complement. <= 30 characters
            type: String,
            max: [30, "the complement must have less than 30 characters"]
        },
        referencePoint: {
            // Address landmark. <= 80 characters
            type: String,
            max: [80, "the address landmark must have less than 80 characters"]
        },
        neighborhood: {
            // Neighborhood. >= 1 characters <= 40 characters
            type: String,
            required: true,
            min: [1, "the neighborhood must have more than one character "],
            max: [40, "the neighborhood must have less than 40 characters"]
        },
        city : {
            // City name. <= 30 characters
            type: String,
            required: [true, "city name is require"],
            max: [30, "city name must have less than 40 characters"]
        },
        federativeUnit: {
            // State. <= 2 characters
            type: String,
            required: [true, "state must have 2 characters"],
            max: [2, "state must have 2 characters"]
        },
        country: {
            // Country. <= 20 characters
            type: String,
            required: [true, "country name is require"],
            max: [20, "contry name must have less than 20 characters"]
        },   
    },
    phone: {
         idPhoneType : {
        // Phone type (1 = Residential; 2 = Contact; 3 = Spouse; 4 = Reference1; 5 = Reference2; 13 = Collection; 17 = Additional; 18 = Cell-Phone). Allowed values: 1 2 3 4 5 13 17 18 19 20 21 22 23
        type: Number,
        required: [true, "phone type is require"],
        validate: [/^(1)$|^(2)$|^(3)$|^(4)$|^(5)$|^(13)$|^(17)$|^(18)$|^(19)$|^(20)$|^(21)$|^(22)$|^(23)$/, "invalid phone type"]
        },
        areaCode: {
            // Area code (Format: 0XX). >= 3 characters <= 3 characters Match pattern: [0-9]
            type: String,
            required: [true, "the area code is require"],
            validate: [/^0.[0-9]+$/, "invalid area code"],
            min: [3, "the area code must have 3 characters"],
            max: [3, "the area code must have 3 characters"]
        },
        number: {
            // Phone number. >= 8 characters <= 9 characters Match pattern: [0-9]
            type: String,
            required: [true, "the phone number is require"],
            validate: [/^[0-9]+$/, "invalid phone number"],
            min: [8, "the phone number must have 8 characters or more "],
            max: [9, "the phone number must have 9 characters or less "]
        }
    }
});

const User = mongoose.model("User", userSchema)

export default User;
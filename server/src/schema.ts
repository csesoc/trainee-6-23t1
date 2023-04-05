// https://www.mongodb.com/docs/manual/core/schema-validation/

import { comp6969Db } from "./database";

const interests = {
    sport: { bsonType: "boolean" },
    art: { bsonType: "boolean" },
    photography: { bsonType: "boolean" },
    anime: { bsonType: "boolean" },
    gaming: { bsonType: "boolean" },
    sleep: { bsonType: "boolean" },
    cooking: { bsonType: "boolean" },
    reading: { bsonType: "boolean" }
}

const gender = {
    male: { bsonType: "boolean" },
    female: { bsonType: "boolean" },
    nonBinary: { bsonType: "boolean" }
}

const socials = {
    phone: { bsonType: "number" },
    instagram: { bsonType: "string" },
    facebook: { bsonType: "string" },
    discord: { bsonType: "string" },
    other: { bsonType: "string" }
}

// set max arr length and constrain it to bool only values
const availabilities = {
    monday: { bsonType: "array", maxItems: 24, items: { bsonType: "boolean" } },
    tuesday: { bsonType: "array", maxItems: 24, items: { bsonType: "boolean" } },
    wednesday: { bsonType: "array", maxItems: 24, items: { bsonType: "boolean" } },
    thursday: { bsonType: "array", maxItems: 24, items: { bsonType: "boolean" } },
    friday: { bsonType: "array", maxItems: 24, items: { bsonType: "boolean" } },
    saturday: { bsonType: "array", maxItems: 24, items: { bsonType: "boolean" } },
    sunday: { bsonType: "array", maxItems: 24, items: { bsonType: "boolean" } }
}

const setupSchema = (async () => {
    const result = await comp6969Db.command({
        collMod: "profile",
        required: ["email", "firstName", "lastName"],       // set required fields, may need to update later
        validator: {
            $jsonSchema: {
                bsonType: "object",
                properties: {
                    email: {
                        bsonType: "string",
                        default: ""
                        // can further specify pattern property https://www.mongodb.com/docs/manual/core/schema-validation/handle-invalid-documents/
                    },
                    firstName: {
                        bsonType: "string",
                        default: ""
                    },
                    lastName: {
                        bsonType: "string",
                        default: ""
                    },
                    interests: {
                        bsonType: "object",
                        properties: interests,
                        default: {}
                    },
                    socials: {
                        bsonType: "object",
                        properties: socials,
                        default: {}
                    },
                    availabilities: {
                        bsonType: "object",
                        properties: availabilities,
                        default: {}
                    }
                }
            }
        },
        validationAction: "error",
        validationLevel: "strict"
    });
    console.log(result);
})

setupSchema();
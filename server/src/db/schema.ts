// https://www.mongodb.com/docs/manual/core/schema-validation/

import { comp6969Db } from "./database";

const interests = {
    sport: { bsonType: "bool" },
    art: { bsonType: "bool" },
    photography: { bsonType: "bool" },
    anime: { bsonType: "bool" },
    gaming: { bsonType: "bool" },
    sleep: { bsonType: "bool" },
    cooking: { bsonType: "bool" },
    reading: { bsonType: "bool" }
}

const genders = {
    male: { bsonType: "bool" },
    female: { bsonType: "bool" },
    nonBinary: { bsonType: "bool" }
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
    monday: { bsonType: "array", maxItems: 24, items: { bsonType: "bool" } },
    tuesday: { bsonType: "array", maxItems: 24, items: { bsonType: "bool" } },
    wednesday: { bsonType: "array", maxItems: 24, items: { bsonType: "bool" } },
    thursday: { bsonType: "array", maxItems: 24, items: { bsonType: "bool" } },
    friday: { bsonType: "array", maxItems: 24, items: { bsonType: "bool" } },
    saturday: { bsonType: "array", maxItems: 24, items: { bsonType: "bool" } },
    sunday: { bsonType: "array", maxItems: 24, items: { bsonType: "bool" } }
}

const setupSchema = (async () => {
    const result = await comp6969Db.command({
        collMod: "profile",
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["_id", "email", "firstName", "lastName"],       // set required fields, may need to update later
                properties: {
                    _id: { 
                        bsonType: "objectId" 
                    },
                    email: {
                        bsonType: "string",
                        // can further specify pattern property https://www.mongodb.com/docs/manual/core/schema-validation/handle-invalid-documents/
                    },
                    firstName: {
                        bsonType: "string",
                    },
                    lastName: {
                        bsonType: "string",
                    },
                    interests: {
                        bsonType: "object",
                        additionalProperties: false,
                        properties: interests,
                    },
                    genders: {
                        bsonType: "object",
                        additionalProperties: false,
                        properties: genders,
                    },
                    preferences: {
                        bsonType: "object",
                        additionalProperties: false,
                        properties: genders,
                    },
                    socials: {
                        bsonType: "object",
                        additionalProperties: false,
                        properties: socials,
                    },
                    availabilities: {
                        bsonType: "object",
                        additionalProperties: false,
                        properties: availabilities,
                    }
                },
                additionalProperties: false
            }
        },
        validationAction: "error",
        validationLevel: "strict",
    });
    console.log(result);
})

setupSchema();
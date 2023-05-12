// https://www.mongodb.com/docs/drivers/node/current/fundamentals/typescript/

interface Interests {
    sport: boolean,
    art: boolean,
    photography: boolean,
    anime: boolean,
    gaming: boolean,
    sleep: boolean,
    cooking: boolean,
    reading: boolean
}

interface Gender {
    male: boolean,
    female: boolean,
    nonBinary: boolean
}

interface Socials {
    phone?: string,
    instagram?: string,
    facebook?: string,
    discord?: string
    // other: string
}

// maybe switch to just an array of arrays where arr[0] = monday etc
interface Availabilities {
    monday: boolean[],
    tuesday: boolean[],
    wednesday: boolean[],
    thursday: boolean[],
    friday: boolean[],
    saturday: boolean[],
    sunday: boolean[]
}

export interface Profile {
    email: string,
    password: string,
    token: string,
    firstName: string,
    lastName: string,
    interests?: Interests,
    gender?: Gender,
    preferences?: Gender,
    socials?: Socials,
    availabilities?: Availabilities
}

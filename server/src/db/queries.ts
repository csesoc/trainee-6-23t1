import { Profile } from "../interfaces"
import { profile } from "./database"

const sampleInsert = (async () => {
    const exUser = {
        email: "sugondes@gmail.com",
        firstName: "Sugondese",
        lastName: "Nuts"
    }
    const result = await profile.insertOne(exUser);
    console.log(result);
})

const sampleModify = (async () => {
    const result = await profile.updateOne(
        { email: "sugondes@gmail.com" },
        {
          $set: {
            "interests.anime": true
          },
        });
    console.log(result);
})

sampleModify();
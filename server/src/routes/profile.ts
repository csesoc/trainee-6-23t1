import express from "express";
import { profile } from "../db/database";
import dotenv from "dotenv";
dotenv.config();
import { validateToken } from "../middleware/validateToken";

const router = express.Router();
router.use(validateToken);

////////////////////////////// SETTERS //////////////////////////////

/*
Updates interests fields to the database with params: 
{
  _id: ObjectId,
  interests: {
    sport: boolean,
    art: boolean,
    photography: boolean, 
    anime: boolean, 
    gaming: boolean,
    sleep: boolean,
    cooking: boolean,
    reading: boolean,
  }
}
*/
router.post("/interests", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }

  const interests = req.body.interests;
  if (interests.sport === undefined || interests.art === undefined || 
      interests.photography === undefined || interests.anime === undefined || 
      interests.gaming === undefined || interests.sleep === undefined || 
      interests.cooking === undefined || interests.reading === undefined) { 
        return res.status(400).send({ error: "A field(s) is missing!" });
  }
  
  await profile.updateOne(
    { token: token },
    {
      $set: {
        interests: {
          sport: interests.sport,
          art: interests.art,
          photography: interests.photography,
          anime: interests.anime,
          gaming: interests.gaming,
          sleep: interests.sleep,
          cooking: interests.cooking,
          reading: interests.reading,
        },
      },
    }
  );
  
  return res.status(200).send({ message: `Interests have been updated!` });
});


/*
Updates genders fields to the database with params: 
{
  _id: ObjectId,
  genders: {
    male: boolean,
    female: boolean,
    nonBinary: boolean, 
  }
}
*/
router.post("/genders", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }

  const genders = req.body.genders;
  if (genders.male === undefined || genders.female === undefined || 
      genders.nonBinary === undefined) { 
        return res.status(400).send({ error: "A field(s) is missing!" });
  }
  
  await profile.updateOne(
    { token: token },
    {
      $set: {
        genders: {
          male: genders.male,
          female: genders.female,
          nonBinary: genders.nonBinary,
        },
      },
    }
  );
  
  return res.status(200).send({ message: `Gender has been updated!` });
});


/*
Updates preferences fields to the database with params: 
{
  _id: ObjectId,
  preferences: {
    male: boolean,
    female: boolean,
    nonBinary: boolean, 
  }
}
*/
router.post("/preferences", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }

  const genders = req.body.preferences;
  if (genders.male === undefined || genders.female === undefined || 
      genders.nonBinary === undefined) { 
        return res.status(400).send({ error: "A field(s) is missing!" });
  }
  
  await profile.updateOne(
    { token: token },
    {
      $set: {
        preferences: {
          male: genders.male,
          female: genders.female,
          nonBinary: genders.nonBinary,
        },
      },
    }
  );
  
  return res.status(200).send({ message: `Preferences have been updated!` });
});


/*
Updates socials fields to the database with params: 
{
  _id: ObjectId,
  socials: {
    phone?: number,
    instagram?: string,
    facebook?: string,
    discord?: string,
  }
}
*/
router.post("/socials", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }

  const socials = req.body.socials;

  if (socials.phone !== undefined) {
    await profile.updateOne(
      { token: token },
      { $set: { "socials.phone": socials.phone } }
    );
  }

  if (socials.instagram !== undefined) {
    await profile.updateOne(
      { token: token },
      { $set: { "socials.instagram": socials.instagram } }
    );
  }

  if (socials.facebook !== undefined) {
    await profile.updateOne(
      { token: token },
      { $set: { "socials.facebook": socials.facebook } }
    );
  }

  if (socials.discord !== undefined) {
    await profile.updateOne(
      { token: token },
      { $set: { "socials.discord": socials.discord } }
    );
  }

  return res.status(200).send({ message: `Socials have been updated!` });
});


/*
Updates availabilities fields to the database with params: 
{
  _id: ObjectId,
  availabilities: {
    monday: boolean array,
    tuesday: boolean array,
    wednesday: boolean array,
    thursday: boolean array,
    friday: boolean array,
    saturday: boolean array,
    sunday: boolean array,
  }
}
*/
router.post("/availabilities", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }

  const availabilities = req.body.availabilities;
  if (availabilities.monday === undefined || availabilities.tuesday === undefined || 
      availabilities.wednesday === undefined || availabilities.thursday === undefined ||
      availabilities.friday === undefined || availabilities.saturday === undefined ||
      availabilities.sunday === undefined) { 
        return res.status(400).send({ error: "A field(s) is missing!" });
  }
  
  await profile.updateOne(
    { token: token },
    {
      $set: {
        availabilities: {
          monday: availabilities.monday,
          tuesday: availabilities.tuesday,
          wednesday: availabilities.wednesday,
          thursday: availabilities.thursday,
          friday: availabilities.friday,
          saturday: availabilities.saturday,
          sunday: availabilities.sunday,
        },
      },
    }
  );
  
  return res.status(200).send({ message: `Availabilities have been updated!` });
});


////////////////////////////// GETTERS //////////////////////////////
router.get("/user", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }
  return res.status(200).send(user)
})

router.get("/interests", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }
  return res.status(200).send(user.interests)
})

router.get("/genders", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }
  return res.status(200).send(user.genders)
})

router.get("/preferences", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }
  return res.status(200).send(user.preferences)
})

router.get("/socials", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }
  return res.status(200).send(user.socials)
})

router.get("/availabilities", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
      return res.status(400).send({ error: "token invalid" });
  }
  return res.status(200).send(user.availabilities)
})


export { router as default };
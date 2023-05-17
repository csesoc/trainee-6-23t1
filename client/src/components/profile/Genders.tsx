import { GiMale, GiFemale } from "react-icons/gi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import styles from './Profile.module.css'

interface gender {
  male: boolean,
  female: boolean,
  nonBinary: boolean
}

const genderIcons = {
  male: <GiMale key={0} style={{ color: '#0671B7' }}/>,
  female: <GiFemale key={1} style={{ color: '#F8B7CD' }}/>,
  nonBinary: <GiMale/>
}

const getIcons = (genderObject: gender) => {
  const updatedGenders = [];
  if (genderObject.male) updatedGenders.push(genderIcons.male);
  if (genderObject.female) updatedGenders.push(genderIcons.female);
  if (genderObject.nonBinary) updatedGenders.push(genderIcons.nonBinary);
  return updatedGenders;
}

const Genders = () => {

  const [genders, setGenders] = useState<JSX.Element[]>([])
  const [preferences, setPreferences] = useState<JSX.Element[]>([])

  useEffect(() => {
    const userGenders = { male: true, female: false, nonBinary: false }; // api call
    const preferenceGenders = { male: false, female: true, nonBinary: false }; // api call
    setGenders(getIcons(userGenders));
    setPreferences(getIcons(preferenceGenders));
  }, [])

  return (
    <Grid className={styles.genders} item xs={12}>
      {genders} <HiOutlineArrowNarrowRight/> {preferences}
    </Grid>
  )
}

export default Genders
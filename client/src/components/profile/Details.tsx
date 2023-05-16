import { Grid } from '@mui/material'
import styles from './Profile.module.css'
import { GiMale, GiFemale } from "react-icons/gi";
import React, { useEffect, useState } from 'react';

const genderIcons = {
  male: <GiMale key={0} style={{ color: '#0671B7' }}/>,
  female: <GiFemale key={1} style={{ color: '#F8B7CD' }}/>,
  nonBinary: <GiMale/>
}

const Details = () => {

  const [genders, setGenders] = useState<JSX.Element[]>([])
  const [preferences, setPreferences] = useState<JSX.Element[]>([])

  useEffect(() => {
    const userGenders = { male: true, female: true, nonBinary: false }; // api call
    const updatedGenders = [];
    if (userGenders.male) updatedGenders.push(genderIcons.male);
    if (userGenders.female) updatedGenders.push(genderIcons.female);
    if (userGenders.nonBinary) updatedGenders.push(genderIcons.nonBinary);
    setGenders(updatedGenders);
  }, [])

  return (
    <Grid item xs={12} sm={8}>

      <Grid container>

        {/* Name */}
        <Grid item xs={12}>
          <span className={styles.name}>Smexy - name here</span>
        </Grid>

        {/* Gender / Preferences */}
        <Grid className={styles.genders} item xs={12}>
          {genders}
        </Grid>

      </Grid>

    </Grid>
  )
}

export default Details
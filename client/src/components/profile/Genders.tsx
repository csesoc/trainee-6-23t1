import { GiMale, GiFemale } from "react-icons/gi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Select } from "@mui/material";
import styles from './Profile.module.css'

interface genderProps {
  edit: boolean,
  save: number,
  reset: number
}

const Genders = ({ edit, save, reset }: genderProps) => {

  const [genders, setGenders] = useState<any[]>([])
  const [oriGenders, setOriGenders] = useState<any[]>([])
  const [preferences, setPreferences] = useState<any[]>([])
  const [oriPreferences, setOriPreferences] = useState<any[]>([])

  // save changes
  useEffect(() => {
    const saveData = async () => {
      const newGenders: any = { male: false, female: false, nonBinary: false }
      const newPreferences: any = { male: false, female: false, nonBinary: false }

      for (const key of genders) newGenders[key] = true
      for (const key of preferences) newPreferences[key] = true

      const genderResponse: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/genders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genders: newGenders }),
        credentials: 'include',
      });
      const genderData = await genderResponse.json()

      const preferenceResponse: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences: newPreferences }),
        credentials: 'include',
      });
      const preferenceData = await preferenceResponse.json()
      setOriGenders(JSON.parse(JSON.stringify(genders)))
      setOriPreferences(JSON.parse(JSON.stringify(preferences)))
    }
    if (save > 0) saveData()
  }, [save])

  // reset changes
  useEffect(() => {
    setGenders(JSON.parse(JSON.stringify(oriGenders)))
    setPreferences(JSON.parse(JSON.stringify(oriPreferences)))
  }, [reset])

  // load genders and preferences
  useEffect(() => {
    const fetchData = async () => {
      const genderResponse: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/genders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const gendersData = await genderResponse.json()
      const genderArray = []
      for (const key in gendersData) if (gendersData[key]) genderArray.push(key)
      
      const preferenceResponse: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/preferences', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const preferencesData = await preferenceResponse.json()
      const preferenceArray = []
      for (const key in preferencesData) if (preferencesData[key]) preferenceArray.push(key)
      
      setGenders(genderArray)
      setOriGenders(genderArray)
      setPreferences(preferenceArray)
      setOriPreferences(preferenceArray)
    }
    fetchData()
  }, [])

  // gender -> icon
  const genderIcons: any = {
    male: <GiMale key={0} style={{ color: '#0671B7' }}/>,
    female: <GiFemale key={1} style={{ color: '#F8B7CD' }}/>,
    nonBinary: <GiMale/>
  }

  // get icons from genders
  const getIcons = (genderArray: any) => {
    const updatedGenders = [];
    for (const key of genderArray) updatedGenders.push(genderIcons[key])
    return updatedGenders;
  }

  // gender select component
  const genderSelect = (onChange: any) => (
    <Select
      className={styles.dropdown}
      onChange={onChange}
      value=''
    >
      <MenuItem value='male'>male</MenuItem>
      <MenuItem value='female'>female</MenuItem>
      <MenuItem value='nonBinary'>nonBinary</MenuItem>
    </Select>
  )

  const genderOnChange = (e: any) => {
    setGenders([e.target.value])
  }

  const preferenceOnChange = (e: any) => {
    if (!preferences.includes(e.target.value)) setPreferences([...preferences, e.target.value])
  }

  return (
    <Grid className={styles.genders} item xs={12}>
      {getIcons(genders)}
      {edit && genderSelect(genderOnChange)}
      <HiOutlineArrowNarrowRight/> 
      {getIcons(preferences)}
      {edit && genderSelect(preferenceOnChange)}
      {edit && <Button onClick={() => setPreferences([])}>Clear</Button>}
    </Grid>
  )
}

export default Genders
import { Chip, Grid, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useEffect, useState } from "react"
import styles from './Profile.module.css'

interface interestProps {
  edit: boolean,
  save: number,
  reset: number
}

const Interests = ({ edit, save, reset }: interestProps) => {

  const [oriInterests, setOriInterests] = useState<String[]>([]);
  const [interests, setInterests] = useState<String[]>([]);

  // interest list
  const allInterests = ['sport', 'art', 'photography', 'anime', 'gaming', 'sleep', 'cooking', 'reading']

  // save changes
  useEffect(() => {
    const saveData = async () => {
      const newInterests: any = {}
      for (const key of allInterests) {
        newInterests[key] = interests.includes(key)
      }
      const response: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/interests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interests: newInterests }),
        credentials: 'include',
      });
      const data = await response.json()
      setOriInterests(JSON.parse(JSON.stringify(interests)))
    }
    if (save > 0) saveData()
  }, [save])

  // reset changes
  useEffect(() => {
    setInterests(JSON.parse(JSON.stringify(oriInterests)))
  }, [reset])

  // load interests
  useEffect(() => {
    const fetchData = async () => {
      const userInterests: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/interests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await userInterests.json()
      const newInterests = []
      for (const key in data) {
        if (data[key]) newInterests.push(key)
      }
      setOriInterests(newInterests)
      setInterests(newInterests)
    }
    fetchData()
  }, [])

  // delete
  const deleteInterest = (chip: String) => {
    setInterests(interests.filter(interest => interest !== chip))
  }

  // add
  const addInterest = (e: any) => {
    if (!interests.includes(e.target.value)) setInterests([...interests, e.target.value])
  }
  
  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={10.5} className={styles.chips}>
          {interests.map((interest, index) => 
            <Chip label={interest} key={index} onDelete={edit ? () => deleteInterest(interest) : undefined}/>
          )}
        </Grid>
        <Grid item xs={1.5} className={styles.menuContainer}>
          { edit && 
            <Select
              className={styles.dropdown}
              onChange={addInterest}
              value=''
            >
              {allInterests.map((interest, index) => (
                <MenuItem key={index} value={interest}>{interest}</MenuItem>
              ))}
            </Select>
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Interests
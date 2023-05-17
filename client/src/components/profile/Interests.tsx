import { Chip, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import styles from './Profile.module.css'

interface interests {
  sport: boolean,
  art: boolean,
  photography: boolean,
  anime: boolean,
  gaming: boolean,
  sleep: boolean,
  cooking: boolean,
  reading: boolean
}

const Interests = () => {

  const [interests, setInterests] = useState<String[]>([]);

  useEffect(() => {
    const userInterests = { sport: true, anime: true } // api call later
    setInterests(['sport', 'anime', 'gaming']);
  }, [])
  
  return (
    <Grid item xs={12} className={styles.interestsContainer}>
      {interests.map((interest, index) => 
        <Chip label={interest} key={index}/>
      )}
    </Grid>
  )
}

export default Interests
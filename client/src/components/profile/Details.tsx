import { Grid } from '@mui/material'
import styles from './Profile.module.css'
import Genders from './Genders'
import Interests from './Interests'
import { useEffect, useState } from 'react'
import Socials from './Socials'

interface detailsProps {
  save: number,
  reset: number,
  edit: boolean,
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const Details = ({ save, reset, edit, setEdit }: detailsProps) => {

  const [name, setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const user: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await user.json()
      setName(`${data.firstName} ${data.lastName}`)
    }
    fetchData()
  }, [])

  return (
    <Grid item xs={12} sm={8}>
      <Grid container direction={'column'} spacing={2}>

        <Grid item xs={12}>
          <span className={styles.name}>{name}</span>
        </Grid>
        <Socials save={save} reset={reset} edit={edit}/>
        <Grid item xs={12}><div className={styles.bar}/></Grid>
        <Genders save={save} reset={reset} edit={edit}/>
        <Interests save={save} reset={reset} edit={edit}/>

      </Grid>
    </Grid>
  )
}

export default Details
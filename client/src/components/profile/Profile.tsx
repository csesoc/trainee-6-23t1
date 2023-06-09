import { Button, Grid } from "@mui/material"
import Img from "./Img"
import styles from './Profile.module.css'
import Details from "./Details"
import { GrGamepad, GrEdit } from "react-icons/gr";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";

const Profile = () => {

  const [edit, setEdit] = useState(false)
  const [reset, setReset] = useState(0)
  const [save, setSave] = useState(0)

  const email = 'theo.ang816@gmail.com'
  const password = 'testPassword'

  useEffect(() => {
    const login = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
        credentials: 'include',
      });
      const data = await response.json();
    }
    login()
  }, [])

  return (
    <>
      <div className={styles.options}>
        <GrGamepad className={styles.icon}/>
        <GrEdit onClick={() => setEdit(!edit)} className={styles.icon}/>
      </div>
      <Grid container className={styles.container} spacing={5}>
        <Img/>
        <Details save={save} reset={reset} edit={edit} setEdit={setEdit}/>
        { edit && 
          <Grid item xs={12} className={styles.buttonContainer}>
            <Button className={styles.button} onClick={() => setReset(reset + 1)}>Reset</Button>
            <Button className={styles.button} onClick={() => { setSave(save + 1); setEdit(false); }}>Save</Button>
          </Grid>
        }
        <Calendar save={save} reset={reset} edit={edit}/>
      </Grid>
    </>
  )
}

export default Profile
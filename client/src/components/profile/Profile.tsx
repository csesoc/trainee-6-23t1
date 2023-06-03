import { Button, Grid, Menu, MenuItem } from "@mui/material"
import Img from "./Img"
import styles from './Profile.module.css'
import Details from "./Details"
import { GrGamepad, GrEdit, GrHomeRounded, GrUser, GrLogout } from "react-icons/gr";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate()

  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null!)

  const [edit, setEdit] = useState(false)
  const [reset, setReset] = useState(0)
  const [save, setSave] = useState(0)

  const [checkedStatus, setCheckedStatus] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)

  // check user login or not
  useEffect(() => {
    const getLoginStatus = async () => {
      const user: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/loginStatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await user.json()
      setLoggedIn(data.status)
      setCheckedStatus(true)
    }
    getLoginStatus()
  }, [])

  // redirect to login if not logged in
  if (!loggedIn) {
    alert('User has not logged in')
    navigate('/login')
  }

  // show blank screen before checking login status
  if (!checkedStatus) {
    return <></>
  }

  // open menu
  const openMenu = (e: any) => {
    setAnchorEl(e.currentTarget)
    setOpenSettings(!openSettings)
  }

  // logout
  const logout = async () => {
    const res: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json()
    setOpenSettings(false)
    navigate('/')
  }

  return (
    <>
      {/* TOPBAR  */}
      <div className={styles.options}>
        <GrHomeRounded onClick={() => navigate('/')} className={styles.icon}/>
        <div className={styles.rightOptions}>
          <GrGamepad className={styles.icon}/>
          <GrUser className={styles.icon} onClick={openMenu} id="user-icon"/>
          <Menu
            id="user-icon"
            open={openSettings}
            onClose={() => setOpenSettings(false)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem className={styles.menuItem} onClick={logout}>
              <GrLogout/>
              <span>Logout</span>
            </MenuItem>
            <MenuItem className={styles.menuItem} onClick={() => {setEdit(true); setOpenSettings(false)}}>
              <GrEdit/>
              <span>Edit Profile</span>
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* DATA */}
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
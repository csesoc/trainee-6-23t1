import { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { FaDiscord, FaInstagram, FaFacebook, FaPhone } from 'react-icons/fa'
import { Grid, Input, InputAdornment } from '@mui/material'

interface socialProps {
  edit: boolean,
  save: number,
  reset: number
}

const Socials = ({ edit, save, reset }: socialProps) => {

  const [socials, setSocials] = useState<any>({
    phone: '',
    instagram: '',
    facebook: '',
    discord: '',
  })

  const [oriSocials, setOriSocials] = useState<any>({
    phone: '',
    instagram: '',
    facebook: '',
    discord: '',
  })

  // load data
  useEffect(() => {
    const fetchData = async () => {
      const socials: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/socials', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await socials.json()
      setSocials(data)
      setOriSocials(data)
    }
    fetchData()
  }, [])

  // save data
  useEffect(() => {
    const saveData = async () => {
      const save: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/socials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ socials: socials }),
        credentials: 'include',
      });
      const data = await save.json()
      setOriSocials(JSON.parse(JSON.stringify(socials)))
    }
    if (save > 0) saveData()
  }, [save])

  // reset data
  useEffect(() => {
    setSocials(JSON.parse(JSON.stringify(oriSocials)))
  }, [reset])

  // social on change
  const socialChange = (e: any) => {
    setSocials({...socials, [e.target.name]: e.target.value })
  }

  // copy to clipboard
  const socialClick = async (e: any) => {
    let target = e.target
    while (target) {
      const key = target.getAttribute('data-name')
      console.log(key)
      if (key) {
        await navigator.clipboard.writeText(socials[key])
        alert('contact copied to clipboard')
        break
      }
      target = target.parentElement
    }
  }

  return (
    <Grid item xs={12} className={styles.socials}>
      { edit ?
          <>
          <Input onChange={socialChange} name='instagram' value={socials.instagram} 
                 startAdornment={<InputAdornment position='start'><FaInstagram/></InputAdornment>}/>
          <Input onChange={socialChange} name='discord' value={socials.discord} 
                 startAdornment={<InputAdornment position='start'><FaDiscord/></InputAdornment>}/>
          <Input onChange={socialChange} name='facebook' value={socials.facebook} 
                 startAdornment={<InputAdornment position='start'><FaFacebook/></InputAdornment>}/>
          <Input onChange={socialChange} name='phone' value={socials.phone} 
                 startAdornment={<InputAdornment position='start'><FaPhone/></InputAdornment>}/>
          </>
        :
          <>
          <FaInstagram data-name='instagram' onClick={socialClick} className={styles.icon}/>
          <FaDiscord data-name='discord' onClick={socialClick} className={styles.icon}/>
          <FaFacebook data-name='facebook' onClick={socialClick} className={styles.icon}/>
          <FaPhone data-name='phone' onClick={socialClick} className={styles.icon}/>
          </>
      }
    </Grid>
  )
}

export default Socials
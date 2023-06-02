import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Button, Grid } from '@mui/material'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react'

interface calendarProps {
  edit: boolean,
  save: number,
  reset: number
}

const Calendar = ({ edit, save, reset }: calendarProps) => {

  // [[24 hours] 7 days]
  const [oriAvails, setOriAvails] = useState(Array.from({ length: 7 }, () => Array(24).fill(false)))
  const [avails, setAvails] = useState(Array.from({ length: 7 }, () => Array(24).fill(false)))
  const [events, setEvents] = useState<any[]>([])

  // get avails from user
  useEffect(() => {
    setEvents(getEvents())
  }, [avails])

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/availabilities', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json()
      let newAvails = []
      if (data !== undefined) {
        for (const key in data) {
          newAvails.push(data[key])
        }
      } else {
        newAvails = Array.from({ length: 7 }, () => Array(24).fill(false))
      }
      setAvails(newAvails)
      setOriAvails(newAvails)
    }
    fetchData()
  }, [])

  // turn avails to events
  const getEvents = () => {
    const events = [];

    for (let day = 0; day < 7; day++) {
      const daySlot = new Date();
      const currentDay = (daySlot.getDay() === 0) ? 7 : daySlot.getDay();  // mon to sun (1-7) instead of sun to sat (0-6)
      daySlot.setDate(daySlot.getDate() + (day + 1 - currentDay));

      for (let hour = 0; hour < 24; hour++) {
        if (avails[day][hour] === true) {
          const start = (new Date(daySlot)).setHours(hour, 0, 0);
          const end = (new Date(daySlot)).setHours(hour + 1, 0, 0);
          events.push({ start: start, end: end })
        }
      }
    }

    return events;
  }
  
  // update calendar
  const saveSlot = (selectionInfo: any) => {
    const start = selectionInfo.start; const end = selectionInfo.end;
    const startDay = (start.getDay() === 0) ? 6 : start.getDay() - 1;
    const endDay = (end.getDay() === 0) ? 6 : end.getDay() - 1;
    const startHour = start.getHours(); const endHour = end.getHours();
    const newAvails = [...avails];

    if (startDay === endDay) {
      for (let hour = startHour; hour < endHour; hour++) {
        newAvails[startDay][hour] = !newAvails[startDay][hour]
      }
    } else {
      // start hour to midnight
      for (let hour = startHour; hour < 24; hour++) {
        newAvails[startDay][hour] = !newAvails[startDay][hour]
      }

      // midnight to end hour
      for (let hour = 0; hour < endHour; hour++) {
        newAvails[startDay][hour] = !newAvails[startDay][hour]
      }

      // days in between
      for (let dayBetween = startDay + 1; dayBetween < endDay; dayBetween++) {
        newAvails[dayBetween] = newAvails[dayBetween].map((slot) => !slot);
      }
    }
    
    setAvails(newAvails)
  }

  // delete
  const deleteEvent = (eventInfo: any) => {
    saveSlot(eventInfo.event)
  }

  // save update - api call later
  useEffect(() => {
    const saveData = async () => {
      const newAvailabilities = {
        monday: avails[0],
        tuesday: avails[1],
        wednesday: avails[2],
        thursday: avails[3],
        friday: avails[4],
        saturday: avails[5],
        sunday: avails[6]
      }
      const response: any = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/availabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availabilities: newAvailabilities }),
        credentials: 'include',
      });
      const data = await response.json()
      setOriAvails(JSON.parse(JSON.stringify(avails)))
    }
    if (save > 0) saveData()
  }, [save])

  // reset changes
  useEffect(() => {
    setAvails(JSON.parse(JSON.stringify(oriAvails)))
  }, [reset])
  
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FullCalendar
            // calendar look
            plugins={[interactionPlugin, timeGridPlugin]}
            initialView='timeGridWeek'
            weekends={true}
            firstDay={1}
            headerToolbar={false}
            allDaySlot={false}
            dayHeaderFormat={{ weekday: 'short' }}
            slotDuration='01:00:00'
            height={'auto'}

            // slot functions and stuff
            selectable
            select={saveSlot}
            selectConstraint={{ startTime: '00:00', endTime: '23:59' }}

            // events
            events={events}
            eventBackgroundColor='rgb(0, 128, 0, 0.5)'
            eventClick={deleteEvent}
            eventContent={<></>}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Calendar
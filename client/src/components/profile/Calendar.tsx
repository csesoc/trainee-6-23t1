import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Grid } from '@mui/material'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react'

const Calendar = () => {

  // [[24 hours] 7 days]
  const [avails, setAvails] = useState(Array.from({ length: 7 }, () => Array(24).fill(false)))
  const [events, setEvents] = useState<any[]>([ { start: (new Date()).setHours(12, 0, 0), end: (new Date()).setHours(13, 0, 0) } ])

  // get avails from user
  useEffect(() => {
    setEvents(getEvents())
  }, [avails])

  // changes to avails
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
  
  return (
    <Grid item xs={12}>
      <FullCalendar
        // calendar look
        plugins={[interactionPlugin, timeGridPlugin]}
        initialView='timeGridWeek'
        weekends={true}
        firstDay={1}
        headerToolbar={false}
        allDaySlot={false}
        dayHeaderFormat={{ weekday: 'long' }}
        slotDuration='01:00:00'

        // slot functions and stuff
        selectable
        select={saveSlot}

        // events
        events={events}
        eventBackgroundColor='rgb(0, 128, 0, 0.5)'
        // eventContent={renderEventContent}
      />
    </Grid>
  )
}

export default Calendar
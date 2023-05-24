import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Grid } from '@mui/material'

const Calendar = () => {

  const events = [
    { title: 'Meeting', start: new Date() }
  ]

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (
    <Grid item xs={12}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridWeek'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </Grid>
  )
}

export default Calendar
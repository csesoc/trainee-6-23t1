import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
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
        plugins={[timeGridPlugin]}
        initialView='timeGridWeek'
        weekends={true}
        firstDay={1}
        headerToolbar={false}
        allDaySlot={false}
        dayHeaderFormat={{ weekday: 'long' }}
        slotDuration='01:00:00'
        events={events}
        eventContent={renderEventContent}
      />
    </Grid>
  )
}

export default Calendar
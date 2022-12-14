import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const CalendarContainer = styled.div`
  max-height: 90vh;
`

const Calendar = () => {
  return (
    <CalendarContainer>
      {/* 
      // @ts-ignore */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable
        selectable
      />
    </CalendarContainer>
  )
}

export default Calendar

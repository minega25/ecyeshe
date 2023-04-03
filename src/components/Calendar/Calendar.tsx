import styled from 'styled-components'
import FullCalendar from '../FullCalendar'

const CalendarContainer = styled.div`
  max-height: 90vh;
`

const Calendar = () => {
  return (
    <CalendarContainer>
      <FullCalendar />
    </CalendarContainer>
  )
}

export default Calendar

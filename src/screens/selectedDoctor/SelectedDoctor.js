import React, { createRef } from "react";
import {Calender} from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const SelectedDoctor = () => {
  const calenderRef = createRef();
  var calendar = new Calender(calenderRef, {
    timeZone: 'local',
    initialDate: '2018-06-01' // will be parsed as local
  })
  function handleDateClick(arg) {
    alert(arg.dateStr);
    console.log(calenderRef);
  }
  return (
    <div style={{backgroundColor: 'white'}}>
    <div className='container'>
      <FullCalendar
        ref={calenderRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable= "true"
        showNonCurrentDates= 'false'
        dayHeaders='true'
        hiddenDays= "[ 0,1,2,3,4 ]" 
        dateClick={(arg) => handleDateClick(arg)}
      />
      </div>
    </div>
  );
};

export default SelectedDoctor;

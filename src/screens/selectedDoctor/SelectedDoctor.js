import React, { createRef, useEffect, useState } from "react";
// import {Calender} from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import successIcon from "../../assets/pics/success.gif";
import "./_selectedDoctor.scss";

const SelectedDoctor = (props) => {
  //calender component
  const [events, setEvents] = useState([]);
  const [controlEvent, setControlEvent] = useState(true);
  const [hiddenDates, setHiddenDates] = useState([]);
  const [dateAppointment, clickedDate] = useState();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const calendarRef = createRef();
  const [month, setMonth] = useState();

  const [selectedDays, setSelectedDays] = useState([]);

  //user registration

  const [success, setSuccess] = useState(false);
  const [userShow, setUserShow] = useState(false);

  //modal code

  const [show, setShow] = useState(false);
  const [timeToMeet, setTimeToMeet] = useState();

  //appointment

  const [appointed, setAppointed] = useState();

  //setting up appointment time

  useEffect(() => {
    if (props.location.details) {
      Cookies.set("details", props.location.details);
      if (props.location.details.item.availibility) {
        // console.log(props.location.details.item.availibility)
        let hidden = [0, 1, 2, 3, 4, 5, 6];

        for (let keys in props.location.details.item.availibility) {
          setSelectedDays((prevState) => [
            ...prevState,
            {
              day: keys,
              time: props.location.details.item.availibility[keys],
              visitTime: props.location.details.item.visitDurationInMin,
            },
          ]);
          // console.log(keys)
          let index = days.findIndex((obj) => obj === keys);
          console.log(index);
          hidden = hidden.filter((item) => item !== index);
        }

        setHiddenDates(hidden);
      }
    } else if (Cookies.get("details")) {
      let item = JSON.parse(Cookies.get("details"));
      // console.log(item.item.availibility);
      if (item.item.availibility) {
        // console.log(props.location.details.item.availibility)

        let hidden = [0, 1, 2, 3, 4, 5, 6];

        for (let keys in item.item.availibility) {
          setSelectedDays((prevState) => [
            ...prevState,
            {
              day: keys,
              time: item.item.availibility[keys],
              visitTime: item.item.visitDurationInMin,
            },
          ]);
          // console.log(keys)
          let index = days.findIndex((obj) => obj === keys);
          console.log(index);
          hidden = hidden.filter((item) => item !== index);
        }

        setHiddenDates(hidden);
      }
    }
  }, []);

  //getting current month

  useEffect(() => {
    if (calendarRef) {
      let calendarApi = calendarRef.current.getApi();
      setMonth(calendarApi.currentDataManager.data.viewTitle);
    }
  }, [calendarRef]);

  //calculation of dates and months

  useEffect(() => {
    if (month) {
      // console.log(month);
      let monthYearSelect = month.split(" ");
      let monthSelect = months.findIndex((obj) => obj === monthYearSelect[0]);

      let dates = getDaysInMonth(
        Number(monthSelect),
        Number(monthYearSelect[1])
      );

      if (controlEvent) {
        setControlEvent(false);

        dates.map((item) => {
          let day = item.toString().split(" ");
          //  for(var keys in item){
          //    console.log(keys)
          //  }

          // console.log(typeof item.toString(), selectedDays);
          let eventDetails = selectedDays.find((obj) => obj.day === day[0]);
          if (eventDetails) {
            var currentDate = new Date();
            currentDate = currentDate.toString().split(" ");

            if (day[2] >= currentDate[2]) {
              let monthIn =
                monthShort.findIndex((obj) => obj === currentDate[1]) + 1;
              if (monthIn <= 9) {
                monthIn = `0${monthIn}`;
              }
              setEvents((prevState) => [
                ...prevState,
                {
                  title: `Available from: ${eventDetails.time}`,
                  date: `2021-${monthIn}-${day[2]}`,
                },
              ]);
            }
          }
          // console.log(...item)
        });
      }

      // console.log(dates);
      // setEvents({ title: "event 1", date: "2021-03-19" });
    }
  }, [month]);

  //onDateclick calculation

  function handleDateClick(arg) {
    var currentDate = new Date();
    currentDate = currentDate.toString().split(" ");

    let dateClicked = arg.dateStr.split("-");

    if (dateClicked[2] >= currentDate[2]) {
      clickedDate(arg.dateStr);
      let d = new Date(arg.dateStr);
      const appointedDay = days[d.getDay()];
      // console.log(appointedDay);
      let appointedDetails = selectedDays.find(
        (obj) => obj.day === appointedDay
      );
      let appointedTime = appointedDetails.time.split(" ");

      let x = appointedDetails.visitTime; //minutes interval
      let times = []; // time array
      let startTime = appointedTime[0].split(":");
      // console.log(startTime); // start time
      let ap = ["AM", "PM"]; // AM-PM
      let endTime = appointedTime[3].split(":");

      let startMin = Number(startTime[1]),
        // endMin = Number(endTime[1]),
        startHour = Number(startTime[0]),
        endHour = Number(endTime[0]),
        timeType = appointedTime[1];

      while (startHour !== endHour) {
        let pushSMin, pushSHour;
        pushSMin = startMin < 9 ? `0${startMin}` : startMin.toString();
        pushSHour = startHour < 9 ? `0${startHour}` : startHour.toString();
        startMin += x;

        if (startMin === 60) {
          startHour += 1;
          startMin = 0;
        }
        if (startHour > 12) {
          startHour = 1;
          timeType = ap.find((item) => item !== timeType);
        }

        let pushEMin, pushEHour;

        pushEMin = startMin < 9 ? `0${startMin}` : startMin.toString();
        pushEHour = startHour < 9 ? `0${startHour}` : startHour.toString();

        times.push(
          `${pushSHour}:${pushSMin} ${timeType} - ${pushEHour}:${pushEMin} ${timeType}`
        );
      }
      setSuccess(false);
      setShow(true);
      // console.log(times);
      setAppointed(times);

      // console.log(calendarRef);
    }
  }

  //finding total dates in a month

  function getDaysInMonth(month, year) {
    var date = new Date(year, month);
    // console.log(date);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  //modal management

  // const handleUserOpen = () => setUserShow(true);
  const handleUserClose = () => {
    setUserShow(false);
    setEvents((prevState) => [
      ...prevState,
      { title: "appointment added", date: dateAppointment },
    ]);
  };

  const handleHeaderUserClose = () => {
    setUserShow(false);
  };
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // console.log(data);

    setSuccess(true);
  };

  const handleClose = () => {
    setShow(false);
    if (timeToMeet) {
      setUserShow(true);
    }
  };

  const handleHeaderClose = () => {
    setShow(false);
  };

  // const handleSuccessClose = () => {
  //   setSuccess(true);
  // };

  const handleHeaderSuccessClose = () => {
    setUserShow(false);
  };
  // const handleShow = () => setShow(true);

  //getting doc details

  let name = "",
    hospital = "";
  if (Cookies.get("details")) {
    let details = JSON.parse(Cookies.get("details"));

    name = details.item.name;
    hospital = details.item.org;
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center mt-2 mb-2"
        style={{ borderBottom: "3px solid gray" }}
      >
        <h4>Set an appointment with</h4>
        <h4 className="m-2">{name}</h4>
        <p className="m-1">{hospital}</p>
      </div>

      <Modal show={show} onHide={handleHeaderClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a meeting time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            className="p-2"
            onChange={(e) => setTimeToMeet(e.target.value)}
          >
            {appointed ? appointed.map((item) => <option>{item}</option>) : ""}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <button variant="primary" onClick={handleClose}>
            Set Appointment
          </button>
        </Modal.Footer>
      </Modal>

      {success ? (
        <Modal show={userShow} onHide={handleHeaderUserClose}>
          <Modal.Body>
            <img
              src={successIcon}
              alt="icon"
              style={{
                width: "100%",
              }}
            />
          </Modal.Body>

          <Modal.Footer>
            <button variant="primary" onClick={handleUserClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={userShow} onHide={handleHeaderSuccessClose}>
          <Modal.Header closeButton>
            <Modal.Title>Give us your info</Modal.Title>
          </Modal.Header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <div class="form-group">
                <label for="exampleFormControlInput1">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="John"
                  name="firstName"
                  ref={register({ required: true, maxLength: 20 })}
                />
                {errors.firstName && <p style={{textAlign: 'center', color: 'red'}}>First name is required</p>}
              </div>

              <div class="form-group">
                <label for="exampleFormControlInput2">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Doe"
                  name="lastName"
                  ref={register({ required: true, maxLength: 20 })}
                />
                {errors.lastName && <p style={{textAlign: 'center', color: 'red'}}>Last name is required</p>}
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">
                  Select Your Gender
                </label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  name="gender"
                  ref={register}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="exampleFormControlNumber1">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlNumber1"
                  placeholder="25"
                  name="age"
                  ref={register({ required: true })}
                />
                {errors.age && <p style={{textAlign: 'center', color: 'red'}}>Age is required</p>}
              </div>

              <div class="form-group">
                <label for="exampleFormControlNumber2">Phone Numbe</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlNumber2"
                  placeholder="01711111111"
                  name="phone"
                  ref={register({ required: true })}
                />
                {errors.phone && <p style={{textAlign: 'center', color: 'red'}}>Phone Number is required</p>}
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">
                  Tell us about your problem
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="description"
                  ref={register}
                ></textarea>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button variant="primary">Save Details</button>
            </Modal.Footer>
          </form>
        </Modal>
      )}

      <div className="demo-calender">
        <FullCalendar
          id="fullCalendar"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridWeek, interactionPlugin]}
          initialView="dayGridMonth"
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          selectable="true"
          showNonCurrentDates="true"
          dayHeaders="false"
          hiddenDays={hiddenDates}
          events={events}
          dateClick={(arg) => handleDateClick(arg)}
        />
      </div>
    </div>
  );
};

export default SelectedDoctor;

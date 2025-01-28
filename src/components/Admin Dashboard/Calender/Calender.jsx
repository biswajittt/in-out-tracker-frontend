import React from "react";


const GoogleCalendar = () => {
  return (
    <>
      <div className="box-border  flex justify-center align-middle h-screen p-20 "><iframe
        src="https://calendar.google.com/calendar/embed?height=700&wkst=1&ctz=Asia%2FKolkata&showPrint=0&title=inouttracker&src=MGU2ZjlmNDM4ZmFhYzg4MTY3MjdlN2YxZWRhYmE1MzUxNzg3ZGE0NTg0ZTBjNDc5N2ExYmI1ODM2ZmRlN2Q2YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%237986CB"
        style={{ border: "solid 1px #777" }}
        frameBorder="0" 
        scrolling="no"
        className=" w-full "></iframe></div>
    </>
  );
};

export default GoogleCalendar;

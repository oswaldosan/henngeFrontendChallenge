import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import mails from "./data";
import logoImg from "./assets/logo.png";
import SysHead from "./components/sysHead";
import moment from "moment";
import MailContent from "./components/showMail";

function App() {
  const [allMails, setMails] = useState(mails);
  const [refreshArray, setRefresh] = useState(false);
  const [showBody, setBody] = useState(null);
  const [theEmail, setEmail] = useState(null);
  const [search, setSearch] = useState(null);

  //update array on screen
  useEffect(() => {
    setRefresh(true);
  }, [refreshArray]);

  //getCurrentMails
  const currentMails = allMails.length;

  function filterDate() {
    console.log("filter");
  }

  //search body of each mail
  function handleInput(e) {
    const params = e.target.value;
    setSearch(params);
    let NewArray = [];

    if (params.length > 2) {
      for (let i = 0; i < allMails.length; i++) {
        let str = allMails[i].text;
        let lowerCase = str.toLowerCase();
        let substr = search;
        const exist = lowerCase.includes(substr);
        console.log(exist);
        if (exist) {
          NewArray = [...NewArray];
          console.log(NewArray);
          NewArray.push(allMails[i]);
          setMails(NewArray);
        } else {
          setMails(NewArray);
        }
      }
    } else if (params < 2) {
      setMails(mails);
    }
  }

  //getDate of the email
  function getDate(wholeDate) {
    const newDate = moment(wholeDate).format("ll");
    return newDate;
  }

  //remove an email
  function removeEmail(i) {
    let newArray = allMails;
    newArray.splice(i, 1);
    setMails(newArray);
    setRefresh(false);
  }

  //open the email body
  function openMail(i, mail) {
    setEmail(mail);
    console.log(mail);
    setBody(true);
  }

  return (
    <div className="App">
      <SysHead currentMails={currentMails} handleInput={handleInput}></SysHead>

      <div
        className="mailBody"
        style={currentMails === 0 ? { backgroundImage: `url(${logoImg})` } : {}}
      >
        {refreshArray ? (
          <div>
            {currentMails > 0 ? (
              <div className={showBody ? "gridOnmail" : "notGrid"}>
                <div className={showBody ? "theTable mbHide" : "theTable"}>
                  <div className="tableHeader">
                    <div>From</div>
                    <div
                      style={
                        showBody ? { display: "none" } : { display: "block" }
                      }
                    >
                      To
                    </div>
                    <div>Subject</div>
                    <div className="lastRow">
                      Date{" "}
                      <div className="filterBtn" onClick={filterDate}></div>{" "}
                    </div>
                  </div>
                  <div className="tableBody">
                    {allMails.map((mail, i) => {
                      return (
                        <div>
                          <div className="eachMail" key={i}>
                            <div onClick={() => openMail(i, mail)}>
                              {showBody
                                ? mail.from.substring(0, 8) + "..."
                                : mail.from}{" "}
                            </div>
                            <div
                              style={
                                showBody
                                  ? { display: "none" }
                                  : { display: "block" }
                              }
                              onClick={() => openMail(i, mail)}
                            >
                              {mail.recipient}{" "}
                            </div>
                            <div onClick={() => openMail(i, mail)}>
                              {mail.subject.substring(0, 35)}...
                              {mail.attach ? (
                                <div className="haveAttach"></div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="theDate">
                              {getDate(mail.Date)}
                              <div
                                className="removeMail"
                                onClick={() => removeEmail(i)}
                              >
                                Remove
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {showBody ? (
                  <MailContent data={theEmail} showBody={setBody}></MailContent>
                ) : (
                  ""
                )}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;

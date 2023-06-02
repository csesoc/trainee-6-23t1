import React from 'react'
import { useNavigate } from 'react-router-dom'
import './landing.css'

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
    <div className="headerBarDiv">
      <a href="https://www.youtube.com/watch?v=-ZGlaAxB7nI" className="homeLink">Home</a>
      / COMP6969 - Rizzing Fundamentals
      <button className="registerButton" onClick={() => navigate("/register")}>Register</button>
      <button className="loginButton" onClick={() => navigate("/login")}>Login</button>
    </div>

    <div className="headerDiv">
      <span className="course">Course</span>
      <h1>Rizzing Fundamentals</h1>
      <span className="headerText">
        COMP6969 ​ ｜ ​​ ​ 69 Units of Credit
      </span>
    </div>

    <div className="flexContainer">
      <div className="flexLeft">
        <div>
          <a href="#overview">Overview</a>
          <a href="#conditions">Conditions for Enrolment</a>
          <a href="#what">What is this???</a>
        </div>
      </div>
      <div className="flexMiddle">
        <div>
          <h3 id="overview">Overview</h3>
          <p>
            An introduction to problem-solving via rizzing, which aims to develop 
            proficiency in using  high level rizzing tactics. It is typically taken
            in the second year of study, after COMP6911, to ensure an appropriate background
            in rizzing. The knowledge gained in COMP6969 is useful in a wide range of later-year 
            CS courses.
            <br></br>
            <br></br>
            The goal of the course is to expose students to:
            <br></br>
            <br></br>
            <li>high level rizzing</li>
            <li>absolutely incredible amounts of rizzing</li>
            <li>rizzing so strong it can trespass into the domain of the gods</li>
            <br></br>
            <br></br>
            <b>Topics:</b> <br></br>
            Algorizzms, rizzing structure (statements, suggestive language, dropping
            hints, sliding into DMs), social medias (Instagram, Snapchat), advanced tactics
            (auto-rizzing, forced interactions), introduction to analysis of algorizzms, testing,
            conversation quality.
          </p>
        </div>
        <div>
          <h3 id="conditions">Conditions for Enrolment</h3>
          <p>
            Prerequisites: COMP6911: Introduction to Rizzing AND (being human unless you
            are chatGPT???)
          </p>
        </div>
        <div>
          <h3 id="what">What is this???</h3>
          <p>
            finding new cse friends or maybe something more 😳
            <br></br>
            <br></br>
            <b>1)</b> make a profile <br></br>
            <b>2)</b> get into queue and match up <br></br>
            <b>3)</b> 5 minutes to chat 1v1 <br></br>
            <b>4)</b> the algorizzm™ will determine your compatability <br></br>
            <b>5)</b> maybe get sent each others socials?? ღゝ◡╹ )ノ♡
          </p>
        </div>
      </div>
      <div className="flexRight">
        <div>
          <b>Faculty</b>
          <br></br>
          <a href="https://www.dictionary.com/e/slang/rizz/#:~:text=The%20related%20term%20unspoken%20rizz,if%20she%20has%20a%20boyfriend%3F" 
          className="homeLink">
            Faculty of Engineering
          </a>
        </div>
        <div>
          <b>School</b>
          <br></br>
          <a href="https://www.youtube.com/watch?v=0jM3kAbXpGY" className="homeLink">School of Computer Science and Engineering</a>
        </div>
        <div>
          <b>Study Level</b>
          <p className="flexRightP">Undergraduate</p>
        </div>
        <div>
          <b>Offering Terms</b>
          <p className="flexRightP">Term 1, Term 2, Term 3</p>
        </div>
        <div>
          <b>Campus</b>
          <p className="flexRightP">Sydney</p>
        </div>
        <div>
          <b>Academic Calendar</b>
          <p className="flexRightP">3+</p>
        </div>
        <div>
          <b>Field of Education</b>
          <p className="flexRightP">06996 Rizzics</p>
        </div>
        <div>
          <b>Timetable</b>
          <br></br>
          <a href="https://www.facebook.com/unswlettersoflove/" className="homeLink">Visit timetable website for details</a>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}
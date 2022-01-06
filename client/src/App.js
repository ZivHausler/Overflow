import './App.css';
import Nav from './components/nav/Nav';
import Login from './pages/login-page/Login'
import HomePage from './pages/home-page/HomePage'
import CoursePage from './pages/course-page/CoursePage';
import Signup from './pages/signup-page/Signup';
import ExamPage from './pages/exam-page/ExamPage';
import PersonalInfo from './modals/personal-info/PersonalInfo'
import QuestionPage from './pages/question-page/QuestionPage';
import { Routes, Route } from "react-router-dom"
import Popup from './modals/popups/Popup'
import { useEffect, useState } from 'react';
import { createUser } from './API/usersApi';
import { useAuth0 } from '@auth0/auth0-react';
import SelectCourses from './pages/SelectCourses';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [contentUpdated, setContentUpdated] = useState(false);
  const [newSolutionUploaded, setNewSolutionUploaded] = useState(false);
  const [newExamUploaded, setNewExamUploaded] = useState(false);
  const [isNewUser, setIsNewUser] = useState(null);
  const [isListUpdated, setIsListUpdated] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { user, isLoading } = useAuth0();
  const [examDefenition, setExamDefenition] = useState('');



  useEffect(() => {
    if (user) {
      (async () => {
        const response = await createUser({
          "id": user.sub.split("|")[1],
          "firstname": user.given_name,
          "lastname": user.family_name,
          "email": user.email
        })
        if (!response.data.errors) {
          alert('this is a new user!');
          navigate('/selectCourses');
          setIsNewUser(true);
        }
        else {
          // navigate('/');
          setIsNewUser(false);
        }
      })()

    }
  }, [user])

  useEffect(() =>{
    if(!isLoading){
      if(!user)
        loginWithRedirect()
    }
  },[isLoading])

  useEffect(() => {
    if (isPopupOpen) {
      document.getElementById("mainDiv").classList.add("filter");
      document.getElementById("mainDiv").classList.add("blur-sm");
      document.getElementById("mainDiv").classList.add("pointer-events-none");
    }
    else {
      document.getElementById("mainDiv").classList.remove("blur");
      document.getElementById("mainDiv").classList.remove("blur-sm");
      document.getElementById("mainDiv").classList.remove("pointer-events-none");
    }
  }, [isPopupOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav isListUpdated={isListUpdated}/>
      {isPopupOpen && <Popup examDefenition={examDefenition} setNewExamUploaded={setNewExamUploaded} newExamUploaded={newExamUploaded} setNewSolutionUploaded={setNewSolutionUploaded} newSolutionUploaded={newSolutionUploaded} contentUpdated={contentUpdated} setContentUpdated={setContentUpdated} popupType={popupType} setIsPopupOpen={setIsPopupOpen} />}
      <div id="mainDiv">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isNewUser && <Route path="/selectCourses" element={<SelectCourses />} />}
          {!isNewUser && <Route path="/course=:courseID" element={<CoursePage setExamDefenition={setExamDefenition} isListUpdated={isListUpdated} setIsListUpdated={setIsListUpdated} contentUpdated={contentUpdated} setPopupType={setPopupType} setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen} />} />}
          <Route path="/course=:courseID/exam=:examID" element={<ExamPage examDefenition={examDefenition} setExamDefenition={setExamDefenition} newExamUploaded={newExamUploaded} newSolutionUploaded={newSolutionUploaded} contentUpdated={contentUpdated} setPopupType={setPopupType} setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen} />} />
          <Route path="/course=:courseID/exam=:examID/question=:questionID" element={<QuestionPage examDefenition={examDefenition} contentUpdated={contentUpdated} setPopupType={setPopupType} setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen} />} />
          {/* <Route path="/profile" element={<PersonalInfo />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

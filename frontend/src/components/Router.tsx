import { Route, Routes } from "react-router"

import Surveys from "./Surveys"
import NewSurveyForm from "./NewSurveyForm"
import SurveyPage from "./Survey"
import SurveyResult from "./SurveyResult"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Surveys />}/>
      <Route path="/new" element={<NewSurveyForm />}/>
      <Route path="/:surveyUuid" element={<SurveyPage />}/>
      <Route path="/:surveyUuid/result" element={<SurveyResult />}/>
    </Routes>
  )
}
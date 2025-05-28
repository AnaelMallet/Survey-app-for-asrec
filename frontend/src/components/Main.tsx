import { Route, Routes } from "react-router"

import Surveys from "./Surveys"
import NewSurveyForm from "./NewSurveyForm"

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Surveys />}/>
      <Route path="/new" element={<NewSurveyForm />}/>
    </Routes>
  )
}
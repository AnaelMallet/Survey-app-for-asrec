import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

type Response = {}

type Survey = {
  uuid: string
  subject: string
  description: string
  isUniqueUser: boolean
  responses: Response[]
}

export default function Surveys() {
  const [ surveys , setSurveys ] = useState<Survey[]>([])
  const [ message, setMessage ] = useState("")
  const navigate = useNavigate()

  async function fetchSurveys() {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/survey/getAll")
      const data = await res.json()
      
      if (data.length === 0) {
        setMessage(() => "Il n'y a aucun sondages pour le moment.")
        return
      }

      setSurveys(() => data)
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(() => {
    fetchSurveys()
  }, [])

  return (
    <section className="SurveySection">
    {surveys.length === 0 ? <p>{message}</p> : surveys.map((survey, index) => (
      <div key={index} className="Survey">
        <h1>{survey.subject}</h1>
        <p>{survey.description}</p>
        <div className="SurveyButtons">
          { survey.responses.length === 0 ?
            <>
              <Button
                id="ResponseSurvey"
                variant="contained"
                color="primary"
                onClick={() => navigate(`/${survey.uuid}`)}
              >Répondre au sondage</Button>
            </> : 
            <>
              <span className="AlreadyRespondMessage">Vous avez déjà répondu a ce sondage.</span>
            </>
          }
          <Button
            id="ResultSurvey"
            variant="contained"
            color="primary"
            onClick={() => navigate(`/${survey.uuid}/result`)}
          >Voir les résultats</Button>
        </div>
      </div>
    ))}
    </section>
  )
}
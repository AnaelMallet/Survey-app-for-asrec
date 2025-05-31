import { useEffect, useState } from "react"
import { useParams } from "react-router"

type Answer = {
  id: number
  response: string
}

type AnswerProportion = {
  response: number
  percentage: number
}

type SurveyProportion = {
  subject: string
  description: string
  answers: Answer[]
  proportions: AnswerProportion[]
}

export default function SurveyResult() {
  const { surveyUuid } = useParams()
  const [ surveyProportion, setSurveyProportion ] = useState<SurveyProportion>({
    subject: "",
    description: "",
    answers: [],
    proportions: []
  })

  async function fetchSurveyStatistics() {
      try {
        const res = await fetch(process.env.REACT_APP_API_URL + `/response/getBySurvey/${surveyUuid}`)

        const data = await res.json()

        

        setSurveyProportion(() => data)
      } catch (error) {
        console.error(error)
      }
    }
  
    useEffect(() => {
      fetchSurveyStatistics()
    }, [])

    if (Object.keys(surveyProportion).length === 0) return <></>

  return (
    <section className="SurveyContainer">
      <div className="Survey">
        <h1>{surveyProportion.subject}</h1>
        <p>{surveyProportion.description}</p>
        <section className="AnswerSection">
          { surveyProportion.answers.map((answer) => (
            <>
              <p style={{ "color": "black", "fontSize": "2vh", "marginBottom": "-2vh" }}>{surveyProportion.proportions.find((proportion) => proportion.response === answer.id)?.percentage}%</p>
              <p
                key={answer.id}
                className="ResponsePercentage"
                style={!surveyProportion.proportions.find((proportion) => proportion.response === answer.id) || surveyProportion.proportions.find((proportion) => proportion.response === answer.id)?.percentage as number < 1 ? { "backgroundColor": "transparent", "color": "black" } : { "width": `${surveyProportion.proportions.find((proportion) => proportion.response === answer.id)?.percentage}%` }}>{answer.response}
              </p>
            </>
            ))
          }
        </section>
      </div>
    </section>
  )
}
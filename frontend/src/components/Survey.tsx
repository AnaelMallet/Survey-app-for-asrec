import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup
} from "@mui/material"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

type Answer = {
  id: number
  response: string
}

type Survey = {
  subject: string
  description: string
  isUniqueAnswer: boolean
  answers: Answer[]
  responses: number[]
}

export default function SurveyPage() {
  const { surveyUuid } = useParams()
  const [ survey, setSurvey ] = useState<Survey>({
    subject: "",
    description: "",
    answers: [],
    responses: [],
    isUniqueAnswer: false
  })
  const [ selectedResponses, setSelectedResponses ] = useState<number[]>([])
  const [ message, setMessage ] = useState("")
  const [ messageIsError, setMessageIsError ] = useState(false)
  const [ isSurveyResponded, setIsSurveyResponded ] = useState(false)

  async function fetchSurvey() {
      try {
        const res = await fetch(process.env.REACT_APP_API_URL + `/survey/getOne/${surveyUuid}`)

        const data = await res.json()

        setSurvey(() => data)
      } catch (error) {
        setMessageIsError(() => true)
        setMessage(() => error as string)
      }
    }

    function handleSelectedResponse(responseId: number) {
      const responses = [...selectedResponses]

      if (selectedResponses.includes(responseId)) {
        const index = responses.indexOf(responseId)

        responses.splice(index, 1)

        setSelectedResponses(() => [...responses])
      } else {
        setSelectedResponses(() => [...responses, responseId])
      }
    }

    async function fetchData(responses: number[]) {
      try {
        await fetch(process.env.REACT_APP_API_URL + `/response/${surveyUuid}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ responses })
        })

        setMessageIsError(() => false)
        setMessage(() => "La réponse a été validée.")
        setIsSurveyResponded(() => true)

      } catch(error) {
        setMessageIsError(() => true)
        setMessage(() => error as string)
      }
    }

    function handleSubmit(e: any) {
      e.preventDefault()
      
      setMessageIsError(() => false)
      setMessage(() => "")

      if (selectedResponses.length === 0) {
        setMessageIsError(() => true)
        setMessage(() => "Sélectionner au moins une réponse.")
        return
      }

      fetchData(selectedResponses)
    }
  
    useEffect(() => {
      fetchSurvey()
    }, [])

    if (Object.keys(survey).length === 0) return <></>

  return (
    <section className="SurveyContainer">
      <div className="Survey">
        { survey.responses.length === 0 ?
          <>
            <h1>{survey.subject}</h1>
            <p>{survey.description}</p>
            <form onSubmit={handleSubmit}>
              <section className="AnswerSection">
                { survey.isUniqueAnswer ?
                  <RadioGroup>
                    {survey.answers.map((answer, index) => (
                      <FormControlLabel
                        id={`${answer.id}`}
                        name={`${answer.id}`}
                        key={index}
                        control={<Radio/>}
                        label={answer.response}
                        value={`${answer.id}`}
                        color="black"
                        onChange={() => setSelectedResponses(() => [answer.id])}
                      />
                    ))}
                  </RadioGroup>
                  :
                  <FormGroup>
                    {survey.answers.map((answer, index) => (
                      <FormControlLabel
                        id={`${answer.id}`}
                        name={`${answer.id}`}
                        value={`${answer.id}`} 
                        key={index}
                        control={<Checkbox/>}
                        color="black"
                        label={answer.response}
                        onChange={() => handleSelectedResponse(answer.id)}
                      />
                    ))}
                  </FormGroup>
                }
              </section>
              <section className="SubmitSection">
                { isSurveyResponded ? <></> : <Button color="success" type="submit" variant="contained" id="SubmitButton">Valider la réponse au sondage</Button> }
                { !!message === true ? <span className={classNames({
                  "SubmitMessage": true,
                  "ErrorMessage": messageIsError,
                  "SuccessMessage": !messageIsError
                })}>{message}</span> : <></> }
              </section>
            </form>
          </> :
          <>
            <span className="AlreadyRespondMessage">Vous avez déjà répondu a ce sondage.</span>
          </>
        }
      </div>
    </section>
  )
}
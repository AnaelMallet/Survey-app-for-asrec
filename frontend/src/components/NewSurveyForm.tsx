import {
  TextField,
  TextareaAutosize,
  Button,
  Checkbox, 
  FormGroup,
  FormControlLabel
} from '@mui/material'
import { CirclePlus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import classNames from "classnames"

export default function NewSurveyForm() {
  const [ subject, setSubject ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ answers, setAnswers ] = useState([{ response: "" }, { response: "" }])
  const [ isUniqueUser, setIsUniqueUser ] = useState(false)
  const [ isUniqueAnswer, setIsUniqueAnswer ] = useState(false)
  const [ message, setMessage ] = useState("")
  const [ messageIsError, setMessageIsError ] = useState(false)

  type AnswerDto = {
    response: string
  }

  type SurveyDto = {
    subject: string,
    description: string,
    answers: AnswerDto[],
    isUniqueUser: boolean,
    isUniqueAnswer: boolean
  }

  async function fetchData(dto: SurveyDto) {
    try {
      await fetch(process.env.REACT_APP_API_URL + "/survey/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ survey: dto })
      })

      setMessageIsError(() => false)
      setMessage(() => "Le sondage a été créé.")
    } catch(error) {
      setMessageIsError(() => true)
      setMessage(() => error as string)
    }
  } 

  async function handleSubmit(e: any) {
    e.preventDefault()

    setMessageIsError(() => false)
    setMessage(() => "")

    if (answers.length <= 1) {
      setMessageIsError(() => true)
      setMessage(() => "Le nombre de réponse possible est incorrect.")
      return
    }

    const createSurveyFormValues: SurveyDto = {
      subject,
      description,
      answers,
      isUniqueUser,
      isUniqueAnswer
    }

    await fetchData(createSurveyFormValues)
  }

  function handleAnswerFieldValueChange(index: number, value: string) {
    const fields = [ ...answers ]

    fields[index].response = value

    setAnswers(() => fields)
  }

  function handleDescriptionTextAreaChange(value: string) {
    setDescription(() => value)
  }

  function handleAddAnswersField() {
    setAnswers(() => [ ...answers, { response: "" } ])
  }

  function handleRemoveAnswersField(index: number) {
    const fields = [ ...answers ]
    
    fields.splice(index, 1)

    setAnswers(fields)
  }

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          id="SubjectTextField"
          label="Sujet du sondage"
          error={false}
          required
          onChange={(e) => setSubject(e.target.value)}
          helperText={false ? "helperText" : ""}
        />
        <TextareaAutosize
          id="DescriptionTextArea"
          required
          minRows={5}
          placeholder="Description du sondage"
          onChange={(e) => handleDescriptionTextAreaChange(e.target.value)}
        />
        {answers.map((field, index) => (
          <div key={index} className="AnswerFields">
            <TextField
              id="AnswerTextField"
              label="Réponse"
              value={field.response}
              sx={{ width: "70%" }}
              required
              onChange={(e) => handleAnswerFieldValueChange(index, e.target.value)}
            />
            <Button
              id="DeleteAnswerButton"
              startIcon={<Trash2/>}
              variant="contained"
              color="error"
              onClick={() => handleRemoveAnswersField(index)}
            >Supprimer</Button>
          </div>
        ))}
        <Button onClick={handleAddAnswersField} color="info" id="AddAnswerButton"><CirclePlus/>Ajouter une réponse</Button>
        <FormGroup>
          <FormControlLabel onChange={() => setIsUniqueUser(!isUniqueUser)} control={<Checkbox/>} color="black" label="Une réponse par utilisateur ?"/>
          <FormControlLabel onChange={() => setIsUniqueAnswer(!isUniqueAnswer)} control={<Checkbox/>} color="black" label="Un choix possible ?"/>
        </FormGroup>
        <section className="SubmitSection">
          <Button color="success" type="submit" variant="contained" id="SubmitButton">Créer le sondage</Button>
          { !!message === true ? <span className={classNames({
            "SubmitMessage": true,
            "ErrorMessage": messageIsError,
            "SuccessMessage": !messageIsError
          })}>{message}</span> : <></> }
        </section>
      </form>
    </div>
  )
}
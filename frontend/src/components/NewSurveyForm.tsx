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

export default function NewSurveyForm() {
  const [ subject, setSubject ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ answers, setAnswers ] = useState([{ response: "" }, { response: "" }])
  const [ isUniqueUser, setIsUniqueUser ] = useState(false)
  const [ isUniqueAnswer, setIsUniqueAnswer ] = useState(false)
  const [ error, setError ] = useState("")

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

    } catch(err) {
      console.error(err)
    }
  } 

  function handleSubmit(e: any) {
    e.preventDefault()

    setError(() => "")

    if (answers.length <= 1) {
      setError(() => "Le nombre de réponse possible est incorrect.")
      return
    }

    const createSurveyFormValues: SurveyDto = {
    subject,
    description,
    answers,
    isUniqueUser,
    isUniqueAnswer
  }

  fetchData(createSurveyFormValues)
  }

  function handleAnswerFieldValueChange(index: number, e: any) {
    const fields = [ ...answers ]

    fields[index].response = e.target.value

    setAnswers(fields)
  }

  function handleDescriptionTextAreaChange(e: any) {
    setDescription(() => e.target.value)
  }

  function handleAddAnswersField() {
    setAnswers([ ...answers, { response: "" } ])
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
          onChange={(e) => handleDescriptionTextAreaChange(e)}
        />
        {answers.map((field, index) => (
          <div key={index} className="AnswerFields">
            <TextField
              id="AnswerTextField"
              label="Réponse"
              value={field.response}
              sx={{ width: "70%" }}
              required
              onChange={(e) => handleAnswerFieldValueChange(index, e)}
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
          <FormControlLabel onChange={() => setIsUniqueUser(!isUniqueUser)} control={<Checkbox/>} color="black" label="Réponse unique ?"/>
          <FormControlLabel onChange={() => setIsUniqueAnswer(!isUniqueAnswer)} control={<Checkbox/>} color="black" label="Sélection unique ?"/>
        </FormGroup>
        <section className="SubmitSection">
          <Button color="success" type="submit" variant="contained" id="SubmitButton">Créer le sondage</Button>
          { !!error === true ? <span className="SubmitError">{error}</span> : <></> }
        </section>
      </form>
    </div>
  )
}
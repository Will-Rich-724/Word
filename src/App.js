import react, { useState } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

require("dotenv").config()

function App() {
  const [word, setWord] = useState();
  const [output, setOutput] = useState();

  const checkWord = (e) => {
    e.preventDefault();
    axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}`)
      .then((res) => {
        console.log(res.data)
        if (res.data[0].hwi.hw === word) {
          setOutput(`Yes ${word} is ${res.data[0].shortdef[0]}`)
        } else {
          setOutput(`NO! ${word} is not a word`)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="App">
      <h1>Is This a Word?</h1>
      <Form onSubmit={checkWord}>
        <Form.Group>
          <Form.Label>Word</Form.Label>
          <Form.Control type="string" placeholder="type some letters" onChange={e => setWord(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" >Find Out</Button>
      </Form>
      {output ? <h2>{output}</h2> : null}
    </div>
  );
}

export default App;

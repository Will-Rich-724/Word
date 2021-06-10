import react, { useState, useEffect } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

require("dotenv").config()

function App() {
  const [word, setWord] = useState("");
  const [output, setOutput] = useState("");
  const [letters, setLetters] = useState(0)

  const checkWord = (e) => {
    e.preventDefault();
    axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.REACT_APP_API_KEY}`)
      .then((res) => {
        console.log(res.data)
        if (res.data.length < 20) {
          setOutput(`Yes ${word} is ${res.data[0].shortdef[0]}`)
        } else {
          setOutput(`NO! ${word} is not a word`)
        }
      })
      .catch((err) => console.log(err))
  }

  const randomWord = (e) => {
    e.preventDefault()
    console.log("randomWord was run")
    var count = letters
    const alphabet ="abcdefghijklmnopqrstuvwxyz"
    var newWord = []
    var i = 0
    while (i < count) {
      var newLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      newWord.push(newLetter)
      i++
    }
    var finalWord = newWord.join("")
    console.log(typeof(finalWord))
    this.setWord({word : finalWord}, () => {this.randomWord()})
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
      <h3>Or Try Let Us Try a Random Amount of Letters</h3>
      <Form onSubmit={randomWord}>
        <Form.Group>
        <Form.Label>Number of Letters</Form.Label>
        <Form.Control type="number" min="1" max="10" step="1" onChange={e => setLetters(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="Submit">Try</Button>
      </Form>
      {output ? <h2>{output}</h2> : null}
    </div>
  );
}

export default App;

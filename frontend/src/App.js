import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'


const password = prompt ("What is the password?")
console.log(process.env.REACT_APP_BACKEND_BASEURL)

//fetching from the BE to the FE
// const url = (process.env.REACT_APP_BACKEND_BASEURL) +"/messages"
// fetch(url)

function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")


  useEffect(() =>{

    const url = "https://be-example-messageboard.herokuapp.com//messages"
    const config = {
      headers: {
        "Authorization": password
      }
    }

    fetch(url)
      .then(response => response.json())
      .then(result => {

        if (result.error){
          alert("Error: " + result.error)
          return;
        }

        setMessages(result)
      })
        
      .catch(error => {
        console.error(error)
        alert(error.message)
      })


  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const url ="http://localhost:4000/messages"
    const payload ={name, message}

    const config = {
      method: "POST",
      headers: {
        "Authorization": password,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(payload)
    }

    fetch(url, config)
      .then( response => response.json())
      .then(result => {
        setMessages([...messages, result.message ])
      })
      .catch(error => {
      console.error(error)
      })
  }
  console.log(messages)

  return (
    <div className="App">
      <h1>Message board</h1>
    <Form onSubmit={handleSubmit}>

        <Form.Group 
        className="mb-3" 
        controlId="formBasicEmail">

              <Form.Label>Name</Form.Label>
              <Form.Control type="text" 
              placeholder="Name"
              onChange={e => setName(e.target.value)} />
              
        </Form.Group>

        <Form.Group 
        className="mb-3" 
        controlId="formBasicPassword">

              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" 
              rows={3} 
              placeholder="Password"
              onChange={e => setMessage(e.target.value)} />

        </Form.Group>

        <Form.Group 
        className="mb-3" 
        controlId="formBasicCheckbox">
          
        </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <ul>
      {messages.map (msg => <li key={msg.id}> {msg.name}: {msg.message}</li>)}
    </ul>
    </div>
  );
}

export default App;

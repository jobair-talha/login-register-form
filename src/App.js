import { Button, Container, Form } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebaseInit from "./firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

firebaseInit();

function App() {
  const auth = getAuth();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);

  const handleEmail = (e) => {
    const isEmailValid =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      );
    if (isEmailValid) {
      setError("");
      setEmail(e.target.value);
    } else {
      setError("Sorry Enter Valid Email");
    }
  };
  const handlePassword = (e) => {
    const isValidPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(e.target.value);
    if (isValidPassword) {
      setError("");
      setPassword(e.target.value);
    } else {
      setError("Enter Valid Password");
    }
  };
  const handleIsLogIn = (e) => {
    setIsLogIn(e.target.checked);
  };
  const createNewUser = (e) => {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      const user = res.user;
      console.log(user);
    });
    e.preventDefault();
    setError("Register Success");
  };
  const signInUser = (e) => {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      const user = res.user;
      console.log(user);
    });
    e.preventDefault();
    setError("Log In Success");
  };
  return (
    <div className="App">
      <Container>
        <Form onSubmit={isLogIn ? signInUser : createNewUser}>
          <h2>Please {isLogIn ? "Log In" : "Sign Up"}</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleEmail}
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handlePassword}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleIsLogIn}
              type="checkbox"
              label="Already have an account"
            />
          </Form.Group>
          <div className="text-danger">{error}</div>
          <Button variant="primary" type="submit">
            {isLogIn ? "LogIn" : "Sign Up"}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default App;

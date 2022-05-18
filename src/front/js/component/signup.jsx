import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [dob, setDob] = useState("");
  const { store, actions } = useContext(Context);
  let history = useHistory();
  const is_active = true;
  if (is_active == true) {
    history.push();
  }
  return (
    <form>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          value={email}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setEmail(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputFirstName1">First Name</label>
        <input
          value={first_name}
          type="FirstName"
          className="form-control"
          id="exampleInputFirstName1"
          onChange={(e) => setFirst_name(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputLouisName1">Last Name</label>
        <input
          value={last_name}
          type="LastName"
          className="form-control"
          id="exampleInputLouisName1"
          onChange={(e) => setLast_name(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputDob1">Dob</label>
        <input
          value={dob}
          type="Dob"
          className="form-control"
          id="exampleInputDob1"
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          actions.signUp({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            dob: dob,
          });
          history.push("/login");
        }}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

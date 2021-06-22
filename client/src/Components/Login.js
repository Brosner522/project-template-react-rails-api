import React, { Component } from "react";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    age: "",
    profile_img: "",
    password_digest: "",
  };

  handleLogin = (e) => {
    e.preventDefault();
    // console.log(e)
    let filteredArray = this.props.users.filter((user) => {
      return user.username.toLowerCase() === e.target[0].value.toLowerCase();
    });
    if (filteredArray.length > 0) {
      this.props.handleLogInUser(filteredArray);
      this.props.history.push("/");
      console.log(filteredArray);
      alert(`Welcome back ${filteredArray[0].username}`);
    } else alert("Invalid User");
  };

  handleSignup = () => {
    let newUser = {
      username: this.state.username,
      age: this.state.age,
      profile_img: this.state.profile_img,
      password_digest: this.state.password_digest,
    };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((res) => {
      if (res.status === 200) {
        res.json();
      } else if (res.status === 400) {
        alert("User already exists!");
      }
    });
  };

  render() {
    return (
      <div className="forms">
        <form className="login" onSubmit={(e) => this.handleLogin(e)}>
          <label>
            Log In
            <p className="login-input">
              <input
                type="text"
                placeholder="Enter your username"
                username="username"
              />
            </p>
            <p className="login-input">
              <input
                type="text"
                placeholder="Enter your password"
                password="password"
              />
            </p>
          </label>
          <p className="login-input">
            <input className="login-btn" type="submit" value="Log In" />
          </p>
        </form>

        <form className="signup" onSubmit={this.handleSignUp}>
          <label>
            Sign Up
            <p className="login-input">
              <input
                type="text"
                placeholder="Choose a user name"
                username="username"
                value={this.state.username}
              />
            </p>
            <p className="login-input">
              <input
                type="number"
                placeholder="Please enter your age"
                age="age"
              />
            </p>
            <p className="login-input">
              <input
                type="url"
                placeholder="Upload a picture"
                profile_img="profile image"
              />
            </p>
            <p className="login-input">
              <input
                type="text"
                placeholder="Choose a password"
                password="password"
              />
            </p>
          </label>
          <p className="login-input">
            <input className="signup-btn" type="submit" value="Sign Up" />
          </p>
        </form>
      </div>
    );
  }
}

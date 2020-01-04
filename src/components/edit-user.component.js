import React, { Component } from "react";
import axios from "axios";

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ""
      //   users: []
    };
  }

  componentDidMount() {
    // console.log(this.props.match.params.id);
    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    // axios
    //   .get("http://localhost:5000/users/")
    //   .then(response => {
    //     this.setState({ users: response.data.map(user => user.username) });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    console.log("hey joker says " + this.state.username + "hello");
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    };

    console.log(user);

    axios
      .post(
        "http://localhost:5000/users/update/" + this.props.match.params.id,
        user
      )
      .then(res => console.log(res.data));

    window.location = "/userlist";
  }

  render() {
    return (
      <div>
        <h3>Edit User Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

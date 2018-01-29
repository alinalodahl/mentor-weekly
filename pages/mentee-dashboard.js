import React from "react";
import Router from "next/router";
import Dashboard from "../components/dashboard";
import DefaultMessage from "../components/default-message";
import MatchInfo from "../components/match-info";
import UpdateProfileModal from "../components/update-profile-modal";
import Auth from "../services/auth";

const auth = new Auth();

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateModalIsOpen: false,
      user: {
        id: "",
        name: {
          firstName: "",
          lastName: ""
        },
        photoUrl: "",
        creationDate: "",
        role: "",
        goals: "",
        experience: "",
        skills: "",
        organization: "",
        contact: "",
        portfolioUrl: "",
        potentialMentees: "",
        mentees: [],
        mentors: [],
        lookingFor: "",
        //mentee fields only
        background: "",
        availability: ""
      },
      error: ""
    };
  }

  componentDidMount() {
    this.getUserFromApi();
  }

  getUserFromApi() {
    auth.getProfile((_, profile) => {
      console.log(profile.sub);
      fetch("/api/users/" + profile.sub, {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`
        }
      })
        .then(res => {
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          return res.json();
        })
        .then(user =>
          this.setState({
            user: user,
            error: ""
          })
        )
        .then(
          () =>
            this.state.user.role === "mentor"
              ? Router.replace("http://localhost:8080/mentor-dashboard")
              : null
        )
        .catch(err =>
          this.setState({
            error: "Could not load user"
          })
        );
    });
  }

  openModal(event) {
    event.preventDefault();
    this.setState({ updateModalIsOpen: true });
  }

  closeModal(event) {
    event.preventDefault();
    this.setState({ updateModalIsOpen: false });
  }

  render() {
    const mentorInfoCards = this.state.user.mentors.map((mentor, index) => (
      <MatchInfo user={mentor} key={index} />
    ));
    return (
      <div className="dashboard-div">
        <Dashboard
          user={this.state.user}
          title="my mentor info"
          dashboard={true}
          loggedin={true}
          openUpdateModal={e => this.openModal(e)}
        >
          {this.state.user.mentors[0] ? (
            mentorInfoCards
          ) : (
            <DefaultMessage role="mentee" />
          )}
        </Dashboard>
        {this.state.updateModalIsOpen ? (
          <UpdateProfileModal
            role="mentee"
            user={this.state.user}
            loggedin={true}
            closeModal={e => this.closeModal(e)}
            updateDashboard={() => this.getUserFromApi()}
          />
        ) : null}
      </div>
    );
  }
}
//  <Header text={name} />

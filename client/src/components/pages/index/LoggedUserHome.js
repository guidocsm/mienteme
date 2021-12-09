
import React, { Component, createContext } from "react";
import CreateUser from "../createUser/CreateUser";
import UserCard from '../allUsers/userCard/UserCard'
import FooterNav from "../footerNav/FooterNav";
import { Form, Button, Modal, Container, Link } from 'react-bootstrap'
import PeopleService from "../../services/people.service";
import CheckFirstFormService from "../../services/checkFirstFormService.service";
import RequestService from "../../services/request.service";
import HeaderNav from "../headerNav/HeaderNav";

const MatchContext = createContext(null)


class LoggedUserHome extends Component {

    constructor() {
        super()

        this.state = {
            people: [],
            datesPeople: [],
            allUsersPending: [],
            datesUserPending: [],
            allUsersSecondsOpportunities: [],
            datesUserSecondsOpportunities: [],
            username: "",
            profileImages: "",
            age: "",
            genre: "",
            bio: "",
            filter: {},
            city: "",
            questionTrue: "",
            questionFalse: "",
            clue: "",
            CheckFirstForm: false,
            showForm: true,
            selectedUser: "",
            selectedUserPending: "",
            selectedUserSecondOpportunities: ""

        }

        this.PeopleService = new PeopleService()
        this.serviceCheckForm = new CheckFirstFormService()
        this.serviceRequest = new RequestService()


    }

    componentDidMount() {
        // this.showForm() 

        // if(!this.state.showForm) {
        this.refreshUsers()
        // }


    }

    // showForm = () => {
    //   this.serviceCheckForm.check()
    //   .then(response => {
    //     console.log(response.data)
    //     response.data.CheckFirstForm &&
    //     this.setState({ showForm: false }) })
    //   .catch(err => console.log(err))
    // }

    refreshUsers = () => {
        // const minAge = this.state.filter.age[0]
        // const maxAge = this.state.filter.age[1]
        // const filterByGenre = this.state.filter.genre

        this.PeopleService.getAllUsers()
            .then(response => {

                // if(filterByGenre === "WOMEN"){
                // const people = response.data.filter((elm) => elm.filter.genre === "WOMEN")
                // people.filter((elm) => (elm >= minAge) && (elm <= maxAge))
                // this.setState({ people: people })
                // }

                // if(filterByGenre === "MEN"){
                //   const people = response.data.filter((elm) => elm.filter.genre === "MEN")
                //   people.filter((elm) => (elm >= minAge) && (elm <= maxAge))
                //   this.setState({ people: people })
                //   }

                // else {
                const people = response.data
                console.log("estoy mirando la respuesta", response.data)
                this.setState({ people: people }, () => this.randomUserGlobal())
                // }

            })
            .catch(err => console.log(err))
    }


    randomUserGlobal = () => {
        const randomUser = Math.floor(Math.random() * this.state.people.length)
        const copyPeople = [...this.state.people]
        const newRandomUser = copyPeople.splice(randomUser, 1)



        this.setState({
            selectedUser: newRandomUser,
            people: copyPeople,
        })
    }

    randomUserPending = () => {
        const randomUser = Math.floor(Math.random() * this.state.allUsersPending.length)
        const copyPendingPeople = [...this.state.allUsersPending]
        const newRandomUser = this.state.allUsersPending?.splice(randomUser, 1)
        this.setState({
            selectedUserPending: newRandomUser,
            allUsersPending: copyPendingPeople
        })
    }

    randomUserSecondsOpportunities = () => {
        const randomUser = Math.floor(Math.random() * this.state.allUsersSecondsOpportunities.length)
        const copySecondsOpportunitiesPeople = [...this.state.allUsersSecondsOpportunities]
        const newRandomUser = this.state.allUsersSecondsOpportunities?.splice(randomUser, 1)

        this.setState({
            selectedUserSecondOpportunities: newRandomUser,
            allUsersSecondsOpportunities: copySecondsOpportunitiesPeople
        })
    }

    // nextPending = () => {
    //   this.randomUserPending()
    // }


    getRequestPending = () => {
        this.serviceRequest.getAllRequestPending()
            .then(response => {
                let usersPendings = response.data
                this.setState({
                    allUsersPending: usersPendings,
                }, () => this.randomUserPending())

            })
            .catch(err => console.log(err))


    }

    getSecondsOpportunities = () => {
        this.serviceRequest.getAllSecondsOpportunities()
            .then(response => {
                let usersSecondsOpportunities = response.data
                this.setState({
                    allUsersSecondsOpportunities: usersSecondsOpportunities,
                })
            }, () => this.randomUserSecondsOpportunities())
            .catch(err => console.log(err))

    }



    render() {
        return (
            <>

                <Modal>
                    <Modal.Header closeButton>
                        <Modal.Title>Crea tu usuario</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <CreateUser />

                    </Modal.Body>
                    {/* <Modal.Footer>
                <Button onClick={() => setModal(!modal)} variant="primary" type="submit">
                  Crea tu primer cita
                </Button>
            </Modal.Footer> */}
            
            <HeaderNav />

                </Modal>
                {this.state.selectedUser ? (<UserCard {...this.state.selectedUser} next={this.randomUserGlobal}/>) : null}

                <FooterNav />

                {/* <Conversations />

          <UsersRequestPendingCard />
          <SearchCard />
          <ProfileCard />
          <UsersSecondOpportunitiesCard /> */}


                {/* <UserProfile refreshUsers={this.refreshUsers} people={this.state.people} /> */}

            </>
        )
    }

}

export default LoggedUserHome
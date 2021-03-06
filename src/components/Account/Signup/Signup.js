import React, { Component, Fragment } from 'react'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import './Signup.css'
import { auth } from '../../../firebase'

class Signup extends Component {
    state = {
        newUser: {
            useremail: '',
            password: '',
            passwordVerify: '',
        },
        errorMessage: '',
        LoadedData: false,
    }

    componentWillMount = () => {
        auth.onAuthStateChanged(user => {
            if (user)
                this.props.history.push('/')
        })
        this.setState({
            LoadedData: true
        })
    }

    onChangeHandler = (e) => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value
            }
        })
    }

    onSubmitHandler = (e) => {
        if (this.state.newUser.password !== this.state.newUser.passwordVerify) {
            this.setState({ errorMessage: 'Passwords do not match.' })
            return
        }
        auth.createUserWithEmailAndPassword(this.state.newUser.useremail, this.state.newUser.password)
            .then(() => this.props.history.push('/'))
            .catch(err => {
                console.log(err.code, err.message)
                this.setState({ errorMessage: err.message })
            })
        e.preventDefault()
    }

    render() {
        let signUpView = null

        if (this.state.LoadedData)
            signUpView = (
                <Form className="Form">
                    <div className="SignupTitle">Sign up today!</div>
                    {this.state.errorMessage ? <Label className="text-danger">{this.state.errorMessage}</Label> : null}
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <Input type="text" name="username" onChange={this.onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="useremail">Email:</Label>
                        <Input type="email" name="useremail" onChange={this.onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input type="password" name="password" onChange={this.onChangeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordVerify">Re-enter Password:</Label>
                        <Input type="password" name="passwordVerify" onChange={this.onChangeHandler} />
                    </FormGroup>
                    <div className="text-center">
                        <FormGroup className="my-0">
                            <Input type="checkbox" name="tos" onChange={this.onChangeHandler} />
                            <Label for="tos">Agree to TOS</Label>
                        </FormGroup>
                        <FormGroup className="my-0">
                            <Input type="checkbox" name="tos" onChange={this.onChangeHandler} />
                            <Label for="tos">Placeholder</Label>
                        </FormGroup>
                    </div>
                    <Button onClick={this.onSubmitHandler}>Submit</Button>
                </Form>
            )

        return (
            <Fragment>
                {signUpView}
            </Fragment>
        )
    }
}


export default Signup
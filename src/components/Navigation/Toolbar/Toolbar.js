import React, { Component, Fragment } from 'react'
import './Toolbar.css'
import { connect } from 'react-redux'
import firebase, { auth } from '../../../firebase'
import { delete_user, store_user, loadPostsFromDb } from '../../../store/actions/actions'
import { withRouter } from 'react-router-dom'
import Logo from '../../../assets/images/logo.png'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    NavItem,
    NavLink,
} from 'reactstrap'

class Toolbar extends Component {
    state = {
        loginInfo: {
            useremail: '',
            password: '',
        },
        errorMessage: null,
        LoadedData: false,
        isOpen: false,
        unsubscribe: null
    }

    componentDidMount = () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            if (user)
                this.props.onStoreUser(user)
            this.props.loadPostsFromDb()
            this.setState({
                user: user,
                LoadedData: true,
                isOpen: false,
                unsubscribe: unsubscribe
            })
        })
    }

    componentWillUnmount = () => {
        this.state.unsubscribe()
    }
    
    routeClickHandler = (e) => {
        this.props.history.push(`/${e.target.name}`)
        this.toggle()
    }

    onChangeHandler = (e) => {
        this.setState({
            loginInfo: {
                ...this.state.loginInfo,
                [e.target.name]: e.target.value
            }
        })
    }

    onSubmitLoginHandler = (e) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        auth.signInWithEmailAndPassword(this.state.loginInfo.useremail, this.state.loginInfo.password)
            .catch(err => {
                this.setState({
                    errorMessage: err.message
                })
            })
    }

    onLogoutClickHandler = () => {
        auth.signOut()
            .then(() => {
                this.props.onDeleteUser()
                this.setState({
                    loginInfo: {
                        useremail: '',
                        password: '',
                    },
                    errorMessage: null,
                })
            })
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let userMenu = null

        let displayErrorMessage = this.state.errorMessage ? <Label className="text-danger">{this.state.errorMessage}</Label> : null

        if (this.state.LoadedData) {
            if (this.props.user)
                userMenu = (
                    <Fragment>
                        <DropdownToggle nav caret>
                            {this.props.user.email}
                        </DropdownToggle>
                        <DropdownMenu right className="DropDownMenu">
                            <DropdownItem name="profile" onClick={this.routeClickHandler}>
                                Profile
                            </DropdownItem>
                            <DropdownItem>
                                Account Settings
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.onLogoutClickHandler}>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Fragment>
                )
            else
                userMenu = (
                    <Fragment>
                        <DropdownToggle nav caret>
                            Login
                        </DropdownToggle>
                        <DropdownMenu right className="DropDownMenu">
                            <Form className="px-4 py-2">
                                <FormGroup>
                                    {displayErrorMessage}
                                    <Label for="useremail">Email:</Label>
                                    <Input type="email" name="useremail" onChange={this.onChangeHandler} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password:</Label>
                                    <Input type="password" name="password" onChange={this.onChangeHandler} />
                                </FormGroup>
                                <Button type="button" className="btn-block" onClick={this.onSubmitLoginHandler}>Submit</Button>
                            </Form>
                            <DropdownItem divider />
                            <DropdownItem name="signup" className="text-center text-primary" onClick={this.routeClickHandler}>
                                Signup
                            </DropdownItem>
                        </DropdownMenu>
                    </Fragment>
                )
        }
        return (
            <Fragment>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/"><img className="Logo" src={Logo} alt='logo.png' /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://drive.google.com/open?id=1M86Qq4FVHdtDwgiEjIY5etuqhXX3qTnz">Resume</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/d1a9x8u9/twitterClone">GitHub</NavLink>
                            </NavItem>
                            <Nav navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    {userMenu}
                                </UncontrolledDropdown>
                            </Nav>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userPreCombine.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteUser: () => dispatch(delete_user()),
        onStoreUser: (user) => dispatch(store_user(user)),
        loadPostsFromDb: () => dispatch(loadPostsFromDb()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar))
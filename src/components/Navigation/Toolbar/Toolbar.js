import React, { Component, Fragment } from 'react'
import './Toolbar.css'
import { connect } from 'react-redux'
import { store_user, delete_user } from '../../../store/actions/actions'
import { auth } from '../../../firebase'
import { Link } from 'react-router-dom'
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
    Button
} from 'reactstrap'

class Toolbar extends Component {
    state = {
        loginInfo: {
            useremail: '',
            password: '',
        },
        errorMessage: null,
        LoadedData: false,
    }

    componentWillMount = () => {
        auth.onAuthStateChanged(user => {
            if(user) 
                this.props.onStoreUser(user)
            this.setState({
                LoadedData: true
            })
        })
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
        auth.signInWithEmailAndPassword(this.state.loginInfo.useremail, this.state.loginInfo.password)
        .catch( err => {
            this.setState({
                errorMessage: err.message
            })
        })
        e.preventDefault()
    }

    onLogoutClickHandler = () => {
        auth.signOut()
            .then( () => this.props.onDeleteUser())
    }
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let userMenu = null 

        let displayErrorMessage = this.state.errorMessage ? <Label className="text-danger">{this.state.errorMessage}</Label> : null 

        if(this.state.LoadedData) {
            if(this.props.user) 
                userMenu = (
                    <Fragment>
                        <DropdownToggle nav caret>
                            {this.props.user.email}
                        </DropdownToggle>
                        <DropdownMenu right className="DropDownMenu">
                            <DropdownItem>
                                Profile
                            </DropdownItem>
                            <DropdownItem>
                                Account Settings
                            </DropdownItem>
                            <DropdownItem divider/>
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
                                    <Input type="email" name="useremail" onChange={this.onChangeHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password:</Label>
                                    <Input type="password" name="password" onChange={this.onChangeHandler}/>
                                </FormGroup>
                                <Button type="button" onClick={this.onSubmitLoginHandler}>Submit</Button>
                            </Form>
                            <DropdownItem divider />
                            <div className="Link">
                                <Link to="/signup">Sign up</Link>
                            </div>
                        </DropdownMenu>
                    </Fragment>
                )
        }
        return (
            <Fragment>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">Twitter</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <Nav className="ml-auto" navbar>
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
        onStoreUser: (user) => dispatch(store_user(user)),
        onDeleteUser: () => dispatch(delete_user())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
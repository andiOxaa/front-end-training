import React from "react";
import {Button, Card, CardContent, OutlinedInput, TextField, withStyles} from "@material-ui/core";
import nyc from './assets/nyc.jpg';
import sanFrancisco from './assets/sanfrancisco.jpg';
import america from './assets/America.jpg';
import Logo from "presentations/icons/Logo";
import LogoTextIcon from "presentations/icons/LogoTextIcon";
import {connect} from "react-redux";
import ACTIONS from "reducers/shop/ShopActionTypes";
import {Redirect, withRouter} from "react-router-dom";

const styles = () => ({
    root: {
        width: '100%',
        height: 1000,
        backgroundImage: `url(${america})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: 0.9
    },
    card: {
        backgroundColor: '#ffffff',
        width: '25rem',
        height: 'auto',
        marginLeft: 100,
        borderRadius: '1.2rem',
        position: 'absolute',
        marginTop: 50,
        boxShadow: '5px 5px 20px'
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *:first-child': {
            marginTop: 30,
            marginBottom: 8
        }
    },
    fields: {
        display: 'flex',
        flexDirection: 'column',
        '& > *:first-child': {
            marginTop: 60,
        },
        '& > *': {
            marginBottom: 20
        }
    },
    registerBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingBottom: 30,
        '& > *:first-child': {
            backgroundColor: '#45acd6',
            width: '50%',
            fontWeight: 'bold'
        }
    }
})

class Register extends React.Component {

    state = {
        user: {
            firstName: '',
            lastName: '',
            email: '',
            username:'',
            password:'',
            cart:[]
        },
        errors:{}
    }


    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            user:{...this.state.user,[name]:value}
        })
    }

    console = () => {
        console.log('Local State',this.state)
    }

    formValidation = () => {
        const {firstName, lastName, email, username, password} = this.state.user
        this.setState({
            errors:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                username:username,
                password:password
            }
        })
    }


    render() {
        const {classes,users,history,onRegister} = this.props
        const {firstName,lastName,email,username,password} = this.state.errors

        const registerTriggered = () => {
            const {user} = this.state
            this.formValidation();
            if(user.firstName === '' || user.lastName === '' || user.email === '' || user.username === '' || user.password === '') {
                return;
            }
            onRegister(user)
            history.push('/lecture/ePrime/products')
        }

        console.log("Register users:",users)
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent>
                        <div className={classes.logo}>
                            <Logo style={{fontSize: '50px'}}/>
                            <LogoTextIcon style={{width: '100%', height: 35}}/>
                        </div>
                        <div className={classes.fields}>
                            <TextField id="outlined-basic" label="First Name" variant="outlined" error={firstName === ''} name="firstName"
                                       onChange={this.handleChange}/>
                            <TextField id="outlined-basic" label="Last Name" variant="outlined"  error={lastName === ''} name="lastName"
                                       onChange={this.handleChange}/>
                            <TextField id="outlined-basic" label="Email" variant="outlined" error={email === ''} name="email"
                                       onChange={this.handleChange}/>
                            <TextField id="outlined-basic" label="Username" variant="outlined" error={username === ''} name="username"
                                       onChange={this.handleChange}/>
                            <TextField id="outlined-basic" label="Password" variant="outlined" error={password === ''} name="password"
                                       type="password" onChange={this.handleChange}/>
                        </div>
                        <div className={classes.registerBtn}>
                            <Button variant="contained" onClick={registerTriggered}>Register</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister : (user) => dispatch({type:ACTIONS.REGISTER,user:user})
    }
};

const mapStateToProps = state => {
    return {
        users: state.shop.shop.users
    }
};
export default withRouter(withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Register)))
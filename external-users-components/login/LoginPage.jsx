import React from 'react';
import { checkURLAuthorizationByRole } from '../../utility/authorizationServiceBasedURL.js';

const styles = {
    loginPage: {
        backgroundImage: `url("https://assets.healthytokyo.com/wp-content/uploads/20180819204030/arms-care-check-905874.jpg")`
    }
};

export default class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error_message: ""
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ error_message: props.authenticationFail })

        if (props.authentication.authenticated) {
            if (this.props.location.state !== undefined) {
                const { from } = this.props.location.state
                console.log("from",from)
                if (checkURLAuthorizationByRole(from.pathname, props.authentication.userRole[0].authority)) {
                    this.props.history.push(from.pathname);
                } else {
                    this.props.history.push("/error401");
                }
            } else {
                this.props.history.push("/home");
            }
        }
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    handleLogin(e) {
        e.preventDefault();
        if (this.state.username === "") {
            this.setState({ error_message: "Username can't be empty." });
            return;
        } else if (this.state.password === "") {
            this.setState({ error_message: "Password can't be empty." });
            return;
        } else {
            this.props.login({ username: this.state.username, password: this.state.password });
            this.setState({ username: "", password: "" });
        }
    }

    render() {
        return (
            <div className="login-page" style={styles.loginPage}>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-12"></div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <form className="form-container">
                            {this.state.error_message !== "" ?
                                <div style={{ color: "red" }}>
                                    {this.state.error_message}
                                </div> : null}

                            <div className="form-group">
                                <label>Username:</label>
                                <input type="text" className="form-control" name="username" value={this.state.username}
                                    onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className="form-group mb-30">
                                <label>Password:</label>
                                <input type="password" className="form-control" name="password" value={this.state.password}
                                    onChange={this.handleChange.bind(this)} />
                            </div>

                            <button type="submit" className="btn btn-default btn-block btn-login" onClick={this.handleLogin.bind(this)}>
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12"></div>
                </div>
            </div>
        )
    }
}
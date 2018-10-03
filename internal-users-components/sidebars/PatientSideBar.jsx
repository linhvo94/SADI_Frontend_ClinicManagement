import React from "react";
import { Link } from 'react-router-dom';
import patientIcon from '../../style/patient.png';

export default class PatientSideBar extends React.Component {
    componentDidMount() {
        $('.system-nav-link').click(function (e) {
            $('.system-nav-link').css("background-color", "");
            $(this).css("background-color", "#0d7e80");
        });
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.history.replace("home");
        this.props.logout();
    }


    render() {
        return (
            <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar system-sidenav" id="sideMenu">
                <img src={patientIcon} className="img-responsive img-role" rel="icon" type="image/png" alt="Patient icon" />
                <div className="account-role">Patient</div>
                <button className="btn btn-signout internal-signout" onClick={this.handleLogout.bind(this)}>Logout <i className="fas fa-sign-out-alt icon-color"></i></button>
                <ul className="nav nav-pills flex-column system-nav">
                    <li>
                        <Link to={'/patientdashboard'} className="system-nav-link"> <i className="fas fa-home"></i> Dashboard </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
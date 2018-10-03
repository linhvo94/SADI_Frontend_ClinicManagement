import React from 'react';
import { Link } from 'react-router-dom';


export default class Header extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-search justify-content-between">
                    <span><span className="mr-5"><i className="fas fa-envelope"></i> lincol@gmail.com</span> <span><i className="fas fa-phone-volume"></i> 028 3776 1300</span></span>
                    <form className="form-inline form-search">
                        <input type="text" className="form-control search-box" placeholder="Search" />
                        <button className="btn btn-search"><span className="fas fa-search"></span></button>

                        {!this.props.authenticated ? null : this.props.userRole === undefined ? null :
                            this.props.userRole[0].authority === "ROLE_ADMIN" ?
                                <Link to={'/admindashboard'} className="system-link">Admin System</Link>
                                : this.props.userRole[0].authority === "ROLE_DOCTOR" ?
                                    <Link to={'/doctordashboard'} className="system-link">Doctor System</Link>
                                    : this.props.userRole[0].authority === "ROLE_NURSE" ?
                                        <Link to={'/nursedashboard'} className="system-link">Nurse System</Link>
                                        : this.props.userRole[0].authority === "ROLE_PATIENT" ?
                                            <Link to={'/patientdashboard'} className="system-link">Patient System</Link>
                                            : null
                        }

                        {!this.props.authenticated ?
                            <Link to={'/login'}><span className="far fa-user icon-color"></span></Link>
                            : <button className="btn btn-signout" onClick={() => this.props.logout()}><i className="fas fa-sign-out-alt icon-color"></i></button>}
                    </form>
                </nav>

                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid global-navbar">
                        <Link to={'/home'}><img className="img-responsive header-logo" rel="icon" type="image/png" src="../style/LINCOL.png" alt="logo" /></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" style={{ background: "none", border: "none" }} data-target="#global-navbar" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="fas fa-bars fa-2x icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="global-navbar">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={'/home'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/aboutus'} className="nav-link">About Us</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={'/services'} className="nav-link">Sevices</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </nav>

            </div>
        )
    }
}
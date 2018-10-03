import React from "react";
import { Link } from 'react-router-dom';
import doctorIcon from '../../style/doctor.png';

export default class DoctorSideBar extends React.Component {
    componentDidMount() {
        var $sideMenu = $('#sideMenu');
        $sideMenu.on('show.bs.collapse', '.collapse', function () {
            $sideMenu.find('.collapse.show').collapse('hide');
        });

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
                <img src={doctorIcon} className="img-responsive img-role" rel="icon" type="image/png" alt="Doctor icon" />
                <div className="account-role">Doctor</div>
                <button className="btn btn-signout internal-signout" onClick={this.handleLogout.bind(this)}>Logout <i className="fas fa-sign-out-alt icon-color"></i></button>
                <ul className="nav nav-pills flex-column system-nav">
                    <li>
                        <Link to={'/doctordashboard'} className="system-nav-link"> <i className="fas fa-home"></i> Dashboard </Link>
                    </li>

                    <li data-toggle="collapse" data-target="#patients" className="system-nav-link collapsed">
                        <a><i className="fas fa-users"></i> Patients <i className="fa fa-caret-down dropdown-icon"></i></a>
                    </li>
                    <ul className="sub-menu collapse" id="patients">
                        <Link to={"/patientscontrol"} className="system-subnav-link"><i className="fas fa-cogs"></i> Patient Control</Link>
                        <Link to={"/searchpatientservice"} className="system-subnav-link"><i className="fas fa-search"></i> Find Patient </Link>
                    </ul>

                    <li data-toggle="collapse" data-target="#visitLogs" className="system-nav-link collapsed">
                        <a><i className="far fa-file"></i> Visit Logs <i className="fa fa-caret-down dropdown-icon"></i></a>
                    </li>
                    <ul className="sub-menu collapse" id="visitLogs">
                        <Link to={"/visitlogcontrol"} className="system-nav-link"><i className="fas fa-cogs"></i> Visit Log Control </Link>
                        <Link to={"/searchvisitlogservice"} className="system-nav-link"><i className="fas fa-search"></i> Find Visit Log </Link>
                    </ul>

                    <li>
                        <Link to={"/searchdiseaseservice"} className="system-nav-link"><i className="fas fa-search"></i> Find Disease </Link>
                    </li>

                    <li>
                        <Link to={"/searchdrugservice"} className="system-nav-link"><i className="fas fa-search"></i> Find Drug </Link>
                    </li>
                </ul>

            </nav>
        )
    }
}
import React from "react";
import { Link } from 'react-router-dom';
import adminIcon from '../../style/admin.png';
import { Redirect } from 'react-router-dom';


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
                <img src={adminIcon} className="img-responsive img-role" alt="Admin icon" />
                <div className="account-role">Admin</div>
                <button className="btn btn-signout internal-signout" onClick={this.handleLogout.bind(this)}>Logout <i className="fas fa-sign-out-alt icon-color"></i></button>

                <ul className="nav nav-pills flex-column system-nav">
                    <li>
                        <Link to={'/admindashboard'} className="system-nav-link"> <i className="fas fa-home"></i> Dashboard </Link>
                    </li>

                    <li>
                        <Link to={"/patientscontrol"} className="system-nav-link"><i className="fas fa-users"></i> Patient Control</Link>
                    </li>

                    <li>
                        <Link to={"/visitlogdetail"} className="system-nav-link"><i className="far fa-file"></i> Visit Log Detail </Link>
                    </li>

                    <li>
                        <Link to={"/diseasescontrol"} className="system-nav-link"><i className="far fa-frown"></i> Disease Control </Link>
                    </li>

                    <li>
                        <Link to={"/drugscontrol"} className="system-nav-link"><i className="fas fa-pills"></i> Drug Control </Link>
                    </li>
                </ul>

            </nav>
        )
    }
}
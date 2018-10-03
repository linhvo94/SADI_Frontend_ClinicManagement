import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <h4>CONTACT</h4>
                            <hr className="light" />
                            <p>028 3776 1300</p>
                            <p>lincol@gmail.com</p>
                        </div>

                        <div className="col-md-4">
                            <h4>OPEN HOURS</h4>
                            <hr className="light" />
                            <p>Monday - Sunday</p>
                            <p>24/7 Hour</p>
                        </div>

                        <div className="col-md-4">
                            <h4>LOCATION</h4>
                            <hr className="light" />
                            <p>702 Nguyen Van Linh, District 7, HCM</p>
                        </div>

                    </div>

                </div>
            </footer>
        )
    }
}
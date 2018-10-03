import React from 'react';


export default class ServicePage extends React.Component {

    componentDidMount() {
        this.props.fetchMedicalServices();
    }

    render() {
        return (
            <div className="container-fluid mb-30">
                <div className="jumbotron img-jumbotron"></div>
                <div className="row welcome text-center">
                    <div className="col-12">
                        <h3>Our Services</h3>
                    </div>
                    <hr />
                    <div className="col-2">
                        <p className="lead"></p>
                    </div>
                </div>
                <div className="row text-center">
                    {this.props.medicalServices.map((m, index) => index < 6 ?
                        <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                            <div>
                                <img src={m.image} className="img-responsive img-service mb-3"
                                    alt="Service Image" />
                            </div>
                            <h4>{m.name}</h4>
                        </div>
                        : null)}
                </div>

                <div className="row welcome text-center">
                    <div className="col-12">
                        <h3>And More...</h3>
                    </div>
                </div>

            </div>
        )
    }
}
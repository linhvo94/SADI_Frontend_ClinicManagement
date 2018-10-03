import React from 'react';
import { Carousel } from './Carousel.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div className="homepage mb-30">
                <Carousel />
                <div className="container-fluid padding">

                    <div className="row welcome text-center">
                        <div className="col-12">
                            <h3>We Offer</h3>
                        </div>
                        <hr />
                        <div className="col-2">
                            <p className="lead"></p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid padding">
                    <div className="row text-center padding">
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <i className="far fa-hospital fa-5x mb-5 icon"></i>
                            <h3>MORDERN FACILITY</h3>
                            <p>"Pleasant rooms aren’t only more comfortable; they’re therapeutic"</p>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <i className="fas fa-pills fa-5x mb-5 icon"></i>
                            <h3>BEST HEALTHCARE</h3>
                            <p>"A good health system delivers quality services to all people, when and where ever they need them."</p>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <i className="fas fa-ambulance fa-5x mb-5 icon"></i>
                            <h3>24-7 SERVICE</h3>
                            <p>"Available any time and every day"</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
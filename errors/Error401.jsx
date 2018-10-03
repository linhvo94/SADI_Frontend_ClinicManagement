import React from 'react';



export default class Error401 extends React.Component {
    handleReturnHome() {
        this.props.history.push("/home");
    }
    
    render() {
        return (
            <div className="row">
                <div className="error">
                    <div>
                        <img src="https://cdn.dribbble.com/users/34790/screenshots/1638989/401.png" className="img-responsive errorIcon" alt="Error 401 Image" />
                        <div> Error 401 - Unauthorized Request </div>
                        <button className="btn btn-default btn-returnhome" onClick={this.handleReturnHome.bind(this)}>
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
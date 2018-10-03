import React from 'react';

export default class MedicalServiceDetailForm extends React.Component {
    constructor() {
        super();
        this.state = {
            labMedicals: [],
            error_message: "",
            labTests: [],
            savedLabTests: [],
            date: "",
            time: ""
        }
    }

    componentDidMount() {
        this.props.getLabTest();
        this.setState({ labMedicals: this.props.labMedicals })
    }

    componentWillReceiveProps(props) {
        this.setState({ labMedicals: props.labMedicals })
    }

    handleChange(e, index) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({ date: "", time: "" });
    }

    checkValid() {
        var hour, minute;
        if (this.state.time.length === 5 && this.state.time[2] === ":") {
            hour = parseInt(this.state.time.substring(0, 2));
            minute = parseInt(this.state.time.substring(3, 5));

            if (isNaN(hour) || hour > 23 || hour < 0) {
                this.setState({ error_message: "Hour should be between 0 and 23" })
                return false;
            }

            if (isNaN(minute) || minute > 59 || minute < 0) {
                this.setState({ error_message: "Minute should be between 0 and 59" })
                return false;
            }

            this.setState({ error_message: "" })
            return true;

        } else {
            this.setState({ error_message: "Time should be in format 'hh:mm'" })
            return false;
        }

    }


    handleSave(e) {
        e.preventDefault();
        var valid = true;
        if (this.state.date === "") {
            this.setState({ error_message: "Date should not be empty." });
            valid = false;
        }
        if (this.state.time === "") {
            this.setState({ error_message: "Time should not be empty." });
            valid = false;
        } else {
            if (this.checkValid() && valid) {
                e.preventDefault();
                var currentState = this.state;
                let singleLabTest = {}
                singleLabTest["date"] = this.state.date;
                singleLabTest["time"] = this.state.time;
                singleLabTest["labMedicals"] = this.state.labMedicals;
                currentState.labTests.push(singleLabTest);
                currentState.labMedicals = [];
                this.setState(currentState);

                var finalLabTests = [...this.props.savedLabTests, ...currentState.labTests];
                this.props.addLabTestsForAVisit(finalLabTests, this.props.visitLogID);
                this.props.handleFinishMedicalServiceSelection(e, true);
            }
        }
    }

    handleContinue(e) {
        e.preventDefault();
        var valid = true;
        if (this.state.date === "") {
            this.setState({ error_message: "Date should not be empty." });
            valid = false;
        } else {
            if (this.state.time === "") {
                this.setState({ error_message: "Time should not be empty." });
                valid = false;
            } else {
                if (this.checkValid() && valid) {
                    e.preventDefault();
                    var currentState = this.state;
                    let singleLabTest = {}
                    singleLabTest["date"] = this.state.date;
                    singleLabTest["time"] = this.state.time;
                    singleLabTest["labMedicals"] = this.state.labMedicals;

                    this.props.saveLabTestsState(singleLabTest);
                    currentState.labTests.push(singleLabTest);
                    currentState.labMedicals = [];
                    this.props.handleFinishMedicalServiceSelection(e, false);
                    this.setState(currentState);
                    this.props.getLabTest();
                }
            }
        }

    }

    render() {
        return (
            <div>
                <div className="card panel-border">
                    <div className="card-header text-center">
                        <strong>Date & Time for Lab Test</strong>
                    </div>

                    <div className="card-body">
                        <div>

                            <div className="form-group">
                                <label>Performance Date:</label>
                                <input type="date" name="date" className="form-control"
                                    min="2018-01-01" max="2018-12-31"
                                    value={this.state.date} onChange={this.handleChange.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label>Performance Time:</label>
                                <input type="text" name="time" className="form-control" placeholder="hh:mm"
                                    value={this.state.time} onChange={this.handleChange.bind(this)} />
                            </div>


                            <div>
                                {this.state.error_message !== "" ?
                                    <div style={{ color: "red" }}>
                                        <i><strong>Warning!</strong> {this.state.error_message}</i>
                                    </div> : null}
                            </div>

                            <button className="btn btn-form float-right ml-2 mt-10 mb-10" onClick={this.handleSave.bind(this)} > Save & Submit </button>
                            <button className="btn btn-form float-right ml-2 mt-10 mb-10" onClick={this.handleContinue.bind(this)} > Done & Create Another Lab Test </button>
                            <button className='btn btn-form float-right ml-2 mt-10 mb-10' onClick={this.handleReset.bind(this)}> Reset </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
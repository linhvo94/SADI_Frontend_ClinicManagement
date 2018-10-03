import React from 'react';


export default class VisitLogSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visitLogID: "",
            keyword: "",
            isSelectionDisabled: false,
            error_message: ""
        }
    }


    componentWillReceiveProps(props) {
        this.setState({ error_message: props.visitLogSearchError });
    }


    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes)
    }

    handleVisitLogUnSelect() {
        this.setState({ visitLogID: "", isSelectionDisabled: false })
    }

    handleVisitLogSelect(visitLogID) {
        this.setState({ visitLogID: visitLogID, isSelectionDisabled: true })
    }

    handlevisitLogForm(e) {
        if (this.state.keyword === "") {
            e.preventDefault();
            this.setState({ error_message: "Input cannot be empty" });
        } else {
            if (isNaN(this.state.keyword)) {
                e.preventDefault();
                this.setState({ error_message: "ID should be a number." })

            } else {
                e.preventDefault();
                this.props.findVisitLogForForm(this.state.keyword);

            }
        }

    }

    handleProceedToForm(e) {
        e.preventDefault();
        if (this.state.visitLogID !== "") {
            this.props.history.push(`/visitlogform/${this.props.visitLogForm.id}`);
        }
    }

    handleReturnSelection(e) {
        e.preventDefault();
        this.props.history.push("/visitlogform")
    }


    render() {
        return (
            <div>
                <button className="btn btn-default btn-return mb-20" onClick={(e) => this.handleReturnSelection(e)}>
                    <i className="fas fa-angle-double-left"></i> Return to Selection
                </button>
                <div className="card panel-border">
                    <div className="card-body">
                        <div>
                            <h3 className="mb-20">Visit Log Record Selection</h3>
                            <div className="form-group form-inline">
                                <label className="mr-2"><strong>Enter Visit Log ID:</strong></label>
                                <input type="text" name="keyword" className="form-control mr-2"
                                    placeholder="Vistit Log ID"
                                    value={this.state.keyword} onChange={this.handleChange.bind(this)} />

                                <button type="button" className="btn btn-default btn-visitLogForm inline" disabled={this.state.isSelectionDisabled}
                                    onClick={this.handlevisitLogForm.bind(this)}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>

                            {this.state.isSelectionDisabled === true ? <div style={{ color: "black" }}>
                                <i><strong>***Note:</strong> To find another visit log, please unselect the current visit log.</i>
                            </div> : null}

                            {this.state.error_message !== "" ?
                                <div style={{ color: "red" }}>
                                    <i><strong>Warning!</strong> {this.state.error_message}</i>
                                </div> : null}
                            <div>
                            </div>

                        </div>

                        {this.props.visitLogForm !== "" &&
                            this.props.visitLogForm !== undefined
                            && this.props.visitLogForm !== null
                            && this.state.error_message === "" ?
                            <div className="table table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-header">
                                        <tr>
                                            <th className="text-center">Visit ID</th>
                                            <th className="text-center">Patient Name</th>
                                            <th className="text-center">Patient Address</th>
                                            <th className="text-center">Visit Date</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td>{this.props.visitLogForm.id}</td>
                                            <td>{this.props.visitLogForm.patient !== null && this.props.visitLogForm.patient.name !== null ?
                                                this.props.visitLogForm.patient.name : ""} </td>

                                            <td>{this.props.visitLogForm.patient !== null && this.props.visitLogForm.patient.address !== null ?
                                                this.props.visitLogForm.patient.address : ""} </td>

                                            <td>{this.props.visitLogForm.visitDate !== undefined && this.props.visitLogForm.visitDate !== null ?
                                                `${this.props.visitLogForm.visitDate.substring(8, 10)}-${this.props.visitLogForm.visitDate.substring(5, 7)}-${this.props.visitLogForm.visitDate.substring(0, 4)}` : null}</td>
                                            <td>
                                                <button className="btn btn-danger" disabled={!this.state.isSelectionDisabled}
                                                    onClick={() => this.handleVisitLogUnSelect()}>
                                                    <span className="fas fa-undo"></span> Unselect
                                                    </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success" disabled={this.state.isSelectionDisabled}
                                                    onClick={() => this.handleVisitLogSelect(this.props.visitLogForm.id)}>
                                                    <span className="fas fa-check"></span> Select
                                                    </button>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>
                            </div>
                            : null}

                        {this.state.isSelectionDisabled ?
                            <button className="btn btn-form float-right mb-10" onClick={this.handleProceedToForm.bind(this)} >
                                Done & Proceed to Form
                            </button> : null}
                    </div>
                </div>
            </div>

        )
    }
}
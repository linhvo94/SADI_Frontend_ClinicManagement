import React from 'react';

export default class ProblemEditForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            problem: "",
            error_message: ""
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            id: props.editProblem.id,
            problem: props.editProblem.problem
        });
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }


    handleUpdate(e) {
        e.preventDefault();
        if (this.state.problem === "" || this.state.problem === undefined) {
            this.setState({ error_message: "Problem cannot be empty." });
        } else {
            this.props.updateProblem({ id: this.state.id, problem: this.state.problem }, this.props.visitLogID);
            this.props.resetProblem();
            this.props.closeProblemForm();
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.resetProblem();
    }

    render() {
        return (
            <div className="card panel-border">
                <div className="card-header text-center">
                    <strong>Edit Problem</strong>
                    <button className="float-right btn-closeForm"
                        onClick={this.props.closeProblemForm.bind(this)}><i className='fa fa-times text-white'></i>
                    </button>
                </div>

                <div className="card-body">
                    {this.state.id !== "" ?
                        <div className="form-group">
                            <label>ID:</label>
                            <input type="text" name="id" className="form-control" readOnly
                                placeholder="Problem ID"
                                value={this.state.id} />

                        </div> : null}

                    <div className="form-group">
                        <label>Problem: </label>
                        {this.state.error_message !== "" ?
                            <div className="alert alert-warning">
                                <strong>Warning!</strong> {this.state.error_message}
                            </div> : null}

                        <input type="text" name="problem" className="form-control"
                            value={this.state.problem} onChange={this.handleChange.bind(this)} />
                    </div>

                    <button className="btn btn-form float-right ml-2" onClick={this.handleUpdate.bind(this)} > Update </button>
                    <button className='btn btn-form float-right' onClick={this.handleReset.bind(this)}> Reset Form </button>

                </div>

            </div>
        )
    }
}
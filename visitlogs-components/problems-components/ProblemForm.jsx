import React from 'react';

export default class ProblemForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddRow = this.handleAddRow.bind(this);
        this.state = {
            problems: [{ problem: "" }],
            problemsPerVisit: [],
            isOnAddMore: false
        }
    }

    componentWillMount() {
        this.setState({ problemsPerVisit: this.props.problemsPerVisit });
    }

    componentWillReceiveProps(props) {
        this.setState({ problemsPerVisit: props.problemsPerVisit });
    }

    handleChange(index, e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        var currentState = this.state
        currentState.problems[index] = changes
        this.setState(currentState)
    }


    handleAddRow(e) {
        e.preventDefault();
        var nextState = this.state;
        nextState.problems.push({ problem: "" })
        this.setState(nextState);
    }

    handleMinusRow(e, index) {
        e.preventDefault();
        var removeRowState = this.state;
        if (removeRowState.problems.length > 1) {
            removeRowState.problems.splice(index, 1);
            this.setState(removeRowState);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addProblemsForAVisit(this.state.problems, this.props.visitLogID);
        var currentState = this.state;
        currentState.isOnAddMore = false;
        this.setState(currentState);
        this.handleReset(e);
    }

    handleReset(e) {
        e.preventDefault();
        var currentState = this.state;
        for (var i = 0; i < currentState.problems.length; i++) {
            currentState.problems[i].problem = "";
        }

        this.setState(currentState);
    }

    handleEdit(id) {
        this.props.findEditProblemByID(id);
        this.props.openProblemEditForm();
    }

    handleAddMore() {
        this.setState({ isOnAddMore: true });
        this.props.closeProblemForm();
    }

    handleCancelAddMore() {
        this.setState({ isOnAddMore: false });
    }

    handleDelete(id) {
        this.props.deleteProblem(id, this.props.visitLogID);
        this.props.closeProblemForm();
    }

    render() {
        return (
            <div>
                <h3>Problems</h3>
                {(this.state.problemsPerVisit === "" || this.state.problemsPerVisit.length === 0 ||
                    (this.state.problemsPerVisit.length > 0 && this.state.isOnAddMore)) ?
                    <div className="mt-15">
                        {this.state.problems.map((p, index) =>
                            <div className="form-group" key={index}>
                                <label>Problem {index + 1}:</label>
                                <div className="input-group">
                                    <input type="text" name="problem" value={this.state.problems[index].problem} className="form-control"
                                        onChange={(e) => this.handleChange(index, e)} />
                                    <span className="input-group-btn">
                                        <button className="btn btn-default btn-addrow" onClick={(e) => this.handleMinusRow(e, index)}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                    </span>
                                    <span className="input-group-btn">
                                        <button className="btn btn-default btn-addrow" onClick={this.handleAddRow}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>)}


                        <button className='btn btn-form float-right ml-2 mt-10 mb-10' onClick={this.handleSubmit.bind(this)}> Save </button>
                        {this.state.isOnAddMore ? <button className='btn btn-form float-right ml-2 mt-10 mb-10' onClick={this.handleCancelAddMore.bind(this)}> Cancel </button> : null}
                        <button className='btn btn-form float-right ml-2 mt-10 mb-10' onClick={this.handleReset.bind(this)}> Reset </button>
                    </div>
                    :
                    <div>
                        <button type="button" className="btn btn-add float-right mb-10"
                            onClick={() => this.handleAddMore()}>
                            <span className="fas fa-plus"></span> Add More </button>

                        <div className="table table-responsive">
                            <table className="table table-striped table-hover">
                                <thead className="table-header">
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Problem Name</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.problemsPerVisit.map((p, index) =>
                                        <tr className="text-center" key={index}>
                                            <td>{p.id}</td>
                                            <td>{p.problem}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger"
                                                    onClick={() => this.handleDelete(p.id)}>
                                                    <span className="far fa-trash-alt"></span> Delete

                                            </button>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-info"
                                                    onClick={() => this.handleEdit(p.id)}>
                                                    <span className="far fa-edit"></span> Edit
                                                </button>
                                            </td>

                                        </tr>)}
                                </tbody>

                            </table>

                        </div>
                    </div>}

            </div>
        )
    }
}
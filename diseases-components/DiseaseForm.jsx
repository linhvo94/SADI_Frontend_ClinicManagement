import React from 'react';

export default class DiseaseForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            icd: "",
            diseaseName: "",
            typeCode: "",
            typeName: "",
            error_icd: "",
            error_diseaseName: "",
            error_typeCode: "",
            error_typeName: ""
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            id: props.editDisease.id,
            icd: props.editDisease.icd,
            diseaseName: props.editDisease.diseaseName,
            typeCode: props.editDisease.typeCode,
            typeName: props.editDisease.typeName
        });
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    checkValid() {
        var valid = true;

        if (this.state.icd === "" || this.state.icd === undefined) {
            this.setState({ error_icd: "ICD cannot be empty." });
            valid = false;

        } else {
            this.setState({ error_icd: "" });
        }

        if (this.state.diseaseName === "" || this.state.diseaseName === undefined) {
            this.setState({ error_diseaseName: "Disease name cannot be empty." });
            valid = false;

        } else {
            this.setState({ error_diseaseName: "" });
        }

        if (this.state.typeCode === "" || this.state.typeCode === undefined) {
            this.setState({ error_typeCode: "Type code cannot be empty." });
            valid = false;

        } else {
            this.setState({ error_typeCode: "" });
        }

        if (this.state.typeName === "" || this.state.typeName === undefined) {
            this.setState({ error_typeName: "Type name cannot be empty." });
            valid = false;
        } else {
            this.setState({ error_typeName: "" });
        }

        return valid;
    }

    handleSave(e) {
        e.preventDefault();
        if (this.state.id === "" || this.state.id === undefined) {
            var valid = this.checkValid();

            if (valid) {
                this.props.addDisease({
                    icd: this.state.icd,
                    diseaseName: this.state.diseaseName,
                    typeCode: this.state.typeCode,
                    typeName: this.state.typeName
                });

                this.props.resetDisease();
                this.props.closeDiseaseForm();
            }
        } else {
            e.preventDefault();
            var valid = this.checkValid();
            if (valid) {
                this.props.updateDisease({
                    id: this.state.id,
                    icd: this.state.icd,
                    diseaseName: this.state.diseaseName,
                    typeCode: this.state.typeCode,
                    typeName: this.state.typeName
                });

                this.props.resetDisease();
                this.props.closeDiseaseForm();
            }
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.resetDisease();

    }

    render() {
        return (
            <div className="card panel-border">
                <div className="card-header text-center">
                    {!this.state.id ? <strong>Add Disease</strong> : <strong>Edit Disease</strong>}
                    <button className="float-right btn-closeForm" onClick={this.props.closeDiseaseForm.bind(this)}><i className='fa fa-times text-white'></i></button>
                </div>

                <div className="card-body">
                    {this.state.id !== "" ?
                        <div className="form-group">
                            <label>ID:</label>
                            <input type="text" name="id" className="form-control" readOnly
                                placeholder="disease ID"
                                value={this.state.id} />

                        </div> : null}

                    <div className="form-group">
                        <label>ICD:</label>
                        {this.state.error_icd !== "" ?
                            <div style={{ color: "red" }}>
                                <i><strong>Warning!</strong></i> {this.state.error_icd}
                            </div> : null}

                        <input type="text" name="icd" className="form-control"
                            placeholder="ICD"
                            value={this.state.icd} onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label>Disease Name:</label>
                        {this.state.error_diseaseName !== "" ?
                            <div style={{ color: "red" }}>
                                <i><strong>Warning!</strong></i> {this.state.error_diseaseName}
                            </div> : null}

                        <input type="text" name="diseaseName" className="form-control"
                            placeholder="Disease Name"
                            value={this.state.diseaseName} onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label>Type Code</label>
                        {this.state.error_typeCode !== "" ?
                            <div style={{ color: "red" }}>
                                <i><strong>Warning!</strong></i> {this.state.error_typeCode}
                            </div> : null}

                        <input type="text" name="typeCode" className="form-control"
                            placeholder="Type Code"
                            value={this.state.typeCode} onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label>Type Name</label>
                        {this.state.error_typeName !== "" ?
                            <div style={{ color: "red" }}>
                                <i><strong>Warning!</strong></i> {this.state.error_typeName}
                            </div> : null}

                        <input type="text" name="typeName" className="form-control"
                            placeholder="Type Name"
                            value={this.state.typeName} onChange={this.handleChange.bind(this)} />
                    </div>

                    <button className="btn btn-form float-right ml-2" onClick={this.handleSave.bind(this)} > Save </button>
                    <button className='btn btn-form float-right' onClick={this.handleReset.bind(this)}> Reset Form </button>

                </div>

            </div>
        )
    }
}
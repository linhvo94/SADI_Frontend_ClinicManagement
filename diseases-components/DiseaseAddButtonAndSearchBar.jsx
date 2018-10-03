import React from 'react';


export default class DiseaseAddButtonAndSearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: "",
            searchName: "Search By",
            error_message: "",
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ error_message: props.diseaseSearchError })
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    onAddDisease() {
        this.props.toggleDiseaseForm();
        this.props.resetDisease();
    }

    handleSearchICDTitle() {
        this.setState({ searchName: "Disease ICD" })
    }

    handleSearchNameTitle() {
        this.setState({ searchName: "Disease Name" })
    }

    handleSearchDisease(e) {
        if (this.state.keyword === "") {
            e.preventDefault();
            this.setState({ error_message: "Input cannot be empty" });
        } else {
            e.preventDefault();
            if (this.state.searchName === "Disease Name") {
                e.preventDefault();
                this.props.findDiseaseByName(this.state.keyword);
            } else if (this.state.searchName === "Disease ICD") {
                e.preventDefault();
                this.props.findDiseaseByICD(this.state.keyword);
            } else if (this.state.searchName === "Search By") {
                e.preventDefault();
                this.setState({ error_message: "Select Search Type" })
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.error_message !== "" ?
                        <div style={{ color: "red" }} className="float-right">
                            <i><strong>Warning!</strong> {this.state.error_message}</i>
                        </div> : null}
                    <br clear="all" />
                </div>
                <div>
                    <form className="form-inline mb-10">
                        <div className="form-group mr-2">
                            <button type="button" className="btn btn-add" onClick={() => this.onAddDisease()}>
                                <span className="fas fa-exclamation"></span> <strong>Add</strong>
                            </button>
                        </div>

                        <div className="form-group mr-2">
                            <button type="button" className="btn btn-default btn-viewall" onClick={() => this.props.fetchDiseases()}>
                                View All
                                </button>
                        </div>

                        <div className="form-group mr-2">
                            <div className="dropdown">
                                <button type="button" className="btn btn-default btn-searchdisease dropdown-toggle" data-toggle="dropdown">
                                    {this.state.searchName}
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchICDTitle.bind(this)}> Disease ICD </a></li>
                                    <div className="dropdown-divider"></div>
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchNameTitle.bind(this)}> Disease Name </a></li>
                                </ul>
                            </div>

                        </div>

                        <div className="form-group float-right">
                            <input type="text" name="keyword" className="form-control"
                                placeholder="Type keyword"
                                value={this.state.keyword} onChange={this.handleChange.bind(this)} />
                        </div>

                        <button className="btn btn-default btn-searchdisease float-right ml-2"
                            onClick={this.handleSearchDisease.bind(this)}>
                            <i className="fas fa-search"></i>
                        </button>

                    </form>
                </div>
            </div>
        )
    }

}
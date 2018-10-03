import React from 'react';


export default class DiseaseSearchBar extends React.Component {
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


    handleSearchDiseaseICD() {
        this.setState({ searchName: "Disease ICD" })
    }

    handleSearchDiseaseName() {
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
                    <form className="form-inline mb-3">
                        <div className="form-group mr-3">
                            <div className="dropdown">
                                <button type="button" className="btn btn-default btn-searchdisease dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.searchName}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchDiseaseICD.bind(this)}>  Disease ICD </a></li>
                                    <div className="dropdown-divider"></div>
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchDiseaseName.bind(this)}> Disease Name </a></li>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-default btn-viewall ml-2" onClick={() => this.props.fetchDiseases()}>
                                View All
                            </button>

                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <input type="text" name="keyword" className="form-control"
                                    value={this.state.keyword} onChange={this.handleChange.bind(this)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default btn-searchdisease ml-3"
                                        onClick={this.handleSearchDisease.bind(this)}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                </span>
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    {this.state.error_message !== "" ?
                        <div style={{ color: "red" }}>
                            <i><strong>Warning!</strong> {this.state.error_message}</i>
                        </div> : null}

                </div>
            </div>
        )
    }

}
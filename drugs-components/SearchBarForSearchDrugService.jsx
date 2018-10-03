import React from 'react';

export default class SearchBarForSearchDrugService extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: "",
            searchName: "Search By",
            error_message: "",
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ error_message: props.drugSearchError })
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }


    handleSearchIDTitle() {
        this.setState({ searchName: "Drug ID" })
    }

    handleSearchNameTitle() {
        this.setState({ searchName: "Drug Name" })
    }


    handleSearchDrug(e) {
        if (this.state.keyword === "") {
            e.preventDefault();
            this.setState({ error_message: "Input cannot be empty" });
        } else {
            e.preventDefault();
            if (this.state.searchName === "Drug Name") {
                e.preventDefault();
                this.props.findDrugByName(this.state.keyword);
            } else if (this.state.searchName === "Drug ID") {
                if (isNaN(this.state.keyword)) {
                    e.preventDefault();
                    this.setState({ error_message: "ID should be a number." })
                } else {
                    e.preventDefault();
                    this.props.findDrugByID(this.state.keyword);
                }
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
                        <div style={{ color: "red" }}>
                            <i><strong>Warning!</strong> {this.state.error_message}</i>
                        </div> : null}
                    <br clear="all" />
                </div>
                <div>
                    <form className="form-inline">
                        <div className="form-group mr-2">
                            <button type="button" className="btn btn-default btn-viewall mr-2" onClick={() => this.props.fetchDrugs()}>
                                View All
                                </button>
                        </div>
                        <div className="form-group mr-2">
                            <div className="dropdown">
                                <button type="button" className="btn btn-default btn-searchdrug dropdown-toggle" data-toggle="dropdown">
                                    {this.state.searchName}
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchIDTitle.bind(this)}> Drug ID </a></li>
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchNameTitle.bind(this)}> Drug Name </a></li>
                                </ul>

                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" name="keyword" className="form-control"
                                placeholder="Type keyword"
                                value={this.state.keyword} onChange={this.handleChange.bind(this)} />
                        </div>

                        <button className="btn btn-default btn-searchdrug ml-2"
                            onClick={this.handleSearchDrug.bind(this)}>
                            <i className="fas fa-search"></i>
                        </button>


                    </form>
                </div>
            </div>
        )
    }
}
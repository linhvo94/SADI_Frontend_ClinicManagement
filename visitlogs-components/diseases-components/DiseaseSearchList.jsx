import React from "react";
import { sortListToPages } from '../../utility/utility.js';

export default class DiseaseSearchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            listPages: [],
            totalPage: 0,
            isSelectionDisabledByIndex: [],
            diagnosedDiseases: [],
            diseasesWithPagination: []
        }
    }

    componentDidMount() {
        this.props.fetchDiseases();
    }

    componentWillReceiveProps(props) {
        if (props.diseases.length > 0) {
            var diseases = sortListToPages(props.diseases);
            var totalPage = diseases[diseases.length - 1].pageNum

            var currentState = this.state;
            currentState.listPages = []
            currentState.totalPage = totalPage;
            currentState.isSelectionDisabledByIndex = [];
            currentState.diseasesWithPagination = []

            currentState.diseasesWithPagination = diseases;

            for (var i = 0; i < diseases.length; i++) {
                for (var j = 0; j < diseases[i].listOf15Items.length; j++) {
                    var selectionDisabled = {};
                    selectionDisabled["id"] = diseases[i].listOf15Items[j].id;
                    selectionDisabled["value"] = false
                    for (var k = 0; k < this.state.diagnosedDiseases.length; k++) {
                        if (this.state.diagnosedDiseases[k].disease.id === diseases[i].listOf15Items[j].id) {
                            selectionDisabled["value"] = true;
                            break;
                        }
                    }
                    currentState.isSelectionDisabledByIndex.push(selectionDisabled);
                }

            }

            if (totalPage > 0 && totalPage <= 5) {
                for (var i = 1; i <= totalPage; i++) {
                    currentState.listPages.push(i);
                }
            } else if (totalPage > 5) {
                for (var i = 1; i <= 5; i++) {
                    currentState.listPages.push(i);

                }
            }
            this.setState(currentState)
        }
    }


    handlePagnination(pageNum) {
        var currentListPages = this.state.listPages;
        if (pageNum === currentListPages[currentListPages.length - 1]
            && pageNum < this.state.totalPage && this.state.totalPage > 5) {
            currentListPages.shift();
            var nextPage = pageNum + 1
            currentListPages.push(nextPage)
        } else if (pageNum === currentListPages[0]
            && pageNum > 1 && this.state.totalPage > 5) {
            currentListPages.pop();
            currentListPages.unshift(pageNum - 1)
        }

        this.setState({ currentPage: pageNum, listPages: currentListPages })

    }

    handleGoBack() {
        if (this.state.currentPage > 1) {
            var currentListPages = this.state.listPages;
            if (this.state.currentPage === currentListPages[0]) {
                currentListPages.pop();
                currentListPages.unshift(this.state.currentPage - 1)
            }
            this.setState({ currentPage: this.state.currentPage - 1, listPages: currentListPages })
        }
    }

    handleGoNext() {
        if (this.state.currentPage < this.state.diseasesWithPagination.length) {
            var currentListPages = this.state.listPages;
            if (this.state.currentPage === currentListPages[currentListPages.length - 1]) {
                currentListPages.shift();
                currentListPages.push(this.state.currentPage + 1)
            }
            this.setState({ currentPage: this.state.currentPage + 1, listPages: currentListPages })
        }
    }

    handleDiseaseUnSelect(e, disease) {
        e.preventDefault();
        var currentState = this.state;
        for (var i = 0; i < currentState.isSelectionDisabledByIndex.length; i++) {
            var selectionDisabledID = currentState.isSelectionDisabledByIndex[i].id
            if (selectionDisabledID === disease.id) {
                currentState.isSelectionDisabledByIndex[i].value = false;
            }
        }

        for (var i = 0; currentState.diagnosedDiseases.length; i++) {
            if (currentState.diagnosedDiseases[i].disease.id === disease.id) {
                currentState.diagnosedDiseases.splice(i, 1);
                break;
            }
        }

        this.setState(currentState);

    }

    handleDiseaseSelect(e, disease) {
        e.preventDefault();
        var currentState = this.state;
        let diagnosedDiseases = {};
        diagnosedDiseases["disease"] = disease
        currentState.diagnosedDiseases.push(diagnosedDiseases);

        for (var i = 0; i < currentState.isSelectionDisabledByIndex.length; i++) {
            var selectionDisabledID = currentState.isSelectionDisabledByIndex[i].id
            if (selectionDisabledID === disease.id) {
                currentState.isSelectionDisabledByIndex[i].value = true;
                break;
            }
        }

        this.setState(currentState);
    }

    handleSave(e) {
        e.preventDefault();
        this.props.addDiagnosedDiseasesForAVisit(this.state.diagnosedDiseases, this.props.visitLogID);
    }

    handleReset(e) {
        e.preventDefault();
        var currentState = this.state;
        for (var i = 0; i < currentState.isSelectionDisabledByIndex.length; i++) {
            var selectionDisabledID = currentState.isSelectionDisabledByIndex[i].id

            for (var j = 0; j < currentState.diagnosedDiseases.length; j++) {
                if (selectionDisabledID === currentState.diagnosedDiseases[j].disease.id) {
                    currentState.isSelectionDisabledByIndex[i].value = false;
                }
            }
        }

        currentState.diagnosedDiseases = []

        this.setState(currentState);
    }

    render() {
        return (
            <div>
                {this.state.diagnosedDiseases.length > 0 ?
                    <div className="card panel-default mb-3">
                        <div className="card-body">
                            <label> Diseases Selected: </label>
                            <div>
                                {this.state.diagnosedDiseases.map((dd, index) =>
                                    <span type="button" className="btn btn-default disease-item mr-2" key={index}>
                                        {dd.disease.icd}
                                        <button className="float-right btn-closeForm ml-1" onClick={(e) => this.handleDiseaseUnSelect(e, dd.disease)}><i className='fa fa-times text-white'></i></button>
                                    </span>
                                )}
                            </div>

                            <button className="btn btn-form float-right ml-2 mt-10 mb-10" onClick={this.handleSave.bind(this)} > Save </button>
                            <button className='btn btn-form float-right ml-2 mt-10 mb-10' onClick={this.handleReset.bind(this)}> Reset </button>
                        </div>
                    </div>
                    : null}
                {this.state.diseasesWithPagination.length > 0 ?
                    <div className="table table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-header">
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">ICD</th>
                                    <th className="text-center">Disease Name</th>
                                    <th className="text-center">Type Code</th>
                                    <th className="text-center">Type Name</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.diseasesWithPagination != null ? this.state.diseasesWithPagination.map((d) => d.pageNum == this.state.currentPage ?
                                    d.listOf15Items.map((disease, index) =>

                                        <tr className="text-center" key={index}>
                                            <td>{disease.id}</td>
                                            <td>{disease.icd}</td>
                                            <td>{disease.diseaseName}</td>
                                            <td>{disease.typeCode}</td>
                                            <td>{disease.typeName}</td>
                                            <td>

                                                <button className="btn btn-danger" disabled={!this.state.isSelectionDisabledByIndex[this.state.isSelectionDisabledByIndex.findIndex(obj => obj.id === disease.id)].value}
                                                    onClick={(e) => this.handleDiseaseUnSelect(e, disease)}>
                                                    <span className="fas fa-undo"></span> Unselect
                                                    </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success" disabled={this.state.isSelectionDisabledByIndex[this.state.isSelectionDisabledByIndex.findIndex(obj => obj.id === disease.id)].value}
                                                    onClick={(e) => this.handleDiseaseSelect(e, disease)}>
                                                    <span className="fas fa-check"></span> Select
                                                    </button>
                                            </td>
                                        </tr>)

                                    : null
                                ) : null}
                            </tbody>

                        </table>

                        <nav>
                            <ul className="pagination float-right">
                                <li className="page-item"><a className="page-link" onClick={() => this.handleGoBack()}>&laquo;</a></li>

                                {this.state.listPages.map((page, index) =>
                                    <li className="page-item" key={index}>
                                        <a className="page-link" onClick={() => this.handlePagnination(page)}>{page}</a>
                                    </li>
                                )}

                                <li className="page-item"><a className="page-link" onClick={() => this.handleGoNext()}>&raquo;</a></li>
                            </ul>
                        </nav>
                    </div>

                    : null}
            </div>
        )
    }
}
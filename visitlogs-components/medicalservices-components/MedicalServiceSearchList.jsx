import React from 'react';
import { sortListToPages } from '../../utility/utility.js';
import MedicalServiceDetailForm from './MedicalServiceDetailForm.jsx';

export default class MedicalServiceSearchList extends React.Component {
    constructor(props) {
        super(props);
        this.handleFinishMedicalServiceSelection = this.handleFinishMedicalServiceSelection.bind(this);
        this.state = {
            currentPage: 1,
            listPages: [],
            totalPage: 0,
            finishMedicalServiceSelection: false,
            isSelectionDisabledByIndex: [],
            labMedicals: [],
            medicalServicesWithPagination: []
        }
    }

    componentDidMount() {
        this.props.fetchMedicalServices();
    }

    componentWillReceiveProps(props) {
        if (props.medicalServices.length > 0) {
            var medicalServices = []
            medicalServices = sortListToPages(props.medicalServices);
            var totalPage = medicalServices[medicalServices.length - 1].pageNum

            var currentState = this.state;
            currentState.listPages = []
            currentState.totalPage = totalPage;
            currentState.isSelectionDisabledByIndex = [];
            currentState.medicalServicesWithPagination = []

            currentState.medicalServicesWithPagination = medicalServices;

            for (var i = 0; i < medicalServices.length; i++) {
                for (var j = 0; j < medicalServices[i].listOf15Items.length; j++) {
                    var selectionDisabled = {};
                    selectionDisabled["id"] = medicalServices[i].listOf15Items[j].id;
                    selectionDisabled["value"] = false
                    for (var k = 0; k < this.state.labMedicals.length; k++) {
                        if (this.state.labMedicals[k].medicalService.id === medicalServices[i].listOf15Items[j].id) {
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
            currentListPages.push(pageNum + 1)
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
        if (this.state.currentPage < this.state.medicalServicesWithPagination.length) {
            var currentListPages = this.state.listPages;
            if (this.state.currentPage === currentListPages[currentListPages.length - 1]) {
                currentListPages.shift();
                currentListPages.push(this.state.currentPage + 1)
            }
            this.setState({ currentPage: this.state.currentPage + 1, listPages: currentListPages })
        }
    }

    handleMedicalServiceUnSelect(e, medicalService) {
        e.preventDefault();
        var currentState = this.state;
        for (var i = 0; i < currentState.isSelectionDisabledByIndex.length; i++) {
            var selectionDisabledID = currentState.isSelectionDisabledByIndex[i].id
            if (selectionDisabledID === medicalService.id) {
                currentState.isSelectionDisabledByIndex[i].value = false;
            }
        }

        for (var i = 0; currentState.labMedicals.length; i++) {
            if (currentState.labMedicals[i].medicalService.id === medicalService.id) {
                currentState.labMedicals.splice(i, 1);
                break;
            }
        }

        this.setState(currentState);

    }

    handleMedicalServiceSelect(e, medicalService) {
        e.preventDefault();
        var currentState = this.state;
        let labMedical = {};
        labMedical["medicalService"] = medicalService
        currentState.labMedicals.push(labMedical);

        for (var i = 0; i < currentState.isSelectionDisabledByIndex.length; i++) {
            var selectionDisabledID = currentState.isSelectionDisabledByIndex[i].id
            if (selectionDisabledID === medicalService.id) {
                currentState.isSelectionDisabledByIndex[i].value = true;
                break;
            }
        }

        this.setState(currentState);
    }

    handleReset(e) {
        e.preventDefault();
        var currentState = this.state;
        for (var i = 0; i < currentState.isSelectionDisabledByIndex.length; i++) {
            var selectionDisabledID = currentState.isSelectionDisabledByIndex[i].id

            for (var j = 0; j < currentState.labMedicals.length; j++) {
                if (selectionDisabledID === currentState.labMedicals[j].medicalService.id) {
                    currentState.isSelectionDisabledByIndex[i].value = false;
                }
            }
        }

        currentState.labMedicals = []
        currentState.finishMedicalServiceSelection = false;

        this.setState(currentState);
    }

    handleProceedToDetailForm(e) {
        e.preventDefault();
        this.setState({ finishMedicalServiceSelection: true });
    }

    handleBackToSearch(e) {
        e.preventDefault();
        this.setState({ finishMedicalServiceSelection: false });
    }


    handleFinishMedicalServiceSelection(e, isFinished) {
        e.preventDefault();
        if (isFinished === false) {
            this.handleReset(e);
        }
    }

    render() {
        return (
            <div>
                {this.state.labMedicals.length > 0 ?
                    <div className="card panel-default mb-3">
                        <div className="card-body">
                            <label><strong>Medical Services Selected:</strong></label>
                            <div>
                                {this.state.labMedicals.map((lm, index) =>
                                    <span type="button" className="btn btn-default disease-item mr-2" key={index}>
                                        {lm.medicalService.name}
                                        <button className="float-right btn-closeForm ml-1" onClick={(e) => this.handleMedicalServiceUnSelect(e, lm.medicalService)}><i className='fa fa-times text-white'></i></button>
                                    </span>
                                )}
                            </div>

                            {!this.state.finishMedicalServiceSelection ? <button className="btn btn-form float-right ml-2 mt-15 mb-10" onClick={this.handleProceedToDetailForm.bind(this)} >
                                Proceed to Set Date & Time
                                </button> : null}

                            {this.state.finishMedicalServiceSelection ?
                                <button className="btn btn-form float-right ml-2 mt-15 mb-10"
                                    onClick={this.handleBackToSearch.bind(this)} >
                                    Back to Search
                                </button> : null}

                            <button className='btn btn-form float-right ml-2 mt-15 mb-10' onClick={this.handleReset.bind(this)}> Reset </button>
                        </div>
                    </div>
                    : null}

                {(this.state.medicalServicesWithPagination.length > 0 && !this.state.finishMedicalServiceSelection)
                    || this.state.labMedicals.length === 0 ?
                    <div className="table table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-header">
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">Medical Service</th>
                                    <th className="text-center">Description</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.medicalServicesWithPagination != null ? this.state.medicalServicesWithPagination.map((m) => m.pageNum == this.state.currentPage ?
                                    m.listOf15Items.map((medicalService, index) =>

                                        <tr className="text-center" key={index}>
                                            <td>{medicalService.id}</td>
                                            <td>{medicalService.name}</td>
                                            <td>{medicalService.description}</td>

                                            <td>
                                                <button className="btn btn-danger" disabled={!this.state.isSelectionDisabledByIndex[this.state.isSelectionDisabledByIndex.findIndex(obj => obj.id === medicalService.id)].value}
                                                    onClick={(e) => this.handleMedicalServiceUnSelect(e, medicalService)}>
                                                    <span className="fas fa-undo"></span> Unselect
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success" disabled={this.state.isSelectionDisabledByIndex[this.state.isSelectionDisabledByIndex.findIndex(obj => obj.id === medicalService.id)].value}
                                                    onClick={(e) => this.handleMedicalServiceSelect(e, medicalService)}>
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

                {this.state.finishMedicalServiceSelection && this.state.labMedicals.length > 0 ?
                    <MedicalServiceDetailForm
                        visitLogID={this.props.visitLogID}
                        handleFinishMedicalServiceSelection={this.handleFinishMedicalServiceSelection}
                        addLabTestsForAVisit={this.props.addLabTestsForAVisit}
                        getLabTest={this.props.getLabTest}
                        savedLabTests={this.props.savedLabTests}
                        saveLabTestsState={this.props.saveLabTestsState}
                        labMedicals={this.state.labMedicals} />
                    : null}
            </div>
        )
    }

}
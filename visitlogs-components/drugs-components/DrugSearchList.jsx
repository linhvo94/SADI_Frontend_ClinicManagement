import React from "react";
import DrugInstructionForm from './DrugInstructionForm.jsx';
import { sortListToPages } from '../../utility/utility.js';

export default class DrugSearchList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            listPages: [],
            totalPage: 0,
            finishDrugSelection: false,
            isSelectionDisabledByIndex: [],
            prescribedDrugs: [],
            drugsWithPagination: [],
        }
        this.handleFinishDrugSelection = this.handleFinishDrugSelection.bind(this);
    }

    componentDidMount() {
        this.props.fetchDrugs();
    }

    componentWillReceiveProps(props) {
        if (props.drugs.length > 0) {
            var drugs = []
            drugs = sortListToPages(props.drugs);
            var totalPage = drugs[drugs.length - 1].pageNum

            var currentState = this.state;
            currentState.listPages = []
            currentState.totalPage = totalPage;
            currentState.isSelectionDisabledByIndex = [];
            currentState.drugsWithPagination = []

            currentState.drugsWithPagination = drugs;

            for (var i = 0; i < drugs.length; i++) {
                for (var j = 0; j < drugs[i].listOf15Items.length; j++) {
                    var selectionDisabled = {};
                    selectionDisabled["id"] = drugs[i].listOf15Items[j].id;
                    selectionDisabled["value"] = false
                    for (var k = 0; k < this.state.prescribedDrugs.length; k++) {
                        if (this.state.prescribedDrugs[k].drug.id === drugs[i].listOf15Items[j].id) {
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
        if (this.state.currentPage < this.state.drugsWithPagination.length) {
            var currentListPages = this.state.listPages;
            if (this.state.currentPage === currentListPages[currentListPages.length - 1]) {
                currentListPages.shift();
                currentListPages.push(this.state.currentPage + 1)
            }
            this.setState({ currentPage: this.state.currentPage + 1, listPages: currentListPages })
        }
    }

    handleDrugUnSelect(e, drug) {
        e.preventDefault();
        var currentState = this.state;
        for (var i = 0; i < currentState.isSelectionDisabledByIndex.length; i++) {
            var selectionDisabledID = currentState.isSelectionDisabledByIndex[i].id
            if (selectionDisabledID === drug.id) {
                currentState.isSelectionDisabledByIndex[i].value = false;
            }
        }

        for (var i = 0; currentState.prescribedDrugs.length; i++) {
            if (currentState.prescribedDrugs[i].drug.id === drug.id) {
                currentState.prescribedDrugs.splice(i, 1);
                break;
            }
        }

        this.setState(currentState);

    }

    handleDrugSelect(e, drug) {
        e.preventDefault();
        var currentState = this.state;
        let prescribedDrug = {};
        prescribedDrug["drug"] = drug
        currentState.prescribedDrugs.push(prescribedDrug);

        for (var i = 0; i < currentState.isSelectionDisabledByIndex.length; i++) {
            var selectionDisabledID = currentState.isSelectionDisabledByIndex[i].id
            if (selectionDisabledID === drug.id) {
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

            for (var j = 0; j < currentState.prescribedDrugs.length; j++) {
                if (selectionDisabledID === currentState.prescribedDrugs[j].drug.id) {
                    currentState.isSelectionDisabledByIndex[i].value = false;
                }
            }
        }

        currentState.prescribedDrugs = []
        currentState.finishDrugSelection = false;

        this.setState(currentState);
    }

    handleProceedToInstruction(e) {
        e.preventDefault();
        this.setState({ finishDrugSelection: true });
    }

    handleBackToSearch(e) {
        e.preventDefault();
        this.setState({ finishDrugSelection: false });
    }


    handleFinishDrugSelection(e, isFinished) {
        e.preventDefault();
        if (isFinished === false) {
            this.handleReset(e);
        }
    }

    render() {
        return (
            <div>
                {this.state.prescribedDrugs.length > 0 ?
                    <div className="card panel-default mb-3">
                        <div className="card-body">
                            <label><strong>Drugs Selected: </strong></label>
                            <div>
                                {this.state.prescribedDrugs.map((pd, index) =>
                                    <span type="button" className="btn btn-default disease-item mr-2" key={index}>
                                        {pd.drug.drugName}
                                        <button className="float-right btn-closeForm ml-1" onClick={(e) => this.handleDrugUnSelect(e, pd.drug)}><i className='fa fa-times text-white'></i></button>
                                    </span>
                                )}
                            </div>

                            {!this.state.finishDrugSelection ? <button className="btn btn-form float-right ml-2 mt-15 mb-10" onClick={this.handleProceedToInstruction.bind(this)} >
                                Proceed to Instruction
                                </button> : null}

                            {this.state.finishDrugSelection ? <button className="btn btn-form float-right ml-2 mt-15 mb-10" onClick={this.handleBackToSearch.bind(this)} >
                                Back to Search
                                </button> : null}

                            <button className='btn btn-form float-right ml-2 mt-15 mb-10' onClick={this.handleReset.bind(this)}> Reset </button>
                        </div>
                    </div>
                    : null}
                {(this.state.drugsWithPagination.length > 0 && !this.state.finishDrugSelection) ||
                    this.state.prescribedDrugs.length === 0 ?
                    <div className="table table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-header">
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">Drug Name</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.drugsWithPagination != null ? this.state.drugsWithPagination.map((d) => d.pageNum == this.state.currentPage ?
                                    d.listOf15Items.map((drug, index) =>

                                        <tr className="text-center" key={index}>
                                            <td>{drug.id}</td>
                                            <td>{drug.drugName}</td>
                                            <td>
                                                <button className="btn btn-danger" disabled={!this.state.isSelectionDisabledByIndex[this.state.isSelectionDisabledByIndex.findIndex(obj => obj.id === drug.id)].value}
                                                    onClick={(e) => this.handleDrugUnSelect(e, drug)}>
                                                    <span className="fas fa-undo"></span> Unselect
                                                    </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success" disabled={this.state.isSelectionDisabledByIndex[this.state.isSelectionDisabledByIndex.findIndex(obj => obj.id === drug.id)].value}
                                                    onClick={(e) => this.handleDrugSelect(e, drug)}>
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

                {this.state.finishDrugSelection && this.state.prescribedDrugs.length > 0 ?
                    <DrugInstructionForm
                        visitLogID={this.props.visitLogID}
                        handleFinishDrugSelection={this.handleFinishDrugSelection}
                        addPrescriptionsForAVisit={this.props.addPrescriptionsForAVisit}
                        getPrescription={this.props.getPrescription}
                        savedPrescriptions={this.props.savedPrescriptions}
                        savePrescriptionsState={this.props.savePrescriptionsState}
                        resetPrescription={this.props.resetPrescription}
                        prescribedDrugs={this.state.prescribedDrugs} />
                    : null}
            </div>
        )
    }
}
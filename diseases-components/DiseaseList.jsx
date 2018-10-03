import React from "react";
import { sortListToPages } from '../utility/utility.js';

export default class DiseaseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            listPages: [],
            totalPage: 0,
            diseasesWithPagination: []
        }
    }

    componentWillReceiveProps(props) {
        if (props.diseases.length > 0) {
            var diseases = sortListToPages(props.diseases);
            var totalPage = diseases[diseases.length - 1].pageNum

            var currentState = this.state;
            currentState.diseasesWithPagination = [];
            currentState.listPages = [];

            currentState.diseasesWithPagination = diseases;
            currentState.totalPage = totalPage;

            if (totalPage > 0 && totalPage <= 5) {
                for (var i = 1; i <= totalPage; i++) {
                    currentState.listPages.push(i);
                }
                this.setState(currentState)
            } else if (totalPage > 5) {
                for (var i = 1; i <= 5; i++) {
                    currentState.listPages.push(i);
                }
                this.setState(currentState)
            }
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
        if (this.state.currentPage < this.state.diseasesWithPagination.length) {
            var currentListPages = this.state.listPages;
            if (this.state.currentPage === currentListPages[currentListPages.length - 1]) {
                currentListPages.shift();
                currentListPages.push(this.state.currentPage + 1)
            }
            this.setState({ currentPage: this.state.currentPage + 1, listPages: currentListPages })
        }
    }

    handleEdit(id) {
        this.props.findEditDiseaseByID(id);
        this.props.openDiseaseEditForm();
    }

    render() {
        return (
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

                    {this.state.diseasesWithPagination.length > 0 ?
                        <tbody>
                            {this.state.diseasesWithPagination.map((d) => d.pageNum == this.state.currentPage ?
                                d.listOf15Items.map((disease, index) =>

                                    <tr className="text-center" key={index}>
                                        <td>{disease.id}</td>
                                        <td>{disease.icd}</td>
                                        <td>{disease.diseaseName}</td>
                                        <td>{disease.typeCode}</td>
                                        <td>{disease.typeName}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => this.props.deleteDisease(disease.id)}>
                                                <span className="far fa-trash-alt"></span> Delete

                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-default"
                                                onClick={() => this.handleEdit(disease.id)}>
                                                <span className="far fa-edit"></span> Edit
                                        </button>
                                        </td>
                                    </tr>)

                                : null
                            )}
                        </tbody>

                        : null}


                </table>

                <ul className="pagination float-right">
                    <li className="page-item"><a className="page-link" onClick={() => this.handleGoBack()}>&laquo;</a></li>

                    {this.state.listPages.map((page, index) =>
                        <li className="page-item" key={index}>
                            <a className="page-link" onClick={() => this.handlePagnination(page)}>{page}</a>
                        </li>
                    )}

                    <li className="page-item"><a className="page-link" onClick={() => this.handleGoNext()}>&raquo;</a></li>
                </ul>
            </div>
        )
    }
}
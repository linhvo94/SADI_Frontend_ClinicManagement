import React from "react";
import { sortListToPages } from '../utility/utility.js';

export default class PatientList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            listPages: [],
            totalPage: 0,
            patientsWithPagination: []
        }
    }

    componentWillReceiveProps(props) {
        if (props.patients.length > 0) {
            var patients = sortListToPages(props.patients);

            var totalPage = patients[patients.length - 1].pageNum

            var currentState = this.state;
            currentState.patientsWithPagination = [];
            currentState.listPages = [];

            currentState.patientsWithPagination = patients;
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
        if (this.state.currentPage < this.state.patientsWithPagination.length) {
            var currentListPages = this.state.listPages;
            if (this.state.currentPage === currentListPages[currentListPages.length - 1]) {
                currentListPages.shift();
                currentListPages.push(this.state.currentPage + 1)
            }
            this.setState({ currentPage: this.state.currentPage + 1, listPages: currentListPages })
        }
    }

    handleEdit(id) {
        this.props.findEditPatientByID(id);
        this.props.openEditForm();
    }

    handleDelete(id) {
        this.props.deletePatient(id);
        this.props.closeForm();
    }

    render() {
        return (
            <div className="table table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-header">
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Gender</th>
                            <th className="text-center">DOB</th>
                            <th className="text-center">Address</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    {this.state.patientsWithPagination.length > 0 ?
                        <tbody>
                            {this.state.patientsWithPagination.map((p) => p.pageNum == this.state.currentPage ?
                                p.listOf15Items.map((patient, index) =>

                                    <tr className="text-center" key={index}>
                                        <td>{patient.id}</td>
                                        <td>{patient.name}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.dob !== null ?
                                            `${patient.dob.substring(8, 10)}-${patient.dob.substring(5, 7)}-${patient.dob.substring(0, 4)}`
                                            : null}
                                        </td>
                                        <td>{patient.address}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => this.handleDelete(patient.id)}>
                                                <span className="far fa-trash-alt"></span> Delete

                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-info"
                                                onClick={() => this.handleEdit(patient.id)}>
                                                <span className="far fa-edit"></span> Edit
                                        </button>
                                        </td>
                                    </tr>)

                                : null
                            )}
                        </tbody>

                        : null}


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
        )
    }
}
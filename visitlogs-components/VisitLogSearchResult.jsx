import React from 'react';
import { sortListToPages } from '../utility/utility.js';

export default class visitLogSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            listPages: [],
            totalPage: 0,
            visitLogsWithPagination: []
        }
    }

    componentWillReceiveProps(props) {
        if (props.visitLogs.length > 0) {
            var visitLogs = sortListToPages(props.visitLogs);
            var totalPage = visitLogs[visitLogs.length - 1].pageNum

            var currentState = this.state;
            currentState.visitLogsWithPagination = [];
            currentState.listPages = [];

            currentState.visitLogsWithPagination = visitLogs;
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
        if (this.state.currentPage < this.state.visitLogsWithPagination.length) {
            var currentListPages = this.state.listPages;
            if (this.state.currentPage === currentListPages[currentListPages.length - 1]) {
                currentListPages.shift();
                currentListPages.push(this.state.currentPage + 1)
            }
            this.setState({ currentPage: this.state.currentPage + 1, listPages: currentListPages })
        }
    }

    handleViewDetail(e, visitLogID) {
        e.preventDefault();
        if (visitLogID !== "") {
            this.props.history.push(`/visitlogdetail/${visitLogID}`);
        }
    }

    render() {
        return (
            <div className="table table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-header">
                        <tr>
                            <th className="text-center">Visit Log ID</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Time</th>
                            <th className="text-center">Patient ID</th>
                            <th className="text-center">Patient Name</th>
                            <th className="text-center">Gender</th>
                            <th className="text-center">DOB</th>
                            <th className="text-center">Address</th>
                            <th></th>
                        </tr>
                    </thead>

                    {this.state.visitLogsWithPagination.length > 0 ?
                        <tbody>
                            {this.state.visitLogsWithPagination.map((vl) => vl.pageNum == this.state.currentPage ?
                                vl.listOf15Items.map((visitLog, index) =>

                                    <tr className="text-center" key={index}>
                                        <td>{visitLog.id}</td>
                                        <td>{visitLog.visitDate !== null ?
                                            `${visitLog.visitDate.substring(8, 10)}-${visitLog.visitDate.substring(5, 7)}-${visitLog.visitDate.substring(0, 4)}`
                                            : null}
                                        </td>
                                        <td>{visitLog.visitTime}</td>
                                        <td>{visitLog.patient.id}</td>
                                        <td>{visitLog.patient.name}</td>
                                        <td>{visitLog.patient.gender}</td>
                                        <td>{visitLog.patient.dob !== null ?
                                            `${visitLog.patient.dob.substring(8, 10)}-${visitLog.patient.dob.substring(5, 7)}-${visitLog.patient.dob.substring(0, 4)}`
                                            : null}
                                        </td>
                                        <td>{visitLog.patient.address}</td>
                                        <td>
                                            <button className='btn btn-form' onClick={(e) => this.handleViewDetail(e, visitLog.id)}> View Detail </button>
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
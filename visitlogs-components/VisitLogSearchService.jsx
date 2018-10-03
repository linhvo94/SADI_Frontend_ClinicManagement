import React from 'react';
import SearchBarForSearchVisitLogService from './SearchBarForSearchVisitLogService.jsx';
import VisitLogSearchResut from './VisitLogSearchResult.jsx';

export default class VisitLogSearchService extends React.Component {

    componentWillMount() {
        this.props.fetchVisitLogs();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchBarForSearchVisitLogService
                            fetchVisitLogs={this.props.fetchVisitLogs}
                            visitLogSearchError={this.props.visitLogSearchError}
                            findVisitLogByPatientID={this.props.findVisitLogByPatientID}
                            findVisitLogByID={this.props.findVisitLogByID}
                            findVisitLogByDate={this.props.findVisitLogByDate} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <VisitLogSearchResut {...this.props} visitLogs={this.props.visitLogs} />
                    </div>
                </div>
            </div>
        )
    }
}





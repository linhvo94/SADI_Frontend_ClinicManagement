import React from 'react';
import SearchBarForSearchDrugService from './SearchBarForSearchDrugService.jsx';
import DrugSearchResult from './DrugSearchResult.jsx';

export default class DrugSearchService extends React.Component {
    
    componentWillMount() {
        this.props.fetchDrugs();
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchBarForSearchDrugService
                            fetchDrugs={this.props.fetchDrugs}
                            findDrugByName={this.props.findDrugByName}
                            findDrugByID={this.props.findDrugByID}
                            drugSearchError={this.props.drugSearchError} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <DrugSearchResult drugs={this.props.drugs} />
                    </div>
                </div>
            </div>
        )
    }
}
import React from 'react';
import SearchBarForSearchDiseaseService from './SearchBarForSearchDiseaseService.jsx';
import DiseaseSearchResult from './DiseaseSearchResult.jsx';

export default class DiseaseSearchService extends React.Component {

    componentWillMount() {
        this.props.fetchDiseases();
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchBarForSearchDiseaseService
                            fetchDiseases={this.props.fetchDiseases}
                            findDiseaseByName={this.props.findDiseaseByName}
                            findDiseaseByICD={this.props.findDiseaseByICD}
                            diseaseSearchError={this.props.diseaseSearchError} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <DiseaseSearchResult diseases={this.props.diseases} />
                    </div>
                </div>
            </div>
        )
    }
}
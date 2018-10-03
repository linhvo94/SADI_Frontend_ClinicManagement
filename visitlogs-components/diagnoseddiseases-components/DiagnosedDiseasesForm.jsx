import React from 'react';
import DiseaseSearchBar from '../diseases-components/DiseaseSearchBar.jsx'
import DiseaseSearchList from '../diseases-components/DiseaseSearchList.jsx';


export default class DiagnosedDiseasesForm extends React.Component {
    constructor() {
        super();
        this.state = {
            diagnosedDiseasesPerVisit: []
        }
    }

    componentWillMount() {
        if (this.props.visitLogID !== "") {
            this.props.getAllDiagnosedDiseasesPerVisit(this.props.visitLogID);
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ diagnosedDiseasesPerVisit: props.diagnosedDiseasesPerVisit });
    }

    render() {
        return (
            <div>
                <h3>Diagnosed Diseases</h3>

                {this.state.diagnosedDiseasesPerVisit.length === 0 ?
                    <div>
                        <DiseaseSearchBar 
                            fetchDiseases={this.props.fetchDiseases}
                            diseaseSearchError={this.props.diseaseSearchError}
                            findDiseaseByICD={this.props.findDiseaseByICD}
                            findDiseaseByName={this.props.findDiseaseByName} />

                        <DiseaseSearchList
                            fetchDiseases={this.props.fetchDiseases}
                            visitLogID={this.props.visitLogID}
                            addDiagnosedDiseasesForAVisit={this.props.addDiagnosedDiseasesForAVisit}
                            diseases={this.props.diseases} />
                    </div>

                    :
                    <div className="table table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-header">
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">ICD</th>
                                    <th className="text-center">Disease Name</th>
                                    <th className="text-center">Type Code</th>
                                    <th className="text-center">Type Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.diagnosedDiseasesPerVisit.map((dd, index) =>
                                    <tr className="text-center" key={index}>
                                        <td>{dd.disease.id}</td>
                                        <td>{dd.disease.icd}</td>
                                        <td>{dd.disease.diseaseName}</td>
                                        <td>{dd.disease.typeCode}</td>
                                        <td>{dd.disease.typeName}</td>
                                    </tr>)}
                            </tbody>

                        </table>
                    </div>
                }
            </div>
        )
    }
}


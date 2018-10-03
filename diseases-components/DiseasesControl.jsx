import React from "react";
import DiseaseForm from './DiseaseForm.jsx';
import DiseaseList from './DiseaseList.jsx';
import DiseaseAddButtonAndSearchBar from './DiseaseAddButtonAndSearchBar.jsx';


export default class DiseasesControl extends React.Component {

    componentWillMount() {
        this.props.fetchDiseases();
    }

    render() {
        return (
            <div className="row">
                <div className={this.props.diseaseFormDisplay ? "col-md-5" : "col-md-1"} >
                    {this.props.diseaseFormDisplay ?
                        <DiseaseForm
                            editDisease={this.props.editDisease}
                            addDisease={this.props.addDisease}
                            updateDisease={this.props.updateDisease}
                            resetDisease={this.props.resetDisease}
                            closeDiseaseForm={this.props.closeDiseaseForm} />
                        : null}

                </div>

                <div className={this.props.diseaseFormDisplay ? "col-md-7" : "col-md-10"}>

                    <DiseaseAddButtonAndSearchBar
                        fetchDiseases={this.props.fetchDiseases}
                        toggleDiseaseForm={this.props.toggleDiseaseForm}
                        resetDisease={this.props.resetDisease}
                        findDiseaseByName={this.props.findDiseaseByName}
                        findDiseaseByICD={this.props.findDiseaseByICD}
                        diseaseSearchError={this.props.diseaseSearchError} />

                    <DiseaseList
                        diseases={this.props.diseases}
                        deleteDisease={this.props.deleteDisease}
                        findEditDiseaseByID={this.props.findEditDiseaseByID}
                        openDiseaseEditForm={this.props.openDiseaseEditForm} />
                </div>

            </div>
        )
    }

}
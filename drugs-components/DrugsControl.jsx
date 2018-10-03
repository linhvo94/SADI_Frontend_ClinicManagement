import React from "react";
import DrugForm from './DrugForm.jsx';
import DrugList from './DrugList.jsx';
import DrugAddButtonAndSearchBar from './DrugAddButtonAndSearchBar.jsx';


export default class DrugsControl extends React.Component {

    componentWillMount() {
        this.props.fetchDrugs();
    }

    render() {
        return (
            <div className="row">
                <div className={this.props.formDisplay ? "col-md-5" : "col-md-1"} >
                    {this.props.formDisplay ?
                        <DrugForm
                            editDrug={this.props.editDrug}
                            addDrug={this.props.addDrug}
                            updateDrug={this.props.updateDrug}
                            resetDrug={this.props.resetDrug}
                            closeForm={this.props.closeForm} />
                        : null}

                </div>

                <div className={this.props.formDisplay ? "col-md-7" : "col-md-10"}>

                    <DrugAddButtonAndSearchBar
                        fetchDrugs={this.props.fetchDrugs}
                        toggleForm={this.props.toggleForm}
                        resetDrug={this.props.resetDrug}
                        findDrugByName={this.props.findDrugByName}
                        findDrugByID={this.props.findDrugByID}
                        drugSearchError={this.props.drugSearchError} />

                    <DrugList
                        drugs={this.props.drugs}
                        deleteDrug={this.props.deleteDrug}
                        findEditDrugByID={this.props.findEditDrugByID}
                        openEditForm={this.props.openEditForm} />
                </div>

            </div>
        )
    }

}
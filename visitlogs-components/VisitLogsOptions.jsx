import React from 'react';
import { Link } from 'react-router-dom';

export default class VisitLogsOptions extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2 col-sm-2"></div>
                <div className="col-md-8 col-sm-12">
                    <div className="card panel-border visitform-container">
                        <div className="card-header card-header">
                            Visit Log Form
                    </div>
                        <div className="card-body">
                            <div className="form-group">
                                <Link to={'/createnewvisitlog'} className="btn btn-default btn-option" role="button">
                                    Create New Visit Log
                            </Link>
                            </div>
                            <div className="form-group">
                                <Link to={'/fillinvisitlogform'} className="btn btn-default btn-option" role="button">
                                    Fill In & Edit Existing Visit Log
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-2"></div>
            </div>


            // <div>
            //     <div className="panel panel-border panel-visitlogcontrol">
            //         <div className="card-header">
            //             <h3 className="panel-title">Visit Logs Control</h3>
            //         </div>
            //         <div className="panel-body panel-visitlogcontrolbody">
            //             <div className='form-group'>
            //                 <Link to={'/createnewvisitlog'} className="btn btn-default btn-option" role="button">
            //                     Create New Visit Log
            //                 </Link>
            //             </div>
            //             <div className='form-group'>
            //                 <Link to={'/fillinvisitlogform'} className="btn btn-default btn-option" role="button">
            //                     Fill In & Edit Existing Visit Log
            //                 </Link>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}
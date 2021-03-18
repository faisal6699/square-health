import React from 'react'
import {Route, Switch, Redirect } from 'react-router-dom'
import DoctorList from '../screens/doctorList/DoctorList'
import SelectedDoctor from '../screens/selectedDoctor/SelectedDoctor'

const BaseRouter = () =>{

    return(
        <div>
            <switch>
                <Route exact path = '/' component={DoctorList}  />
                <Route exact path = '/:name' component={SelectedDoctor} />                                
            </switch>
        </div>
    )

}

export default BaseRouter;
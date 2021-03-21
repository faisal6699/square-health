import React from 'react'
import {Route, Switch } from 'react-router-dom'
import DoctorList from '../screens/doctorList/DoctorList'
import SelectedDoctor from '../screens/selectedDoctor/SelectedDoctor'

const BaseRouter = () =>{

    return(
        <div>
            <Switch>
                <Route exact path = '/' component={DoctorList}  />
                <Route exact path = '/:name' component={SelectedDoctor} />                                
            </Switch>
        </div>
    )

}

export default BaseRouter;
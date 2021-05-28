
import './App.css';
import React,{useEffect,useState} from 'react';
import axios from "axios";
import Login from "./assets/Login/Login"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
    Redirect
} from "react-router-dom";
import Signup from './assets/Signup/Signup'
import Dashboard from './assets/Dashboard/Dashboard'
import GreenhouseRegister from './assets/Greenhouse_Register/GreenhouseRegister'
import GreenhouseHarvest from "./assets/Greenhouse_Harvest/Greenhouse_Harvest";
import Greenhouse from "./assets/Greenhouse/Greenhouse";
import Metrics from './assets/Greenhouse_Metrics/Greenhouse_Metrics'
import PlantMetrics from'./assets/Plant_Metrics/PlantMetrics'
import Products from './assets/Products/Products'
import ProductAverages from './assets/Product_Averages/ProductsAverages'
import Dictionary from './assets/Dictionary/Dictionary'
import Maintenance from './assets/Maintenance/Maintenance'
import Admin from './assets/Admin/Admin'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/ProtectedRoute"
import MaintenanceRoute from "./components/MaintenanceRoute/ProtectedRoute"

function App() {
  // const [Message,setMessage] = useState("")
  //   const[Resp,setResp] = useState()
  // useEffect(()=>{
  //   GetRestObject.GetRestRequest('/flask/hello',getResultObj => {
  //     console.log(getResultObj)
  //     setGetMessage(getResultObj.message)
  //   })
  // },[])
//     useEffect(()=>{
// getMessage()
//     },[])

//
// async function getMessage(){
// const res = await axios.get('http://127.0.0.1:5000/flask')
//  setMessage(res.data.message)
// }




//


//
//  console.log(secret.data.answer)
//   }
// const list = ['a','b','c','d','e']
  return (
    <div>
        <Router>
             <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/greenhouse" exact component={Dashboard}/>
        <ProtectedRoute path="/greenhouse-register" exact component={GreenhouseRegister}/>
        <ProtectedRoute path="/greenhouse/:id/harvest" exact component={GreenhouseHarvest}/>
        <ProtectedRoute path="/greenhouse/:id" component={Greenhouse}/>
        <Route path="/metrics/:id" component={Metrics}/>
        <ProtectedRoute path="/plant/:ghid/:id" component={PlantMetrics}/>
        <ProtectedRoute path="/Products" exact component={Products}/>
        <ProtectedRoute path="/Products/:id" exact component={ProductAverages}/>
        <ProtectedRoute path="/Dictionary" exact component={Dictionary}/>
        <Route path="/Maintenance" exact component={Maintenance}/>
        <Route path="/Admin" exact component={Admin}/>
        {/*<button onClick={postRegister}>Register</button>*/}
        {/*<button onClick={getSecretMessage}>Secret</button>*/}
        {/*{list.map((element)=>(<Login name={element}/>))}*/}
        <Route>
<h1>404</h1>
</Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

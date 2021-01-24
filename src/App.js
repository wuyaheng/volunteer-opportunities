import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
import SearchForm from "./components/SearchForm/index";
import OpportunitiesSelect from "./components/OpportunitiesSelect/index";
import Visuals from "./components/Visuals/index";
import Table from "./components/Table/index";
import './App.css';
import axios from "axios"

class App extends Component {
  state = {
    nta: [],
    opp: [],
    sel_nta: "",
    sel_opp: "", 
    opportunities: []
  }

  componentDidMount() {
    this.setState(
      {
        sel_nta: "Battery Park City-Lower Manhattan",
      },
      () => {
      this.fetchOpportunities()
      });
    this.fetchnta();
  }


  fetchOpp = async () => {
    try {
      const res = await axios.get(
        'https://data.cityofnewyork.us/resource/shpd-5q9m.json?$group=opportunity_id&$select=opportunity_id'
      );
      this.setState({
        opp: res.data.map((x) => x.opportunity_id)
      });
    } catch (error) {
      console.log(error)
    }
  } 

  fetchnta = async () => {
    try {
      const res = await axios.get(
        'https://data.cityofnewyork.us/resource/shpd-5q9m.json?$group=nta&$select=nta'
      );
      this.setState({
        nta: res.data.map((x) => x.nta)
      });
    } catch (error) {
      console.log(error)
    }
  } 

  fetchOpportunities = async () => { 
    const res = await axios.get('https://data.cityofnewyork.us/resource/shpd-5q9m.json',
    {
      params: {
        nta: this.state.sel_nta 
      }
    }
    )

    this.setState({
      opportunities: res.data
    })
  }



  handleInputChange = (event) => {
    this.setState(
      {
        sel_nta: event.target.value
      },
      () => {
      this.fetchOpportunities()
      })
  }

  handleOppChange = (event) => {
    const sel_opp = event.target.value;
    const filteredOpp = this.state.opportunities.filter(ele => {
      return ele.opportunity_id === sel_opp
    })
    this.setState(
      {
        sel_opp: event.target.value,
        opp: filteredOpp
      })
  }

  render() {
    return (
      <>
      <nav className="navbar navbar-light bg-dark justify-content-center"> 
          <span className="navbar-brand mb-0 h1 text-white pt-1">
          NYC Volunteer Opportunities  
          </span>
      </nav>
   
      <div className="container-fluid">
      <div className="row mt-2">

      <div className="col-md-6">
      <h5>&nbsp;Choose a neighborhood</h5>
        <SearchForm results={this.state.nta} handleInputChange={this.handleInputChange} /> 
        <h5>&nbsp;You can also filter by opportunity</h5>
        {
          this.state.sel_nta
          && <OpportunitiesSelect results={this.state.opportunities} handleOppChange={this.handleOppChange} /> 
        }
       
        
 
      <Visuals results={this.state.opp.length > 0 ? this.state.opp : this.state.opportunities} />
   
      </div>

      <div className="col-md-6">
      <div className="card">
      <MapBox results={this.state.opp.length > 0 ? this.state.opp : this.state.opportunities} /> 
      </div>
      </div>

      </div>
      <div className="row mt-2">
      <div className="col-md-12">
        <Table results={this.state.opp.length > 0 ? this.state.opp : this.state.opportunities} /> 
      </div>
      </div>
        <div className="row justify-content-center mb-1">
          <p>Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="NYC open data" href="https://data.cityofnewyork.us/Social-Services/Volunteer-Opportunities-and-Finding-Organizations/shpd-5q9m">NYC OpenData</a></p>
        </div>

       </div> 
      </>
    )
  }
}

export default App;

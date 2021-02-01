import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
import SearchForm from "./components/SearchForm/index";
import OpportunitiesSelect from "./components/OpportunitiesSelect/index";
import Visuals from "./components/Visuals/index";
import Table from "./components/Table/index";
import './App.css';
import axios from "axios"
const ALLNEIGHBORHOOD = "All Neighborhood"


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
        sel_nta: ALLNEIGHBORHOOD,
      },
      () => {
      this.fetchOpportunities()
      });
    this.fetchnta();
  }


  fetchnta = async () => {
    try {
      const res = await axios.get(
        'https://data.cityofnewyork.us/resource/shpd-5q9m.json?$group=nta&$select=nta'
      );
      const dropdownNta = res.data.map((x) => x.nta)
      const dropdown = [ALLNEIGHBORHOOD,...dropdownNta]
      this.setState({
        nta: dropdown
      });
    } catch (error) {
      console.log(error)
    }
  } 

  fetchOpportunities = async () => { 
    let options = {}
    if (this.state.sel_nta !== ALLNEIGHBORHOOD) {
      options = { 
        params: {
          nta: this.state.sel_nta 
        }
      }
    }
    const res = await axios.get('https://data.cityofnewyork.us/resource/shpd-5q9m.json',options)

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
      <div className="row mt-2 vh-70">

      <div className="col-md-4">
      <h5>&nbsp;Choose a Neighborhood</h5>
        <SearchForm results={this.state.nta} handleInputChange={this.handleInputChange} /> 
        <h5>&nbsp;Select a Volunteer Opportunity</h5>
        {
          this.state.sel_nta
          && <OpportunitiesSelect results={this.state.opportunities} handleOppChange={this.handleOppChange} /> 
        }
      <Visuals results={this.state.opp.length > 0 ? this.state.opp : this.state.opportunities} />
      </div>
      <div className="col-md-8">
      <div className="card mt-1 map-container">
      <MapBox results={this.state.opp.length > 0 ? this.state.opp : this.state.opportunities} /> 
      </div>
      </div>

      </div>
      <div className="row mt-2">
      <div className="col-md-12 table-responsive">
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

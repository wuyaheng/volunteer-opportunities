import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
// import GeoMap from "./components/GeoMap/index";
import SearchForm from "./components/SearchForm/index";
import OpportunitiesSelect from "./components/OpportunitiesSelect/index";
import Visuals from "./components/Visuals/index";
import Table from "./components/Table/index";
import './App.css';
import axios from "axios"
import geodata from "./data/nyc.geojson"
const ALLNEIGHBORHOOD = "All Neighborhood"

class App extends Component {
  state = {
    nta: [],
    filteredOpportunities: [],
    sel_nta: "",
    sel_opp: "", 
    opportunities: []
    // geo: []
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
    // this.fetchgeodata()
  }

  // fetchgeodata = async () => {
  //   try {
  //     const res = await axios.get(geodata);
  //     this.setState({
  //       geo: res.data
  //     });
  //     console.log(this.state.geo)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // } 


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
        filteredOpportunities: filteredOpp
      })
  }


  render() {
    return (
      <>
      <nav className="nav-wrapper"> 
          <span className="brand-logo center"> 
          NYC Volunteer Opportunities
          </span>
      </nav>
   
      <div className="container-fluid">
      <div className="row mt-1 mb-0 flex">

      <div className="col-md-4">
      <div className="card" style={{height: "66vh"}}>
      <div className="searchCard">
      <h6>&nbsp; <b>Choose a Neighborhood</b></h6> 
        <SearchForm results={this.state.nta} handleInputChange={this.handleInputChange} /> 
        <h6>&nbsp; <b>Select a Volunteer Opportunity</b></h6> 
        {
          this.state.sel_nta
          && <OpportunitiesSelect results={this.state.opportunities} handleOppChange={this.handleOppChange} /> 
        }
        </div>
      <Visuals results={this.state.filteredOpportunities.length > 0 ? this.state.filteredOpportunities : this.state.opportunities} />
      </div>
      </div>

      {/* <div className="col-md-4">
      <div className="card mt-2 map-container">
      <GeoMap results={this.state.geo} /> 
      </div>
      </div> */}

      <div className="col-md-8">
      <div className="card mt-2 map-container"> 
      <MapBox results={this.state.filteredOpportunities.length > 0 ? this.state.filteredOpportunities : this.state.opportunities} /> 
      </div>
      </div>

      </div>
      <div className="row mb-0">
      <div className="col-md-12 table-responsive">
        <Table results={this.state.filteredOpportunities.length > 0 ? this.state.filteredOpportunities : this.state.opportunities} /> 
      </div>
      </div>
        <div className="row justify-content-center mb-1 mt-0"> 
          <p>Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="NYC open data" href="https://data.cityofnewyork.us/Social-Services/Volunteer-Opportunities-and-Finding-Organizations/shpd-5q9m">NYC OpenData</a></p>
        </div>

       </div> 
      </>
    )
  }
}

export default App;

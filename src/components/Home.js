import { HomeSearch } from "./countries-search/HomeSearch";
import CountriesList from "./countries-list/CountriesList";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      region: ''
    }
  }
  onFilterByRegion = (region) => {
    if(region) {
      this.setState({region: region})
      this.props.getCountriesByRegion(region);
    }
  }
  onSearchingCountries = (name) => {
    if(name) {
      this.props.history.push({
        pathname: '/search',
        search: `?country=${name}`
      })
      this.props.searchCountriesByName(name);
    } else {
      this.setState({countryName: name});
      this.props.history.push({
        pathname: '/',
      })
    }
  }
  render() {
    if(this.props.list) {
      const countriesList = this.props.list['countriesList'];
      return (
        <div className="page-content container">
          <HomeSearch filterByRegion={this.onFilterByRegion} searchCountries={this.onSearchingCountries}></HomeSearch>
          <CountriesList countries={countriesList}></CountriesList>
        </div>
      );
    }
  }
  componentDidMount = () => {
    this.props.getAllCountries();
  };
}

const mapStateToProps = (state) => {
  return {
      list: state.countries
  };
};

export default connect(mapStateToProps, actions)(Home);

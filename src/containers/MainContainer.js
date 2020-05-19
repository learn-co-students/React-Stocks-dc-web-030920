import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor(){
    super()
    this.state={
      stocks: [],
      myStocks: [],
      sortBy: null,
      filter: 'all'
    }
  }
 
  buyStock = (stock) => {
    this.setState({
      myStocks: this.state.myStocks.concat(stock)
    })
  }

  sellStock = (stock) => {
    this.setState({
      myStocks: this.state.myStocks.filter(stock => stock !== stock)
    })
  }

  setFilter = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  sortByAndFilter = () => {
    let filteredStocks = this.state.stocks
    if (this.state.filter !== 'all'){
      filteredStocks = this.state.stocks.filter(stock => stock.type === this.state.filter)
    }
    if (this.state.sortBy === 'Alphabetically'){
      return(filteredStocks.sort((a, b) => a.name.localeCompare(b.name)))
    }else if (this.state.sortBy === 'Price'){
      return(filteredStocks.sort((a, b) => a.price - b.price))
    }
    else if (this.state.sortBy === null){
      return filteredStocks
    }
  }


  setSortBy = (event) => {
    this.setState({
      sortBy: event.target.value
    })
  }



  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(resp=> resp.json())
    .then(data => {
      this.setState({
        stocks: data
      } )
    })
  }

  render() {
    return (
      <div>
        <SearchBar sortBy={this.state.sortBy} setSortBy={this.setSortBy} setFilter={this.setFilter} filter={this.state.filter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.sortByAndFilter()} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer myStocks={this.state.myStocks} sellStock={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;

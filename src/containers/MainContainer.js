import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

let url = "http://localhost:3000/stocks"

class MainContainer extends Component {
  constructor(){
    super()
    this.state = {
      stocks: [],
      portfolio: [],
      displayStocks: []
    }
  }

  componentDidMount(){
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        stocks: data,
        displayStocks: data
      })
    })
  }

  addPortfolio = (stock) => {
    this.setState({
      portfolio: [...this.state.portfolio, stock]
    })
  }

  sellStock = (stock) => {
    this.setState({
      portfolio: this.state.portfolio.filter(s => s !== stock)
    })
  }

  filterStocks = (type) => {
    if (type !== "All") {
      this.setState({
        displayStocks: this.state.stocks.filter(stock => stock.type === type)
      })
    } else{
      this.setState({
        displayStocks: this.state.stocks
      })
    }
  }

  alphabatizeSort = (event) => {
    let sort = this.state.displayStocks.sort(function(a, b) {
      return (a.name < b.name) ? -1 : (a > b) ? 1 : 0;
    })
    this.setState({
      displayStocks: sort
    })
  }

  priceSort = (event) => {
    let sort = this.state.displayStocks.sort(function(a, b) {
      return (a.price < b.price) ? -1 : (a > b) ? 1 : 0;
    })
    this.setState({
      displayStocks: sort
    })
  }

  render() {
    console.log(this.state.stocks)
    return (
      <div>
        <SearchBar filterType={this.filterStocks} alphabatize={this.alphabatizeSort} priceSort={this.priceSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocksData={this.state.displayStocks} add={this.addPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocksData={this.state.portfolio} remove={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;

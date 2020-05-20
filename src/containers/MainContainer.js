import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor(){
    super()
    this.state ={
      allStocks: [],
      stocks: [],  // same here u update it an pass it
      portfolio: [], //after you update it u need to pass it as this.state.portfolio
      price: false,
      alpha: false,
      type: null
    }
  }


componentDidMount(){
  fetch("http://localhost:3000/stocks")
  .then(resp => resp.json())
  .then(stocksArr => 
    this.setState({
      stocks: stocksArr, allStocks: stocksArr
    })
    )
}

handleAddStock =(stock, e) =>{
  console.log("this adds buddy")
  this.setState({
    portfolio: [...this.state.portfolio, stock]
  })
}

removeStock = (stock) =>{
  console.log("this removes buddy")
  let portfolioStocks = this.state.portfolio
  portfolioStocks = portfolioStocks.filter(currentStock => currentStock.id !== stock.id)
  this.setState({portfolio: portfolioStocks})
  console.log(portfolioStocks)
}

handleFilter = (event) => {
  console.log("clicked")

  let filterName = event.target.value
  if(filterName === "Alphabetically"){
    this.setState({price: false, alpha: true, stocks: this.state.stocks.sort((a, b) => a.name.localeCompare(b.name))})
  }else if(filterName === "Price"){
    this.setState({price: true, alpha: false, stocks: this.state.stocks.sort(function(obj1, obj2){
      // Ascending: first age less than the previous
      return obj1.price - obj2.price;
    })})
  }else{
    this.setState({stocks: this.state.allStocks.filter(stock => stock.type === event.target.value)})
  }

 

}
  render() {
    return (
      <div>
        <SearchBar price={this.state.price} alpha={this.state.alpha} handleFilter={this.handleFilter} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} action={this.handleAddStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} action={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;

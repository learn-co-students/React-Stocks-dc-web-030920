import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.stocksData.map(stock => {
            return <Stock stockObj={stock} key={stock.id} addPort={this.props.add}/>
          })
        }
      </div>
    );
  }

}

export default StockContainer;

import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.stocksData.map(stock => {
              return <Stock stockObj={stock} remove={this.props.remove} key={stock.id}/>
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;

import React from 'react'

const Stock = (props) => (
  <div>

    <div className="card" onClick={(e) => props.action(props.stock, e)}>
      <div className="card-body">
        <h5 className="card-title">{
             props.stock.name//Company Name 
          }</h5>
        <p className="card-text">{
            props.stock.price//ticker: stock price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock

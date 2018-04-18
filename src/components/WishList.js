import React from 'react';

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showItems: false,
      height: true,
      description: true,
      hover: false
    }
    this.expand = this.expand.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
  }

  expand() {
    this.setState({
      showItems: !this.state.showItems,
      height: !this.state.height,
      description: !this.state.description
    });
  }

  mouseOver(){
    this.setState({hover: !this.state.hover});
  }

  render() {
    let divHeight = this.state.height ? '120px' : 'fit-content';
    let description = this.state.description ? '' : 'none';
    return (
      <div>
        {!this.props.beer.noData
          ?
            <div className="beers-wishlist" style={{height: divHeight}}>
              <div className="beersTitle-wishlist">{this.props.beer.name}
                <button className="expand-wishlist" onClick={(event) => {
                  this.expand()
                  event.stopPropagation()}}><i className="fa fa-plus-square-o"></i></button>
              </div>
              <div onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOver} className="brewer">
                {this.props.beer.brewer}
                {this.state.hover && this.state.showItems ? <img alt="beer" src={this.props.beer.brewerIcon}/> : null}
              </div>
              <p style={{display: description}} className="description">{this.props.beer.des.split(' ').slice(0,20).join(' ')}...</p>
              {this.state.showItems
                ?
                  <div className="wrapper">
                    <div className="longDescription">
                      <p>{this.props.beer.des}</p>
                      <p style={{"font-weight": "900"}}>ABV: {this.props.beer.abv}</p>
                    </div>
                    <div className="img">
                      <img alt="beer" width="150" height="150" className="image" src={this.props.beer.icon}/>
                    </div>
                    <div className="bottom"><button className="wishlist-remove" onClick={this.props.removeBeer} data-id={this.props.beer.id} data-list={"deleteWishlistBeer"}>Remove from my list</button>
                    </div>
                  </div>
                : null}
            </div>
          : <div className="addMore-wishlist" onClick={(e) => {this.props.handleClicks('Home')}}>Add more beers to your list!</div>
        }
      </div>
    )
  }
}

export default WishList;
import React from 'react';

class Beer extends React.Component {
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

  mouseOver() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    let divHeight = this.state.height ? '120px' : 'fit-content';
    let description = this.state.description ? '' : 'none';
    return (
      <div>
        {!this.props.beer.noData
          ? <div className='beers' style={{height: divHeight}}>
              <div className='beersTitle'>{this.props.beer.name}
                <button className='expand' onClick={(event) => {
                  this.expand()
                  event.stopPropagation()}}><i className='fa fa-plus-square-o'></i></button>
              </div>
              <div onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOver} className='brewer'>
                {this.props.beer.brewer}
                {this.state.hover && this.state.showItems ? <img alt='' src={this.props.beer.brewerIcon}/> : null}
              </div>
              <p style={{display: description}} className='description'>{this.props.beer.des.split(' ').slice(0,20).join(' ')}...</p>
              {this.state.showItems
                ? <div className='wrapper'>
                    <div className='longDescription'>
                      <p>{this.props.beer.des}</p>
                      {this.props.beer.abv
                        ? <p style={{'fontWeight': '900'}}>ABV: {this.props.beer.abv}%</p>
                        : null
                      }
                    </div>
                    <div className='img'>
                      <img alt='' width='150' height='150' className='image' src={this.props.beer.icon}/>
                    </div>
                    {this.props.user
                      ? <div className='bottom'>
                          <button className='tried-button' onClick={(e) => {
                            this.props.addOrRemoveBeer('POST', this.props.beer.id, 'savebeer')}}>
                            Add to my list
                          </button>
                          <button className='wishlist-button' onClick={(e) => {
                            this.props.addOrRemoveBeer('POST', this.props.beer.id, 'wishList')}}>
                            Add to wishlist
                          </button>
                        </div>
                      : <div style={{'color':'red'}} className='bottom'>
                          Login or create an account to keep track of beers you've tried and add beers to your wishlist!
                      </div>
                    }
                  </div>
                : null
              }
            </div>
          : <div className='addMore'>Sorry, we couldn't find anything :(</div>
        }
      </div>
    )
  }
}

export default Beer;
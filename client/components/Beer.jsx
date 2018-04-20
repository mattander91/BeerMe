const React = require('react');

//Beers returned from Search
class Beer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showItems: false,
      height: true,
      description: true,
      hover: false,
      showLeftCheck: false,
      showRightCheck: false
    }
    this.expand = this.expand.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.showRightCheck = this.showRightCheck.bind(this);
    this.showLeftCheck = this.showLeftCheck.bind(this);
  }

  //linked to expand button on top right of each beer div.
  //expands divs to show more info including full description, beer image, brewer logo/image,
  //  ABV, and buttons for adding to lists when logged in.
  expand() {
    this.setState({
      showItems: !this.state.showItems,
      height: !this.state.height,
      description: !this.state.description
    });
  }

  //handles hovering over brewer name to show brewer icon/logo
  mouseOver() {
    this.setState({hover: !this.state.hover});
  }

  showLeftCheck() {
    this.setState({showLeftCheck: !this.state.showLeftCheck});
    setTimeout(() => {
      this.setState({showLeftCheck: !this.state.showLeftCheck});
    }, 1000);
  }

  showRightCheck() {
    this.setState({showRightCheck: !this.state.showRightCheck});
    setTimeout(() => {
      this.setState({showRightCheck: !this.state.showRightCheck});
    }, 500);
  }

  render() {
    let divHeight = this.state.height ? '120px' : 'fit-content';
    let description = this.state.description ? '' : 'none';
    return (
      <div>
        {!this.props.beer.noData
            /* Show results if any */
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
                        /* Show ABV if provided */
                        ? <p style={{'fontWeight': '700'}}>ABV: {this.props.beer.abv}%</p>
                        : null
                      }
                      {this.props.beer.ibu
                        /* Show ABV if provided */
                        ? <p style={{'fontWeight': '700'}}>IBU: {this.props.beer.ibu}</p>
                        : null
                      }
                    </div>
                    <div className='img'>
                      <img alt='' width='150' height='150' className='image' src={this.props.beer.icon}/>
                    </div>
                    {this.props.user
                        /* Show add to list buttons if user is logged in */
                      ? <div className='bottom'>
                          <div className="check-left">
                            {this.state.showLeftCheck
                              ? <img alt='' src='img/green-check.png'/>
                              : null
                            }
                          </div>
                          <button className='tried-button' onClick={(e) => {
                            this.showLeftCheck(e)
                            this.props.addOrRemoveBeer('POST', this.props.beer.id, 'savebeer')}}>
                            Add to tried beers list
                          </button>
                          <div className="check-right">
                            {this.state.showRightCheck
                              ? <img alt='' src='img/green-check.png'/>
                              : null
                            }
                          </div>
                          <button className='wishlist-button' onClick={(e) => {
                            this.showRightCheck(e)
                            this.props.addOrRemoveBeer('POST', this.props.beer.id, 'wishList')}}>
                            Add to wishlist
                          </button>
                        </div>
                        /* Tell user to create account or sign in */
                      : <div style={{'color':'red'}} className='bottom'>
                          Login or create an account to keep track of beers you've tried and add beers to your wishlist!
                      </div>
                    }
                  </div>
                : null
              }
            </div>
            /* Tell user nothing was returned from search */
          : <div className='addMore'>Sorry, we couldn't find anything :(</div>
        }
      </div>
    )
  }
}

module.exports = Beer;
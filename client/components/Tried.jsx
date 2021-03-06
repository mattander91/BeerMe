const React = require('react');

class Tried extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showItems: false,
      height: true,
      description: true,
      hover: false,
      showCheck: false
    }
    this.expand = this.expand.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
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

  render() {
    let divHeight = this.state.height ? '120px' : 'fit-content';
    let description = this.state.description ? '' : 'none';
    return (
      <div>
        {!this.props.beer.noData
          /* Show tried beers if any */
          ? <div className='beers-tried' style={{height: divHeight}}>
              <div className='beersTitle-tried'>{this.props.beer.name}
                <button className='expand-tried' onClick={(event) => {
                  this.expand()
                  event.stopPropagation()}}><i className='fa fa-plus-square-o'></i></button>
              </div>
              <div onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOver} className='brewer'>
                {this.props.beer.brewer}
                {this.state.hover && this.state.showItems ? <img alt='' src={this.props.beer.brewerIcon}/> : null}
              </div>
              <p style={{display: description}} className='description'>
                {this.props.beer.des.split(' ').slice(0,20).join(' ')}...
              </p>
              {this.state.showItems
                ? <div className='wrapper'>
                    <div className='longDescription'>
                      <p>{this.props.beer.des}</p>
                      {this.props.beer.abv
                        /* Show ABV if provided */
                        ? <p style={{'fontWeight': '900'}}>ABV: {this.props.beer.abv}%</p>
                        : null
                      }
                      {this.props.beer.ibu
                        /* Show ABV if provided */
                        ? <p style={{'fontWeight': '900'}}>IBU: {this.props.beer.ibu}</p>
                        : null
                      }
                    </div>
                    <div className='img'>
                      <img alt='' width='150' height='150' className='image' src={this.props.beer.icon}/>
                    </div>
                    <div className='bottom'>
                      <button className='tried-remove' onClick={(e) => {
                        this.props.addOrRemoveBeer('DELETE', this.props.beer.id, 'deleteBeer')}}>
                        Remove from my list
                      </button>
                    </div>
                  </div>
                : null
              }
            </div>
            /* Suggest adding more tried beers if none */
          : <div className='addMore-tried' onClick={(e) => {this.props.handleClicks('Home')}}>
              Add more beers to your list!
            </div>
        }
      </div>
    )
  }
}

module.exports = Tried;


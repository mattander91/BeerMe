import React from 'react';

class Tried extends React.Component {
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
    this.resetForm = this.resetForm.bind(this);
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

  resetForm() {
    document.getElementById("notesInput").reset();
  }

  render() {
    let divHeight = this.state.height ? '120px' : 'fit-content';
    let description = this.state.description ? '' : 'none';
    return (
      <div>
        {!this.props.beer.noData
          ?
            <div className="beers" style={{height: divHeight}}>
              <div className="beersTitle">{this.props.beer.name}
                <button className="expand" onClick={(event) => {
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
                      <form id="notesInput" onSubmit={(e) => {
                        this.submitNote(e, this.props.beer.id);
                        this.resetForm(e)}}>
                        <input type="text" placeholder={'Add notes...'} onChange={ event =>
                          this.onNoteChange(event)}/>
                        <button>Add</button>
                      </form>
                    </div>
                    <div className={"img"}>
                      <img alt="beer" className="image" src={this.props.beer.icon}/>
                    </div>
                    <div className="bottom"><button onClick={this.props.removeBeer} data-id={this.props.beer.id} data-list={"deleteBeer"} style={{"backgroundColor": 'red'}}>Remove from my list</button>
                    </div>
                  </div>
                : null}
            </div>
          : <div className="addMore" onClick={this.props.handleHome}>Add more beers to your list!</div>
        }
      </div>
    )
  }
}

export default Tried;


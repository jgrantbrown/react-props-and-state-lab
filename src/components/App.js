import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) =>{
      this.setState(
      {filters: Object.assign({}, this.state.filters, {type: e.target.value})}
    )
    }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all'){
      fetch('/api/pets')
        .then(function(response){
          return response.json()
        }).then(function(myJson) {
            debugger
            // does this need to be a string?
            this.setState(
              {pets: myJson}
            )
          })
    }else{
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(function(response){
        return response.json()
      }).then(function(myJson) {
        this.setState(
          {pets: JSON.stringify(myJson)}
        )
        })
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">

              <Filters onChangeType={this.onChangeType.bind(this)} onClick={this.onFindPetsClick.bind(this)} />

            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

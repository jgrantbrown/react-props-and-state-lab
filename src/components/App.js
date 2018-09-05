import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(p => {

     return p.id === petId ? { ...p, isAdopted: true } : p;
   });
   this.setState({ pets });
  }

  onChangeType = (e) =>{
      this.setState(
      {filters: Object.assign({}, this.state.filters, {type: e.target.value})}
    )
    }

  onFindPetsClick = () => {
    let url = ''
      if (this.state.filters.type === 'all'){
          url = '/api/pets'
      }else{
           url = `/api/pets?type=${this.state.filters.type}`
      }

      fetch(url)
        .then ((response) => {
          return response.json()
        }).then((myJson) => {
            // does this need to be a string?
            this.setState(
              {pets: myJson}
            )
          })
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

              <Filters onChangeType={this.onChangeType.bind(this)} onFindPetsClick={this.onFindPetsClick.bind(this)} />

            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}  onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

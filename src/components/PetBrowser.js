import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {

    const showPets = this.props.pets.map(pet => {
        return <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet}/> })

    return <div className="ui cards"> {showPets} </div>
  }
}

export default PetBrowser

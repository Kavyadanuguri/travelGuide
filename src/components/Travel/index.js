import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class Travel extends Component {
  state = {fetchedData: [], isValue: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    const updatedData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      description: each.description,
      imageUrl: each.image_url,
    }))
    this.setState({fetchedData: updatedData, isValue: true})
  }

  render() {
    const {fetchedData, isValue} = this.state
    return (
      <div className="bg-container">
        <div className="container1">
          <h1 className="heading1">Travel Guide</h1>
          <hr className="hr-line" />

          {isValue ? (
            <ul className="ul-container">
              {fetchedData.map(each => (
                <li key={each.id} className="list-container">
                  <img className="image1" src={each.imageUrl} alt={each.name} />
                  <h2 className="heading2">{each.name}</h2>
                  <p className="p1">{each.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="container2" data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Travel

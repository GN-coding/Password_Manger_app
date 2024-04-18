import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PassItem from '../PassItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
const randomIndex = Math.floor(
  Math.random() * initialContainerBackgroundClassNames.length,
)
const randomClassName = initialContainerBackgroundClassNames[randomIndex]

class PasswordManager extends Component {
  state = {
    PassList: [],
    count: 0,
    username: '',
    website: '',
    password: '',
    showPasswords: false,
    searchInput: '',
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  website = event => {
    this.setState({website: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  deleteItem = id => {
    const {PassList} = this.state
    const filterItem = PassList.filter(each => each.id !== id)

    this.setState(prevState => ({
      PassList: filterItem,
      count: prevState.count - 1,
    }))
  }

  filterPass = event => {
    const {value} = event.target
    this.setState({searchInput: value})
  }

  toggleShowPasswords = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  addPassword = event => {
    event.preventDefault()

    const {username, password, website} = this.state

    const newPass = {
      id: uuidv4(),
      website,
      username,
      password,
      backColor: randomClassName,
      logo: username.charAt(0).toUpperCase(),
      isChecked: false,
    }

    this.setState(prevState => ({
      PassList: [...prevState.PassList, newPass],
      username: '',
      password: '',
      website: '',
      count: prevState.count + 1,
    }))
  }

  render() {
    const {
      count,
      password,
      website,
      username,
      PassList,
      showPasswords,
      searchInput,
    } = this.state

    const filteredPassList = PassList.filter(pass =>
      pass.username.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app-logo"
          className="app-logo"
        />
        <div className="form-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="passwordManager"
            className="pass-man"
          />
          <div className="form-card">
            <h5>Add New Password</h5>
            <form className="form-control" onSubmit={this.addPassword}>
              <div className="input-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="details"
                  onChange={this.website}
                  value={website}
                />
              </div>
              <div className="input-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="details"
                  onChange={this.username}
                  value={username}
                />
              </div>
              <div className="input-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="logo"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="details"
                  onChange={this.password}
                  value={password}
                />
              </div>
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
        <div className="password-con">
          <div className="header">
            <p className="pass-count">
              Your PassWords <span className="count">{count}</span>
            </p>
            <div className="input-holder search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="website"
                className="logo"
              />
              <input
                type="text"
                placeholder="Search..."
                className="details"
                onChange={this.filterPass}
              />
            </div>
          </div>
          <hr />
          <div className="check-box">
            <input
              type="checkbox"
              id="checkboxId"
              onChange={this.toggleShowPasswords}
              checked={showPasswords}
            />
            <label htmlFor="checkboxId">Show Passwords</label>
          </div>
          {count === 0 ? (
            <div className="noPass">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="noPassImg"
              />
              <p>No Passwords View</p>
            </div>
          ) : (
            <ul className="un-list">
              {filteredPassList.map(each => (
                <PassItem
                  list={each}
                  key={each.id}
                  onDelete={this.deleteItem}
                  showPassword={showPasswords}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager

import './index.css'

const PassItem = props => {
  const {list, onDelete, showPassword} = props

  const deleteItem = () => {
    onDelete(list.id)
  }
  return (
    <div>
      <li className="list-item">
        <div className="item-con">
          <h1 className={`logo-style ${list.backColor}`}>{list.logo}</h1>
          <div className="user-info">
            <p>{list.website}</p>
            <p>{list.username}</p>
            <p>{showPassword ? list.password : '******'}</p>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
            onClick={deleteItem}
          />
        </div>
      </li>
    </div>
  )
}
export default PassItem

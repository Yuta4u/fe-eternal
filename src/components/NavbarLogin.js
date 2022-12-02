import Search from "../assets/img/Search.png"
import Cart from "../assets/img/Cart.png"
import Logo from "../assets/img/eternal-logo.png"
import Profile from "../assets/img/profile.png"
import "../assets/css/NavbarLogin.css"

function NavbarLogin() {
  return (
    <div className="Navbar">
      <div className="Navbar-Layer1">
        <img className="Navbar-Eternal" src={Logo} />
        <div className="Navbar-Layer2">
          <input className="Navbar-Search" type="image" src={Search} />
          <input className="Navbar-Cart" type="image" src={Cart} />
          <input className="Navbar-Profile" type="image" src={Profile} />
        </div>
      </div>
    </div>
  )
}

export default NavbarLogin

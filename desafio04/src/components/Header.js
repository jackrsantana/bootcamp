import React, { Component } from "react";
import profile from "./../assets/profile.jpg";
import logo from "./../assets/logo.svg";

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <img src={logo} alt="Logo" />
          <div>
            <span>Meu perfil</span>
            {/* <img src={profile} alt="Profile" /> */}
            <i className="material-icons">account_circle</i>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;

import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "reactstrap";

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar className="Navbar">

          <Link to={"/"}>
            <img src={require("../img/naverlogo.png").default} className="logo" alt="네이버 로고" />
          </Link>

          <Nav className="mr-auto">
            <NavItem>
              <NavLink className="item" to={"/"}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="item" to={"/login"}>로그인</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="item" to={"/signIn"}>회원가입</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="item" to={"/cart"}>장바구니</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="item" to={"/history"}>구매 내역</NavLink>
            </NavItem>
          </Nav>

        </Navbar>
      </header>
    );
  }
}

export default Header;

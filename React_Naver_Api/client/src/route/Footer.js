import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <ul className="footer_ul">
          <li className="priv">
            <a href="#n">동수의 로그북 처리방침</a>
          </li>
          <li className="em_bt">
            <a href="#n">이메일주소무단수집거부</a>
          </li>
        </ul>
        <div className="ft_p">
          <img className="footer_Mylogo" src="Mylogo.jpg" alt="동수의 로그북" />
          <span>동수의 로그북  Copyright. </span>
          <span>All Rignts Reserved.</span>
        </div>
      </footer>
    );
  }
}

export default Footer;

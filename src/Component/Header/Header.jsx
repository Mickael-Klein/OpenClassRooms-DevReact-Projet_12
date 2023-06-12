import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";

export default function Header() {
  return (
    <header>
      <div className="header__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="header__nav">
        <Nav />
      </div>
    </header>
  );
}

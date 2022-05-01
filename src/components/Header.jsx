import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  const navigateTo = useNavigate();

  const ctaHandler = () => {
    menuToggleHandler();
    navigateTo("/cta-page");
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    navigateTo("/cta-page");
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header_content}>
        <Link to="/" className={classes.header_content_logo}>
          Navbar
        </Link>

        <nav
          className={`${classes.header_content_nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li>
              <Link to="/page-one" onClick={menuToggleHandler}>
                Page One
              </Link>
            </li>
            <li>
              <Link to="/page-two" onClick={menuToggleHandler}>
                Page Two
              </Link>
            </li>
            <li>
              <Link to="/page-three" onClick={menuToggleHandler}>
                Page Three
              </Link>
            </li>
          </ul>
          <button onClick={ctaHandler}>CTA Page</button>
        </nav>
        <div className={classes.header_content_toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

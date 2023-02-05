import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData, getIsLoggedIn } from "../../store/users";
// import NavProfile from "./navProfile";
function Navbar() {
    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };
    const isLoggedIn = useSelector(getIsLoggedIn());

    const currentUser = useSelector(getCurrentUserData());

    if (isLoggedIn && !currentUser) return "Loading";

    return (
        <header>
            <div className="nav-logo">
                <h3>Carshop Perfomance</h3>
            </div>
            <nav ref={navRef}>
                <div className="test">
                    <Link to="/" onClick={showNavbar}>
                        Главная страница
                    </Link>
                    <Link to="/works" onClick={showNavbar}>
                        Наши работы
                    </Link>
                    <Link to="/parts" onClick={showNavbar}>
                        Магазин
                    </Link>
                    <Link to="/about" onClick={showNavbar}>
                        О нас
                    </Link>
                    <Link to="/busket" onClick={showNavbar}>
                        Корзина
                    </Link>
                    {isLoggedIn ? (
                        // <NavProfile />
                        <div className="nav-profile-icons">
                            <Link
                                to={`/users/${currentUser._id}`}
                                onClick={showNavbar}
                            >
                                {currentUser.name}
                            </Link>
                            <Link to="/logout" onClick={showNavbar}>
                                Выйти
                            </Link>
                        </div>
                    ) : (
                        <Link to="/login" onClick={showNavbar}>
                            Войти
                        </Link>
                    )}

                    {/* <Link to="/login" onClick={showNavbar}>
                    Login
                </Link> */}
                </div>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>

            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;

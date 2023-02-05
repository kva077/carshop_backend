import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
function NavProfile() {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) return "Loading";
    return (
        <div>
            <Link to={`/users/${currentUser._id}`} className="dropdown-item">
                Мой профиль
            </Link>
            <Link to="/logout" className="dropdown-item">
                Выйти
            </Link>
        </div>
    );
}

export default NavProfile;

import React from "react";

const Header = () => {
    return (
        <section className="header">
            <div className="header__logo">
                <h1>MAGNUS</h1>
            </div>
            <div>
                <button className="header__logout-btn btn">Logout</button>
            </div>
        </section>
    );
};

export default Header;

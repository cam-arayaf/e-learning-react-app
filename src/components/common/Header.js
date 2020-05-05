import React, { useContext } from 'react';
import { ELearningContext } from './../../context/ELearningContext';
import logo from './../../assets/img/logo.png';
import shoppingCart from './../../assets/img/shopping-cart.png';

const Header = () => {
    const { selectedCourses, total, openModal, validUrl } = useContext(ELearningContext);
    const { length } = selectedCourses;
    return (
        <header>
            <div className={ validUrl ? 'logo' : 'logo-404' }>
                <a href="/" title="Start">
                    <img src={ logo } alt="logo" />
                    <h1>E-Learning</h1>
                </a>
            </div>
            {
                validUrl &&
                    <div className={ length ? 'cart cart-enable' : 'cart cart-disable' }>
                        <button disabled={ !length } title={ length ? 'Pay' : 'Empty Cart' } onClick={ () => openModal() }>
                            { length !== 0 &&  <strong>+{ length }<br />${ total }</strong> }
                            <img src={ shoppingCart } alt="Shopping Cart" />
                        </button>
                    </div>
            }
        </header>
	);
}

Header.displayName = 'Header';

export default Header;
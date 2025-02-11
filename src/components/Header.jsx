import React, { useState } from 'react'
import "../css/Header.css"
import { RiShoppingBasketLine } from "react-icons/ri";
import { GoSun } from "react-icons/go";
import { IoMoonSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';


function Header() {

    const { products } = useSelector((store) => store.basket)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [theme, setTheme] = useState(true)
    const rootEl = document.getElementById("root")

    const themeChange = () => {
        setTheme(!theme)
        if (theme) {
            rootEl.classList.add("dark")
        } else {
            rootEl.classList.remove("dark")
        }

    }

    return (
        <div className='header-container'>
            <div onClick={() => navigate("/")} className='flex-row logo-btn'>
                <img className='logo' src="../src/images/logo.png" alt="logo" />
                <h2>TREN(D)YOL</h2>
            </div>
            <div className='flex-row' >
                <IoIosSearch className='icon search ' />
                <input type="text" placeholder='Bir şeyler ara...' />

                <div style={{ marginRight: 14 }} >
                    <Badge onClick={() => {
                        dispatch(setDrawer())
                    }} badgeContent={products.length} color="secondary"  >
                        <RiShoppingBasketLine className='icon basket-icon ' />
                    </Badge>
                </div>

                {theme ? <GoSun className='icon' onClick={() => themeChange()} /> : <IoMoonSharp className='icon' onClick={() => themeChange()} />}

            </div>
        </div>
    )
}

export default Header
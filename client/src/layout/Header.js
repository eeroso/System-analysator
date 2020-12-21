import React from 'react'
import '../styles/Header.css';
import { Link } from 'react-router-dom';



export default function Header() {

    return (
        <nav className='nav'>
            <p>systeemianalysaattori</p>
            <ul className='nav-links'>
                <Link className='link-style' to='/systeminfo'>
                    <li>system info</li>
                </Link>
                <Link className='link-style' to='/data'>
                    <li>data</li>
                </Link>
                <Link className='link-style' to='/about'>
                    <li>about</li>
                </Link>
                <Link className='logout' to='/'>
                    <li>logout</li>
                </Link>
            </ul>
        </nav>
    )
}
import classes from './Navbar.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () =>{
const [showNavbar, setShowNabvar] = useState(false)



    return(
        <div className={classes.navbar} style={showNavbar?{width:150}:{width:40}} onMouseMove={()=>{setShowNabvar(true)}} onMouseLeave={()=>{setShowNabvar(false)}}>
            <div className={classes.logo} style={showNavbar?{right:-60}:{right:-90}}> 
                <img src={logo} alt="" />
            </div>
            <ul className={classes.navItems} style={showNavbar?{paddingRight:0}:{paddingRight:100}}>
                <Link to="/" className={classes.navLink} style={showNavbar?{}:{color:"rgba(43, 38, 38, 0)"}} >Pacientes</Link>
            </ul>
        </div>
    )
} 


export default Navbar
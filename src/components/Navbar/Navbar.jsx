import classes from './Navbar.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () =>{

    return(
        <div className={classes.navbar}>
            <div className={classes.logo}> 
                <img src={logo} alt="" />
            </div>
            <ul className={classes.navItems}>
                <Link to="/" className={classes.navLink}>Pacientes</Link>
            </ul>
        </div>
    )
} 


export default Navbar
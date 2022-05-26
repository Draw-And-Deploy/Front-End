import React from 'react'
// import { Link } from 'react-router-dom'
import Logout from '../../assets/img/Exit_Img.svg'
import Profile from '../../assets/img/User_Img.svg'
import Logo from '../../assets/img/cloud_Main.svg'
import '../../assets/css/components/header.css'
import { useNavigate } from 'react-router-dom';
import Pool from '../../UserPool';



export default function Header() {
    const navigate = useNavigate();

    const Navigate = (event) => {
        event.preventDefault();
        navigate('/meus_projetos');
    }
    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            navigate('/');
        }
    }

    return (
        <div>
            <header className="M_P_Header">
                <div className="M_P_Left">
                    <img src={Logo} alt="" />
                </div>
                <div className="M_P_Right">
                    {/* <Link to="/perfil"> */}
                        <img src={Profile} alt="" onClick={Navigate} />
                    {/* </Link>
                    <Link to="/"> */}
                        <img src={Logout} alt="" onClick={logout} />
                    {/* </Link> */}
                </div>
            </header>
        </div>
    );
}
// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Componentes
import Header from '../../components/header/header'
import TextField from '@mui/material/TextField';
//css
import '../../assets/css/pages/criarProjeto.css'
import '../ListagemProjetos/css/lis.css'
//imgs
// import iconVM from '../../assets/img/computer-solid.svg'
// import RGImg from '../../assets/img/resource-group-img.svg'
// // import VM from '../../assets/img/vm-scale-set.svg'
// import iconNet from '../../assets/img/wifi.svg'
// import Net1 from '../../assets/img/image28.svg'
// import Net2 from '../../assets/img/router-xxl.svg'
// import iconScript from '../../assets/img/scriptIcon.svg'
// import securityIcon from '../../assets/img/security-group-img.svg'
// import VM from '../../assets/img/virtual-machine-img.svg'
// import { TextField } from '@mui/material';
import Form_RG from '../../components/Formularios/form_rg';
import Form_VNET from '../../components/Formularios/form_vnet';
import Form_SG from '../../components/Formularios/form_sg';
import Form_VMW from '../../components/Formularios/form_vmw';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function CriarRecurso() {
    const [username, setUsername] = useState('');
    const [project_name, setNomeprojeto] = useState(localStorage.getItem('project_name'));
    const [URL, setURL] = useState({});

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [Form, setForm] = useState(0)



    function VerScript() {
        axios.get("http://35.174.249.35:8000/api/get_script/" + localStorage.getItem("username") + "/" + localStorage.getItem("project_name") + "/", {
            // axios.get("http://localhost:8000/api/get_projects/" + localStorage.getItem("username") + "/", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setURL(resposta.data)
                    console.log(resposta.data)
                    // console.log(listaConsultas)
                }
            }).catch(erro => console.log(erro));
    }








    return (
        <>
            <div className="C_P_container">
                <Header />
                <div className="body">

                    <Modal                         
                        open={open}
                        onClose={handleClose}
                        // aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className='Modal_Box' sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Seu Script
                            </Typography>

                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="Container_Modal_S">
                                    <div className="Script_E">
                                    <div className='ver_script'>
                                            <span > <a href={URL.Link}> {URL.Link}</a> </span>
                                        </div>
                                        <div className='btn_script'>
                                            <button className='M_P_Button' onClick={VerScript}>Ver Script</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </Typography>
                        </Box>


                        {/* Modal cadastrar Credenciais */}
                    </Modal>
                    {/* {
                            passos[passoAtual].id === "passo1" && (
                            <> */}
                    <div className='div_apply'>
                        <div className='link_apply'>
                            <div className='div_apply'>
                                <button className='M_P_Button' onClick={handleOpen}>Ver Script</button>
                            </div>


                        </div>
                    </div>
                    <div>
                        <Form_RG />

                    </div>

                </div>
            </div>
        </>
    );
}
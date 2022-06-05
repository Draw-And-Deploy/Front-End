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

    const [Form , setForm] = useState(0)

   

    


    
    


    

    return (
        <>
            <div className="C_P_container">
                <Header />
                <div className="body">

                {/* <Modal
                    open={Open_Modal_Credenciais}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {
                        (
                            student ?
                                <Box className='Modal_Box' sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Credenciais de Usuario (Conta Azure)
                                    </Typography>

                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <div className='Container_Modal'>
                                            <TextField className="input_field" id="filled-basic" label="Email Azure" variant="filled" />
                                            <TextField type={"password"} className="input_field" id="filled-basic" label="Senha Azure" variant="filled" />
                                            <div className='Conta_E'>
                                                <hr />
                                                <p onClick={Set_Student}>Tem uma conta de estudante ?</p>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="btn-group">
                                            <input onClick={CredenciaisUserAzure} type="submit" className="btn" value="Cadastrar" />
                                        </div>
                                    </Typography>
                                </Box>
                                :

                                <Box className='Modal_Box' sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Credenciais de Usuario (Conta de estudante)
                                    </Typography>

                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <div className='Container_Modal'>
                                            <TextField className="input_field" id="filled-basic" label="Subcripition Id" variant="filled" />
                                            <TextField className="input_field" id="filled-basic" label="Client Id" variant="filled" />
                                            <TextField className="input_field" id="filled-basic" label="Client Secret" variant="filled" />
                                            <TextField className="input_field" id="filled-basic" label="Tenant Id" variant="filled" />
                                            <div className='Conta_E'>
                                                <hr />
                                                <p onClick={Set_Azure}>Tem uma Azure ?</p>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="btn-group">
                                            <input onClick={CredenciaisUser} type="submit" className="btn" value="Cadastrar" />
                                        </div>
                                    </Typography>
                                </Box>
                        )
                    }



                </Modal> */}
                    {/* {
                            passos[passoAtual].id === "passo1" && (
                            <> */}
                    <div>
                        <Form_RG />

                    </div>
                    <div className='div_apply'>
                        <div className='link_apply'>
                            <span > <a href={URL.Link}> {URL.Link}</a> </span>
                        </div>

                        {/* <div className='div_btn_apply'>
                            <input className="btnProxU" type="submit" value="Apply" onClick={Apply} />
                        </div>
                        <div className='div_btn_'>
                            <input className="btnProxUX" type="submit" value="Deletar" onClick={DeletarProjeto} />
                        </div> */}

                    </div>
                </div>
            </div>
        </>
    );
}
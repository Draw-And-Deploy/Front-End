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
import Form_VML from '../../components/Formularios/form_vml';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function CriarRecurso() {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [project_name, setNomeprojeto] = useState(localStorage.getItem("project_name"));
    const [URL, setURL] = useState({});


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [Open_Modal_Credenciais, setOpen_Modal_Credenciais] = React.useState(false);
    const CredenciaishandleOpen = () => setOpen_Modal_Credenciais(true);
    const CredenciaishandleClose = () => setOpen_Modal_Credenciais(false);

    //  CREDENCIAIS DO USUARIO 
    const [subcripitionId, setSubcripitionId] = useState('')
    const [clientId, setClientId] = useState('')
    const [Client_Secret, setClient_Secret] = useState('')
    const [tenantId, setTenantId] = useState('')
    const [Email_Aws, setEmail_Aws] = useState('')
    const [Senha_Aws, setSenha_Aws] = useState('')


    const [student, setStudent] = useState(true)
   

    useEffect(() => {
        CredenciaishandleOpen();
    }, [])


    function CredenciaisUserAzure(evento) {

        evento.preventDefault();
        CredenciaishandleClose();
        // axios.post("http://35.174.249.35:8000/api/account_credentials/", {
        axios.post("http://localhost:8000/api/account_credentials/", {

            useracc: {
                user_email: Email_Aws,
                user_password: Senha_Aws
                // subscription_id: subcripitionId,
                // client_id: clientId,
                // client_secret: Client_Secret,
                // tenant_id: tenantId
            },
            project: {
                username: username,
                project_name: project_name
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Credenciais cadastradas');
                    setUsername('');
                    setNomeprojeto('');
                    // setNomeRede('');
                    // setNomeGR('');
                    // setUsername('');
                    // setNomeprojeto('');
                    // setBlocoIP('');
                }
            }).catch(erro => console.log(erro))
    }


    function CredenciaisUser(evento) {

        evento.preventDefault();
        CredenciaishandleClose();
        // axios.post("http://35.174.249.35:8000/api/account_credentials/", {
        axios.post("http://localhost:8000/api/account_credentials/", {

            useracc: {
                // user_email: Email_Aws,
                // user_password: Senha_Aws,
                subscription_id: subcripitionId,
                client_id: clientId,
                client_secret: Client_Secret,
                tenant_id: tenantId
            },
            project: {
                username: username,
                project_name: project_name 
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Cre_DAS_TRA_DO');
                    setUsername('');
                    setNomeprojeto('');
                    // setNomeRede('');
                    // setNomeGR('');
                    // setUsername('');
                    // setNomeprojeto('');
                    // setBlocoIP('');
                }
            }).catch(erro => console.log(erro))
    }

    const Set_Student = () => {
        setStudent(false)
    }
    const Set_Azure = () => {
        setStudent(true)
    }



    function Apply(evento) {
        evento.preventDefault();
        // axios.post("http://35.174.249.35:8000/api/apply/", {
            axios.post("http://localhost:8000/api/apply/", {
            username: username,
            project_name: project_name
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    toast.success(URL)
                    setURL(resposta.data)
                    console.log('apply feita com sucesso');
                    setUsername('');
                    setNomeprojeto('');
                    setOpen_Modal_Credenciais(true);

                }
            }).catch(erro => console.log(erro))
    }
    function DeletarProjeto(evento) {
        evento.preventDefault();
        // axios.delete("http://35.174.249.35:8000/api/destroy/" + localStorage.getItem("username") + "/" + project_name + "/",
        axios.delete("http://localhost:8000/api/destroy/" + username + "/" + project_name + "/",
            // {
            //     username: username,
            //     project_name: project_name   
            // }, 
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {

                    console.log('projeto deletado');
                    setUsername('');
                    setNomeprojeto('');
                }
            }).catch(erro => console.log(erro))
    }


    return (
        <>
            <div className="C_P_container">
                <Header />
                <div className="body">

                <Modal
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



                </Modal>
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

                        <div className='div_btn_apply'>
                            <input className="btnProxU" type="submit" value="Apply" onClick={Apply} />
                        </div>
                        <div className='div_btn_'>
                            <input className="btnProxUX" type="submit" value="Deletar" onClick={DeletarProjeto} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast } from 'react-toastify';













export default function ModalApply() {




    const [student, setStudent] = useState(false);



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
    const [URL, setURL] = useState({})

    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
    };


    function Apply(evento) {
        evento.preventDefault();
        // axios.post("http://35.174.249.35:8000/api/apply/", {
        axios.post("http://35.174.249.35:8000/api/apply/", {
            username: localStorage.getItem("username"),
            project_name: localStorage.getItem('project_name')
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
                }
            }).catch(erro => console.log(erro))
    }






    function CredenciaisUserAzure(evento) {

        evento.preventDefault();
        CredenciaishandleClose();
        // axios.post("http://35.174.249.35:8000/api/account_credentials/", {
        axios.post("http://35.174.249.35:8000/api/account_credentials/", {

            useracc: {
                user_email: Email_Aws,
                user_password: Senha_Aws
            },
            project: {
                username: localStorage.getItem("username"),
                project_name: localStorage.getItem("project_name")
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Credenciais cadastradas');

                }
            }).catch(erro => console.log(erro))
    }


    function CredenciaisUser(evento) {

        evento.preventDefault();
        // axios.post("http://35.174.249.35:8000/api/account_credentials/", {
        axios.post("http://35.174.249.35:8000/api/account_credentials/", {

            useracc: {
                // user_email: Email_Aws,
                // user_password: Senha_Aws,
                subscription_id: subcripitionId,
                client_id: clientId,
                client_secret: Client_Secret,
                tenant_id: tenantId
            },
            project: {
                username: localStorage.getItem("username"),
                project_name: localStorage.getItem('project_name')
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Credenciais cadastradas');
                    CredenciaishandleClose();
                }
            }).catch(erro => console.log(erro))
    }



    const SetStudent = () => {
        setStudent(true);
    }
    const SetAzure = () => {
        setStudent(false);
    }






    return (
        
        <>
        <div>yfyhutuytyutuytu</div>
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
                                        <TextField className="input_field" id="filled-basic" label="Email Azure" variant="filled" value={Email_Aws} onChange={(e) => setEmail_Aws(e.target.value)} />
                                        <TextField type={"password"} className="input_field" id="filled-basic" label="Senha Azure" variant="filled" value={Senha_Aws} onChange={(e) => setSenha_Aws(e.target.value)} />
                                        <div className='Conta_E'>
                                            <hr />
                                            <p onClick={SetStudent}>Tem uma conta de estudante ?</p>
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
                                        <TextField className="input_field" id="filled-basic" label="Subcripition Id" variant="filled" value={subcripitionId} onChange={(e) => setSubcripitionId(e.target.value)} />
                                        <TextField className="input_field" id="filled-basic" label="Client Id" variant="filled" value={clientId} onChange={(e) => setClientId(e.target.value)} />
                                        <TextField className="input_field" id="filled-basic" label="Client Secret" variant="filled" value={Client_Secret} onChange={(e) => setClient_Secret(e.target.value)} />
                                        <TextField className="input_field" id="filled-basic" label="Tenant Id" variant="filled" value={tenantId} onChange={(e) => setTenantId(e.target.value)} />
                                        <div className='Conta_E'>
                                            <hr />
                                            <p onClick={SetAzure}>Tem uma Azure ?</p>
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

        </>
    );
}


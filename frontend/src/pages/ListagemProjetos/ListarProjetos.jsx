import * as React from 'react';
import '../ListagemProjetos/css/lis.css'
import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Header from '../../components/header/header.jsx';
import { useNavigate } from "react-router-dom"
import File_Img from "../../assets/img/file-solid_1.svg"
import jwtDecode from 'jwt-decode';



const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function TelaProjetos() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [Open_Modal_Credenciais, setOpen_Modal_Credenciais] = React.useState(false);
    const CredenciaishandleOpen = () => setOpen_Modal_Credenciais(true);
    const CredenciaishandleClose = () => setOpen_Modal_Credenciais(false);


    const [ListaProjetos, setListaProjetos] = useState([""])
    const [Excluir, setExcluir] = useState('')
    const [username, setUsername] = useState('Carlos');
    const [project_name, setNomeprojeto] = useState('');


    const [student, setStudent] = useState(true)




    //  CREDENCIAIS DO USUARIO 
    const [subcripitionId, setSubcripitionId] = useState('')
    const [clientId, setClientId] = useState('')
    const [Client_Secret, setClient_Secret] = useState('')
    const [tenantId, setTenantId] = useState('')
    const [Email_Aws, setEmail_Aws] = useState('')
    const [Senha_Aws, setSenha_Aws] = useState('')
    // const [UserName, setUserName] = useState('')
    // const [ProjeteName, setProjeteName] = useState('')
    const navigate = useNavigate();
    const NavegateCreate = useNavigate();
    const JWT_Decode= useState();


    useEffect(() => {
        CredenciaishandleOpen();
    }, [])


    function CredenciaisUser(evento) {

        evento.preventDefault();
        CredenciaishandleClose();
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


    // ///////////////////////////////////////////////////////////////////////////////////////
    function buscarMeusProjetos() {
        axios.get("http://35.174.249.35:8000/api/get_projects/" + localStorage.getItem("username"), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaProjetos(resposta.data);
                    console.log(resposta.data)
                    // console.log(listaConsultas)
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarMeusProjetos, [], "");

    function cadastrarProjetos(evento) {
        handleClose()
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/create_project/", {
            username: localStorage.getItem("username"),
            project_name: project_name
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log("projeto cadastrado");
                    setUsername([]);
                    setNomeprojeto([]);
                    // navigate('/criar_recursos', { state: { message: 'Projeto criado com sucesso!' } })
                }
            }).catch(erro => console.log(erro))
    }

    function DeletarProjeto(evento) {
        evento.preventDefault();
        axios.delete("http://35.174.249.35:8000/api/delete_project/" + localStorage.getItem("username") + "/" + project_name + "/",
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

    const Navigate = (event) => {
        event.preventDefault();
        navigate('/criar_recursos')

    }
    const Set_Student = () => {
        setStudent(false)
    }
    const Set_Azure = () => {
        setStudent(true)
    }

    return (
        <>
            <div className="M.conteiner"></div>
            <Header />
            <div className="M_P_conteiner">
                <button className="M_P_Button" value="sdas" onClick={handleOpen} >Criar Novo Projeto</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className='Modal_Box' sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Cadastrar Projeto
                        </Typography>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className="Container_Modal">
                                <TextField className="input_field" id="filled-basic" label="User Name" value={username} onChange={(evt) => setUsername(evt.target.value)}></TextField>
                                <TextField className="input_field" id="filled-basic" label="Nome do Projeto" value={project_name} onChange={(evt) => setNomeprojeto(evt.target.value)}></TextField>
                                <div className="Conta_E">
                                    <div className="btn-group">
                                        <input onClick={cadastrarProjetos} type="submit" className="btn" value="Cadastrar" />
                                    </div>
                                </div>
                            </div>
                        </Typography>
                    </Box>


                    {/* Modal cadastrar Credenciais */}
                </Modal>
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
                                            <TextField className="input_field" id="filled-basic" label="Senha Azure" variant="filled" />
                                            <div className='Conta_E'>
                                                <hr />
                                                <p onClick={Set_Student}>Tem uma conta de estudante ?</p>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="btn-group">
                                            <input onClick={CredenciaisUser} type="submit" className="btn" value="Cadastrar" />
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
                <div className="Meus_proje_Area">
                    {/* <img src="" alt="" /> */}
                    <div className="conteiner">
                        <h1>Meus Projetos</h1>
                        {
                            ListaProjetos.map((project_name) => {
                                return (
                                    <div className="conteiner_Projeto">
                                        <div className="Left">
                                            <img src={File_Img} alt="" />
                                            <p>{project_name}</p>
                                        </div>
                                        <div className="Right">
                                            <button className='Btn_Editar' onClick={Navigate}>Editar</button>
                                            <button className="Btn_Vermelho" onClick={DeletarProjeto}>Excluir</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default TelaProjetos;
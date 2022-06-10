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
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 



const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function TelaProjetos() {
    const [ListaProjetos, setListaProjetos] = useState([""])
    const [Excluir, setExcluir] = useState('')
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [project_name, setNomeprojeto] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [Open_Modal_Credenciais, setOpen_Modal_Credenciais] = React.useState(false);
    const CredenciaishandleOpen = () => setOpen_Modal_Credenciais(true);
    const CredenciaishandleClose = () => setOpen_Modal_Credenciais(false);
  


    // const [UserName, setUserName] = useState('')
    // const [ProjeteName, setProjeteName] = useState('')
    const navigate = useNavigate();
    // const NavegateCreate = useNavigate();
    const JWT_Decode= useState();

    
   
   

    
    

    // ///////////////////////////////////////////////////////////////////////////////////////
    function buscarMeusProjetos() {
        axios.get("https://api.drawanddeploy.com:8000/api/get_projects/" + localStorage.getItem("username") + "/", {
        // axios.get("http://localhost:8000/api/get_projects/" + localStorage.getItem("username") + "/", {
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
        // axios.post("http://localhost:8000/api/create_project/", {
        axios.post("https://api.drawanddeploy.com:8000/api/create_project/", {
            username: username,
            project_name: project_name 
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    toast.success("Projeto cadastrado com sucesso!")
                    console.log("projeto cadastrado");
                    setUsername([]);
                    setNomeprojeto('');
                    window.location.reload();
                    // navigate('/criar_recursos', { state: { message: 'Projeto criado com sucesso!' } })
                }
            }).catch(erro => console.log(erro))
    }

    function DeletarProjeto(evento) {
        evento.preventDefault();
        // axios.delete("http://localhost:8000/api/delete_project/"  + localStorage.getItem("username") + "/" + project_name,{
        axios.delete("https://api.drawanddeploy.com:8000/api/delete_project/" + localStorage.getItem("username") + "/" + localStorage.getItem('project_name')+ "/",{
            // {
            //     username: username,
            //     project_name: project_name   
            // }, 
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    toast.success("Projeto deletado!")
                    console.log('projeto deletado');
                    window.location.reload();
                }
            }).catch(erro => console.log(erro))
    }

    function EditarProjeto(evento) {
        evento.preventDefault();
        axios.put("https://api.drawanddeploy.com:8000/api/edit_existing_project/" ,
            {
                username: username,
                project_name: localStorage.getItem('project_name')  
            }, 
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    // localStorage.setItem('project_name', project_name );
                    console.log('Editando Projeto');
                    navigate("/criar_recursos")
                    window.location.reload();
                }
            }).catch(erro => console.log(erro))

    }


    // const Navigate = (event) => {
    //     event.preventDefault();
        

    // }
   

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
                                {/* <TextField className="input_field" id="filled-basic" label="User Name" value={username} onChange={(evt) => setUsername(evt.target.value)}></TextField> */}
                                <TextField  className="input_field" id="filled-basic" label="Nome do Projeto" value={project_name} onChange={(evt) => setNomeprojeto(evt.target.value)}></TextField>
                                <div className="Conta_E">
                                    <div className="btn-group">
                                        <input onClick={cadastrarProjetos} type="submit" className="btn" value="Cadastrar" />
                                    </div>
                                    <ToastContainer/>
                                </div>
                            </div>
                        </Typography>
                    </Box>


                    {/* Modal cadastrar Credenciais */}
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
                                        <button className='Btn_Editar' value={project_name}  onClick={(event)=>{
                                                setNomeprojeto((p) => p == project_name )
                                                localStorage.setItem('project_name', project_name );
                                                console.log(project_name)
                                                EditarProjeto(event)
                                            }}>Editar</button>
                                            <button className="Btn_Vermelho" value={project_name} onClick={(event)=>{
                                                setNomeprojeto((p) => p == project_name )
                                                localStorage.setItem('project_name', project_name );
                                                console.log(project_name)
                                                DeletarProjeto(event)

                                            }}>Excluir</button>
                                            <ToastContainer/>
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

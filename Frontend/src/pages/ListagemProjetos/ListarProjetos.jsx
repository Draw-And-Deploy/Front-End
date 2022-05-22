import '../ListagemProjetos/css/lis.css'
import { useState, useEffect } from "react"
import '../../UserPool'
import axios from "axios";
import Header from '../../components/header/header';
import File_icon from '../../assets/img/File_Img.svg'
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
Modal.setAppElement("#root");


function TelaProjetos() {
    const [ListaProjetos, setListaProjetos] = useState([""])
    const [Excluir, setExcluir] = useState('')
    const [username, setUsername] = useState('Carlos');
    const [project_name, setNomeprojeto] = useState('sas');




    //  CREDENCIAIS DO USUARIO 
    const [subcripitionId, setSubcripitionId] = useState('')
    const [clientId, setClientId] = useState('')
    const [Client_Secret, setClient_Secret] = useState('')
    const [tenantId, setTenantId] = useState('')
    const [Email_Aws, setEmail_Aws] = useState('')
    const [Senha_Aws, setSenha_Aws] = useState('')
    const [UserName, setUserName] = useState('Carlos')
    const [ProjeteName, setProjeteName] = useState('teste2')
    const navigate = useNavigate();
    const NavegateCreate = useNavigate();




    function CredenciaisUser(evento) {
        evento.preventDefault();
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
                username: UserName,
                project_name: ProjeteName
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log('Cre_DAS_TRA_DO');
                    setUserName('');
                    setProjeteName('');
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
        axios.get("http://35.174.249.35:8000/api/get_projects/" + username, {
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
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/create_project/", {
            username: username,
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
                    navigate('/criar_recursos', { state: {message: 'Projeto criado com sucesso!'} })
                }
            }).catch(erro => console.log(erro))
    }

    function DeletarProjeto(evento) {
        evento.preventDefault();
        axios.delete("http://35.174.249.35:8000/api/delete_project/"+ username + "/" + project_name + "/",
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

    return (
        <>
            <div className="M.conteiner"></div>
            <Header />
            <div className="M_P_conteiner">
                <input type="text" placeholder="subcripitionId" value={subcripitionId} onChange={(evt) => setSubcripitionId(evt.target.value)} />
                <input type="text" placeholder="clientId" value={clientId} onChange={(evt) => setClientId(evt.target.value)} />
                <input type="text" placeholder="Client_Secret" value={Client_Secret} onChange={(evt) => setClient_Secret(evt.target.value)} />
                <input type="text" placeholder="tenantId" value={tenantId} onChange={(evt) => setTenantId(evt.target.value)} />

                <button type='submit' onClick={CredenciaisUser}>Entrar</button>
                <button className="M_P_Button" value="sdas" type='submit'  onClick={cadastrarProjetos}>Criar Novo Projeto</button>
                <input type="text" placeholder="Username" value={username} onChange={(evt) => setUsername(evt.target.value)} />
                <input type="text" placeholder="Nome do Projeto" value={project_name} onChange={(evt) => setNomeprojeto(evt.target.value)} />

                {/* <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    overlayClassName="modal-overlay"
                    className="modal-content"
                >
                    <h2>Cadastro de Projeto</h2>
                    <input></input>
                    <input></input>
                    <button>Cadastrar</button>
                    <button onClick={closeModal}>Close</button>
                </Modal> */}
                <div className="Meus_proje_Area">
                    {/* <img src="" alt="" /> */}
                    <div className="conteiner">
                        <h1>Meus Projetos</h1>
                        {
                            ListaProjetos.map((project_name) => {
                                return (
                                    <div className="conteiner_Projeto">
                                        <div className="Left">
                                            <img src={File_icon} alt="" />
                                            <p>{project_name}</p>
                                        </div>
                                        <div className="Right">
                                            <button onClick={Navigate}>Editar</button>
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
// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Componentes
import Header from '../../components/header/header'
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
    const [username, setUsername] = useState('Carlos');
    const [project_name, setNomeprojeto] = useState(localStorage.getItem('project_name'));
    const [URL, setURL] = useState({});






    function Apply(evento) {
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/apply/", {
            // axios.post("http://localhost:8000/api/apply/", {
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
                    setUsername('');
                    setNomeprojeto('');
                }
            }).catch(erro => console.log(erro))
    }
    function DeletarProjeto(evento) {
        evento.preventDefault();
        // axios.delete("http://35.174.249.35:8000/api/destroy/" + localStorage.getItem("username") + "/" + project_name + "/",
        axios.delete("http://35.174.249.35:8000/api/destroy/" + localStorage.getItem("username") + "/" + localStorage.getItem('project_name', project_name) + "/",
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
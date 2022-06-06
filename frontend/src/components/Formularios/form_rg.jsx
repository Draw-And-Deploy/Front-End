import '../../assets/css/pages/criarProjeto.css'
import React, { useState } from 'react';
import axios from 'axios';
import RGImg from '../../assets/img/resource-group-img.svg'
import '../../assets/css/components/forms.css'
import Banner_form from '../../assets/img/banner_form.svg'
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Form_VNET from './form_vnet';


export default function Form_RG() {
    const [nomeGR, setNomeGR] = useState('');
    const [regiao, setRegiao] = useState('East US');
    

    const [Form, setForm] = useState(0)

    const FormDisplay = () => {
        if (Form == 1) {
            return <Form_VNET />
        }
    }

    //RESOURCE GROUP
    function cadastrarRGroup(evento) {
        evento.preventDefault();
        // 35.174.249.35:8000
        axios.post("http://35.174.249.35:8000/api/resource_group/", {
            rg: {
                name: nomeGR,
                location: regiao
            },
            project: {
                // localStorage.getItem("username")
                username: localStorage.getItem("username"),
                project_name: localStorage.getItem("project_name")
            }

        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('username')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    // return({ message: 'Projeto criado com sucesso!' });
                    toast.success("Grupo de Recurso cadastrado com sucesso!")
                    console.log('rg cadastrado');
                    localStorage.setItem('NomeRG',nomeGR)
                    setForm((form) => form + 1)
                }
            }).catch(erro => console.log(erro),)
    }



    return (
        <>
            {
                (
                    Form == 1
                        ?
                            FormDisplay()
                        :
                        <div className='Stage_form_RG'>

                            <div className='left_stage'>
                                <img src={Banner_form} />
                            </div>
                            <div className='right_stage'>
                                <div className="imgProjeto">
                                    <img src={RGImg} />
                                </div>
                                <div className="titulo">
                                    {/* <div className="linha" /> */}
                                    <h6>Grupo de Recursos</h6>
                                    {/* <div className="linha" /> */}
                                </div>
                                <form method='post' onSubmit={cadastrarRGroup}>
                                    <label className="label" for="nomeGR"></label>
                                    <TextField id="nomeGR" className="input_field" label='Grupo de Recurso' type="text" placeholder="Nome do Grupo de Recursos" value={nomeGR} onChange={(event) => setNomeGR(event.target.value)} autoFocus required />
                                    <label className="label" for="regiao"></label>
                                    <TextField id="regiao" className="input_field" label='Região' list="region" placeholder="Escolha uma Região" value={regiao} onChange={(event) => setRegiao(event.target.value)} />
                                    <datalist id="regions">
                                        <option value={nomeGR} />
                                    </datalist>
                                    <input className="btnProxU" type="submit" value="Cadastrar" onClick={cadastrarRGroup} />
                                    <ToastContainer />
                                </form>

                            </div>
                        </div>
                )
            }

        </>
    );
}
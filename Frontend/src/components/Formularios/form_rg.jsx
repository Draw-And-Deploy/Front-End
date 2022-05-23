import '../../assets/css/pages/criarProjeto.css'
import React, { useState } from 'react';
import axios from 'axios';
import RGImg from '../../assets/img/resource-group-img.svg'
import '../../assets/css/components/forms.css'
import Banner_form from '../../assets/img/banner_form.svg'
import { TextField } from '@mui/material';

export default function Form_RG() {
    const [nomeGR, setNomeGR] = useState('');
    const [regiao, setRegiao] = useState('East US');
    const [username, setUsername] = useState('Carlos');
    const [project_name, setNomeprojeto] = useState('teste');


    //RESOURCE GRUP
    function cadastrarRGroup(evento) {
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/resource_group/", {
            rg: {
                name: nomeGR,
                location: regiao
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
                    // return({ message: 'Projeto criado com sucesso!' });
                    console.log('rg cadastrado');
                    setNomeGR(nomeGR);
                    setRegiao(regiao);
                    setUsername('');
                    setNomeprojeto('');
                }
            }).catch(erro => console.log(erro))
    }



    return (
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
                </form>

            </div>
        </div>
    );
}
import '../../assets/css/pages/criarProjeto.css'
import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/css/components/forms.css'
import { TextField } from '@mui/material';
import Net1 from '../../assets/img/image28.svg'
import { MenuItem } from '@mui/material';
import Banner_form from '../../assets/img/banner_form.svg'


const blocosIp = [
    {
        value: 'USD',
        label: '192.168.0.0/16',
    },
    {
        value: 'EUR',
        label: '172.16.0.0/16',
    },
    {
        value: 'BTC',
        label: '0.0.0.0/8',
    },
];

const blocosIpsub = [
    {
        value: 'USD',
        label: '192.168.0.0/24',
    },
    {
        value: 'EUR',
        label: '172.16.0.0/24',
    },
    {
        value: 'BTC',
        label: '0.0.0.0/24',
    },
];


export default function Form_VNET() {
    const [nomeGR, setNomeGR] = useState('');
    const [username, setUsername] = useState('Carlos');
    const [project_name, setNomeprojeto] = useState('teste');
    const [nomeRede, setNomeRede] = useState('');
    const [blocoIP, setBlocoIP] = useState('');
    const [nomeSubRede, setNomeSubRede] = useState('');
    const [blocoIPSubrede, setBlocoIPSubrede] = useState('');

    //VIRTUAL NETWORK
    function cadastrarVnet(evento) {
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/virtual_network/", {

            vnet: {
                name: nomeRede,
                rg: nomeGR,
                cidr_block: blocoIP,
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
                    console.log('vnet cadastrada');
                    setNomeRede(nomeRede);
                    setNomeGR(nomeGR);
                    setUsername('');
                    setNomeprojeto('');
                    setBlocoIP('');
                }
            }).catch(erro => console.log(erro))
    }
    //SUBNET
    function cadastrarSubrede(evento) {
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/subnet/", {

            subnet: {
                name: nomeSubRede,
                vnet: nomeRede,
                cidrblock: blocoIPSubrede,
                resource_group: nomeGR
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
                    console.log("SUBNET cadastrada");
                    setNomeGR(nomeGR);
                    setNomeRede(nomeRede);
                    setNomeSubRede(nomeSubRede);
                    setUsername('');
                    setNomeprojeto('');
                    setBlocoIPSubrede('');
                }
            }).catch(erro => console.log(erro))
    }



    return (
        <div className='Stage_form_VNET'>

            <div className='left_stage'>
                <img src={Banner_form} />
            </div>
            <div className='right_stage'>
                <div className="imgProjeto">
                    <img src={Net1} />
                </div>
                <div>
                    <div className="titulo">
                        <h6>Redes Virtuais</h6>
                    </div>
                    <form method='post'>
                        <label className="label" for="selecionaGR">Grupo de Recurso <strong>*</strong></label>
                        <TextField id="selecionaGR" className="input inputText" list="listaGR" placeholder="Nome do Grupo de Recursos"
                            // placeholder={{ nomeGR } ? { nomeGR } : "Selecionar GR"} 
                            value={nomeGR} onChange={(event) => setNomeGR(event.target.value)} />
                        <datalist id="listaGR">
                            <option value={nomeGR} />
                        </datalist>

                        <label className="label" for="nomeRede">Nome da Rede Virtual <strong>*</strong></label>
                        <TextField id="nomeRede" className="input inputText" type="text" placeholder="Insira o nome da Rede" value={nomeRede} onChange={(event) => setNomeRede(event.target.value)} />
                        <label className="label" for="blocoIP">Bloco de IPs <strong>*</strong></label>
                        <TextField
                            id="blocoIP"
                            select
                            className="input inputText"
                            // list="blocosIp"
                            type="text"
                            placeholder="000.000.000.000/00"
                            value={blocoIP} onChange={(event) => setBlocoIP(event.target.value)}>
                            {blocosIp.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <input className="btnProxU" type="submit" value="Cadastrar" onClick={cadastrarVnet} />

                        <div className="titulo" style={{ marginTop: 32 }}>
                            <div className="linha" />
                            <h6>Subrede</h6>
                            <div className="linha" />
                        </div>
                        <label className="label" for="nomeSubRede">Nome da Subrede</label>
                        <TextField id="nomeSubRede" className="input inputText" type="text" placeholder="Insira o nome da Subede" value={nomeSubRede} onChange={(event) => setNomeSubRede(event.target.value)} />
                        <label className="label" for="selecionaRede">Anexar à Rede Virtual </label>
                        <TextField id="selecionaRede" className="input inputText" type="text" placeholder="Insira o nome da Rede" value={nomeRede} onChange={(event) => setNomeRede(event.target.value)} />
                        <label className="label" for="blocoIPSubrede">Bloco de IPs da Subrede</label>
                        <TextField
                            id="blocoIPSubrede"
                            select
                            className="input inputText"
                            type="text"
                            laceholder="000.000.000.000/00"
                            value={blocoIPSubrede} onChange={(event) => setBlocoIPSubrede(event.target.value)}>
                            {blocosIpsub.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <input className="btnProxU" type="submit" value="Cadastrar" onClick={cadastrarSubrede} />
                    </form>
                </div>
            </div>
        </div>
    );
} 
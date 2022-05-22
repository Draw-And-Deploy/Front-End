import axios from 'axios';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import '../../assets/css/pages/criarProjeto.css'
import '../../assets/css/components/forms.css'
import securityIcon from '../../assets/img/security-group-img.svg'
import Logo from '../../assets/img/cloud_Main.svg'
import Banner_form from '../../assets/img/banner_form.svg'




const portas = [
    {
        value: 'USD',
        label: '22',
    },
    {
        value: 'EUR',
        label: '80',
    },
    {
        value: 'BTC',
        label: '3309',
    },
    {
        value: 'BTC',
        label: '443',
    },
];
const prioridades = [
    {
        value: 'USD',
        label: '100',
    },
    {
        value: 'EUR',
        label: '110',
    },
    {
        value: 'BTC',
        label: '120',
    },
];

const protocolos = [
    {
        value: 'USD',
        label: 'TCP',
    },
    {
        value: 'EUR',
        label: 'UDP',
    },
];



export default function Form_SG() {
    const [nomeGR, setNomeGR] = useState('');
    const [username, setUsername] = useState('Carlos');
    const [project_name, setNomeprojeto] = useState('teste');
    const [nomeSeguranca, setNomeSeguranca] = useState('');
    const [trafegoOrigem, setTrafegoOrigem] = useState('0.0.0.0/0');
    const [protocolo, setProtocolo] = useState('');
    const [porta, setPorta] = useState('');
    const [prioridade, setPrioridade] = useState('');




    function cadastrarGrupoSeguranca(evento) {
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/security_group/", {

            sg: {
                name: nomeSeguranca,
                rg: nomeGR,
                // rule_name: "PermitInboundWEBandSSH",
                rule_priority_list: prioridade,
                rule_dest_port_range_list: porta,
                // rule_direction: "Inbound",
                // rule_access: "Allow",
                rule_protocol: protocolo,
                // rule_source_port_range: "*",
                rule_source_address_prefix: trafegoOrigem,
                // rule_dest_address_prefix: "*"
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
                    console.log('security group cadastrado');
                    setNomeSeguranca(nomeSeguranca);
                    setNomeGR(nomeGR);
                    setPrioridade('');
                    setPorta('');
                    setProtocolo('');
                    setTrafegoOrigem('');
                    setUsername('');
                    setNomeprojeto('');



                }
            }).catch(erro => console.log(erro))
    }

    // {blocosIp.map((option) => (
    //     <MenuItem key={option.value} value={option.value}>
    //         {option.label}
    //     </MenuItem>
    // ))}
    return (
        <div className='Stage_form_SG'>

            <div className='left_stage'>
                <img src={Banner_form} />
            </div>
            <div className='right_stage'>
                <div className="imgProjeto">
                    <img src={securityIcon} />
                </div>
                <div>
                    <div className="titulo">
                        <h6>Grupo de Segurança</h6>
                    </div>
                    <form method='post'>
                        <label className="label" for="selecionaGR_GS">Grupo de Recurso <strong>*</strong></label>
                        <TextField id="selecionaGR_GS" className="input inputText" list="listaGR" placeholder="Nome do Grupo de Recursos" value={nomeGR} onChange={(event) => setNomeGR(event.target.value)} />
                        <label className="label" for="grupoSeguranca">Nome do Grupo de Segurança <strong>*</strong></label>
                        <TextField id="grupoSeguranca" className="input inputText" placeholder="Insira o nome do GS" value={nomeSeguranca} onChange={(event) => setNomeSeguranca(event.target.value)} />
                        <div className='form_dividido'>
                            <div className='protocolo'>
                                <label className="label" for="protocolo">Protocolo <strong>*</strong></label>
                                <TextField
                                    id="protocolo"
                                    select
                                    className="input inputText"
                                    style={{ width: 135 }}
                                    type="text"
                                    placeholder="Protocolo"
                                    value={protocolo} onChange={(event) => setProtocolo(event.target.value)}>
                                    {protocolos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='porta'>
                                <label className="label" for="porta">Porta <strong>*</strong></label>
                                <TextField
                                    id="porta"
                                    select
                                    className="input_field"
                                    style={{ width: 135 }}
                                    type="text" list="portasList"
                                    placeholder="Insira a Porta"
                                    value={porta} onChange={(event) => setPorta(event.target.value)}>
                                    {portas.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </div>
                        </div>
                        <label className="label" for="prioridade">Prioridade<strong>*</strong></label>
                        <TextField
                            id="prioridade"
                            select
                            className="input_field"
                            type="text"
                            placeholder="Informe a Prioridade"
                            value={prioridade} onChange={(event) => setPrioridade(event.target.value)}>
                            {prioridades.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <label className="label" for="blocoIPSeguranca">Origem do Tráfego <strong>*</strong></label>
                        <TextField
                            id="blocoIPSeguranca"
                            className="input inputText"
                            type="text"
                            placeholder="000.000.000.000/00"
                            value={trafegoOrigem} onChange={(event) => setTrafegoOrigem(event.target.value)} />
                        {/* <input className="btnVoltar" type="submit" value="Voltar" /> */}
                        <input className="btnProxU" type="submit" value="Cadastrar" onClick={cadastrarGrupoSeguranca} />
                    </form>
                </div>

            </div>
        </div>
    );
} 
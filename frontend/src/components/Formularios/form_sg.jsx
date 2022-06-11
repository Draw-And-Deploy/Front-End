import axios from 'axios';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import '../../assets/css/pages/criarProjeto.css'
import '../../assets/css/components/forms.css'
import securityIcon from '../../assets/img/security-group-img.svg'
import Logo from '../../assets/img/cloud_Main.svg'
import Banner_form from '../../assets/img/banner_form.svg'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Form_VMW from './form_vmw';


const portas = [
    {
        value: '22',
        label: '22',
    },
    {
        value: '80',
        label: '80',
    },
    {
        value: '3309',
        label: '3309',
    },
    {
        value: '443',
        label: '443',
    },
];
const prioridades = [
    {
        value: '100',
        label: '100',
    },
    {
        value: '110',
        label: '110',
    },
    {
        value: '120',
        label: '120',
    },
];

const protocolos = [
    {
        value: 'TCP',
        label: 'TCP',
    },
    {
        value: 'UDP',
        label: 'UDP',
    },
];



export default function Form_SG() {
    const [nomeGR, setNomeGR] = useState(localStorage.getItem('NomeRG'));
    const [username, setUsername] = useState('');
    const [project_name, setNomeprojeto] = useState('');
    const [nomeSeguranca, setNomeSeguranca] = useState('');
    const [trafegoOrigem, setTrafegoOrigem] = useState('0.0.0.0/0');
    const [protocolo, setProtocolo] = useState('');
    const [porta, setPorta] = useState('');
    const [prioridade, setPrioridade] = useState('');

    const [Form, setForm] = useState(0)

    const FormDisplay = () => {
        if (Form == 1) {
            return <Form_VMW/>
        }
    }


    function cadastrarGrupoSeguranca(evento) {
        evento.preventDefault();
        axios.post("https://api.drawanddeploy.com:8000/api/security_group/", {

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
                    toast.success("Grupo de Segurança cadastrado com sucesso!")
                    console.log('security group cadastrado');
                    setForm((form) => form + 1)
                    localStorage.setItem('Grupo_de_segurança' , nomeSeguranca)
                }
            }).catch(erro => console.log(erro))
    }

    // {blocosIp.map((option) => (
    //     <MenuItem key={option.value} value={option.value}>
    //         {option.label}
    //     </MenuItem>
    // ))}
    return (
        <>
            {
                (
                    Form == 1
                        ?
                        FormDisplay()
                        :
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
                                        <label className="label" for="selecionaGR_GS"></label>
                                        <TextField id="selecionaGR_GS" className="input inputText" label='Grupo de Recurso' list="listaGR" placeholder="Nome do Grupo de Recursos" value={nomeGR} onChange={(event) => setNomeGR(event.target.value)} />
                                        <label className="label" for="grupoSeguranca"></label>
                                        <TextField id="grupoSeguranca" className="input inputText" label='Nome do Grupo de Segurança ' placeholder="Insira o nome do GS" value={nomeSeguranca} onChange={(event) =>{ setNomeSeguranca(event.target.value)}} />
                                        <div className='form_dividido'>
                                            <div className='protocolo'>
                                                <label className="label" for="protocolo"></label>
                                                <TextField
                                                    id="protocolo"
                                                    select
                                                    label='Protocolo'
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
                                                <label className="label" for="porta"></label>
                                                <TextField
                                                    id="porta"
                                                    select
                                                    label='Porta'
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
                                        <label className="label" for="prioridade"></label>
                                        <TextField
                                            id="prioridade"
                                            select
                                            label='Prioridades'
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
                                        <label className="label" for="blocoIPSeguranca"></label>
                                        <TextField
                                            id="blocoIPSeguranca"
                                            className="input inputText"
                                            label='Origem do Tráfego'
                                            type="text"
                                            placeholder="000.000.000.000/00"
                                            value={trafegoOrigem} onChange={(event) => setTrafegoOrigem(event.target.value)} />
                                        {/* <input className="btnVoltar" type="submit" value="Voltar" /> */}
                                        <input className="btnProxU" type="submit" value="Cadastrar" onClick={cadastrarGrupoSeguranca} />
                                        <ToastContainer />
                                    </form>
                                </div>

                            </div>
                        </div>
                )
            }

        </>
    );
} 

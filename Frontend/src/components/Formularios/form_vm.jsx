import axios from 'axios';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import '../../assets/css/pages/criarProjeto.css'
import '../../assets/css/components/forms.css'
import VM from '../../assets/img/virtual-machine-img.svg'
import Banner_form from '../../assets/img/banner_form.svg'



const tamanhos = [
    {
        value: 'USD',
        label: 'Standard_DS1_v2',
    },
    {
        value: 'EUR',
        label: 'Standard_D2s_v3',
    },
    {
        value: 'BTC',
        label: 'Standard_D4s_v3',
    },
    {
        value: 'BTC',
        label: 'Standard_E2s_v3',
    },
];


export default function Form_VM() {
    const [nomeGR, setNomeGR] = useState('');
    const [username, setUsername] = useState('Carlos');
    const [project_name, setNomeprojeto] = useState('teste');
    const [nomeSeguranca, setNomeSeguranca] = useState('');
    const [senha, setSenha] = useState('');
    const [hostname, setHostname] = useState('');
    const [user_name, setUser_name] = useState('');
    const [nomeVM, setNomeVM] = useState('');
    const [tamanhoVM, setTamanhoVM] = useState('');
    const [nomeSubRede, setNomeSubRede] = useState('');
    const [usuario, setUsuario] = useState('');


    //VIRTUAL MACHINE
    function cadastrarVirtualMachineWindows(evento) {
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/windows_virtual_machine/", {

            vm: {
                name: nomeVM,
                rg: nomeGR,
                nsg: nomeSeguranca,
                subnet: nomeSubRede,
                size: tamanhoVM,
                username: user_name,
                password: senha,
                hostname: hostname
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
                    console.log('VM cadastrada');
                    setNomeVM('');
                    setNomeGR(nomeGR);
                    setNomeSeguranca(nomeSeguranca);
                    setNomeSubRede(nomeSubRede);
                    setTamanhoVM('');
                    setUser_name('');
                    setHostname('');
                    setUsername('');
                    setNomeprojeto('');
                    setSenha('');
                }
            }).catch(erro => console.log(erro))
    }

    function Apply(evento) {
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/apply/", {
            username: username,
            project_name: project_name
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('apply feita com sucesso');
                    setUsername('');
                    setNomeprojeto('');
                }
            }).catch(erro => console.log(erro))
    }
    // function DeletarProjeto(evento) {
    //     evento.preventDefault();
    //     axios.delete("http://35.174.249.35:8000/api/destroy/" + username + "/" + project_name + "/",
    //         // {
    //         //     username: username,
    //         //     project_name: project_name   
    //         // }, 
    //         {
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //             }
    //         })
    //         .then(resposta => {
    //             if (resposta.status === 200) {
    //                 console.log('projeto deletado');
    //                 setUsername('');
    //                 setNomeprojeto('');
    //             }
    //         }).catch(erro => console.log(erro))
    // }


    // {blocosIp.map((option) => (
    //     <MenuItem key={option.value} value={option.value}>
    //         {option.label}
    //     </MenuItem>
    // ))}
    return (
        <div className='Stage_form_VM'>

            <div className='left_stage'>
                <img src={Banner_form} />
            </div>
            <div className='right_stage'>
                <div className="imgProjeto">
                    <img src={VM} />
                </div>
                <div>
                    <div className="titulo">
                        <h6>Virtual Machine</h6>
                    </div>
                    <form method='post'>
                        <label className="label" for="selecionaGR_VM">Grupo de Recurso <strong>*</strong></label>
                        <TextField id="selecionaGR_VM" className="input_field" list="listaGR" placeholder="Nome do Grupo de Recursos" value={nomeGR} onChange={(event) => setNomeGR(event.target.value)} />
                        <label className="label" for="selecionaGS_VM">Grupo de Segurança <strong>*</strong></label>
                        <TextField id="selecionaGS_VM" className="input_field" list="listaGS" placeholder="Insira o nome do GS" value={nomeSeguranca} onChange={(event) => setNomeSeguranca(event.target.value)} />
                        <label className="label" for="nomeSubRede">Nome da Subrede</label>
                        <TextField id="nomeSubRede" className="input_field" type="text" placeholder="Insira o nome da Subede" value={nomeSubRede} onChange={(event) => setNomeSubRede(event.target.value)} />
                        <label className="label" for="nomeVM">Nome da Máquina Virtual <strong>*</strong></label>
                        <TextField id="nomeVM" className="input_field" placeholder="Insira o nome da VM" value={nomeVM} onChange={(event) => setNomeVM(event.target.value)} />
                        <label className="label" for="tamanhoVM">Tamanho da VM</label>
                        <TextField
                            id="tamanhoVM"
                            select
                            className="input_field"
                            type="text"
                            placeholder="Escolha o tamanho da VM"
                            value={tamanhoVM} onChange={(event) => setTamanhoVM(event.target.value)}>
                            {tamanhos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <label className="label" for="userName">Nome do Usuário</label>
                        <TextField id="userName" className="input_field" type="text" placeholder="Insira o nome do Usuário" value={usuario} onChange={(event) => setUsuario(event.target.value)} />
                        <label className="label" for="senha">Senha do Usuário</label>
                        <TextField id="senha" className="inputfield" type="password" placeholder="Insira a Senha do Usuário" value={senha} onChange={(event) => setSenha(event.target.value)} />
                        <label className="label" for="hostname">Hostname</label>
                        <TextField id="hostname" className="inputfield" type="text" placeholder="Insira o Hostname da VM" value={hostname} onChange={(event) => setHostname(event.target.value)} />
                        <input className="btnProxU" type="submit" value="Cadastrar" onClick={cadastrarVirtualMachineWindows} />

                    </form>
                </div>

            </div>
        </div>
    );
} 
import axios from 'axios';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import '../../assets/css/pages/criarProjeto.css'
import '../../assets/css/components/forms.css'
import VM from '../../assets/img/virtual-machine-img.svg'
import Banner_form from '../../assets/img/banner_form.svg'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from '../../components/header/header'
import { useNavigate } from 'react-router-dom';





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


export default function Form_VMW() {
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
    const [linux, setlinux] = useState(false);
    const [public_key, setPublicKey] = useState('');



    const LinuxTrue = () => {
        setlinux(true);
    }
    const LinuxFalse = () => {
        setlinux(false);
    }

    //VIRTUAL MACHINE LINUX
    function cadastrarVirtualMachineLinux(evento) {
        evento.preventDefault();
        axios.post("http://35.174.249.35:8000/api/linux_virtual_machine/", {

            vm: {
                name: nomeVM,
                rg: nomeGR,
                nsg: nomeSeguranca,
                subnet: nomeSubRede,
                public_key: public_key,
                size: tamanhoVM,
                username: user_name,
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
                    toast.success("Virtual Machine Linux cadastrada com sucesso!")
                    console.log('VM cadastrada');
                    setNomeVM('');
                    setNomeGR(nomeGR);
                    setNomeSeguranca(nomeSeguranca);
                    setNomeSubRede(nomeSubRede);
                    setTamanhoVM('');
                    setUser_name('');
                    setUsername('');
                    setNomeprojeto('');
                }
            }).catch(erro => console.log(erro))
    }

    //VIRTUAL MACHINE Windows
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
                    toast.success("Virtual Machine Windows cadastrada com sucesso!")
                    console.log('VMW cadastrada');
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
        <>
            {
                (
                    linux ?
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
                                        <h6>Virtual Machine (Linux)</h6>
                                    </div>
                                    <form method='post'>
                                        <label className="label" for="selecionaGR_VM"></label>
                                        <TextField id="selecionaGR_VM" className="input_field" label='Grupo de Recurso ' list="listaGR" placeholder="Nome do Grupo de Recursos" value={nomeGR} onChange={(event) => setNomeGR(event.target.value)} />
                                        <label className="label" for="selecionaGS_VM"></label>
                                        <TextField id="selecionaGS_VM" className="input_field" label='Grupo de Segurança ' list="listaGS" placeholder="Insira o nome do GS" value={nomeSeguranca} onChange={(event) => setNomeSeguranca(event.target.value)} />
                                        <label className="label" for="nomeSubRede"></label>
                                        <TextField id="nomeSubRede" className="input_field" label='Nome da Subrede' type="text" placeholder="Insira o nome da Subede" value={nomeSubRede} onChange={(event) => setNomeSubRede(event.target.value)} />
                                        <label className="label" for="nomeVM"> </label>
                                        <TextField id="nomeVM" className="input_field" label='Nome da Máquina Virtual' placeholder="Insira o nome da VM" value={nomeVM} onChange={(event) => setNomeVM(event.target.value)} />
                                        <label className="label" for="tamanhoVM"></label>
                                        <TextField
                                            id="tamanhoVM"
                                            select
                                            label='Tamanho da VM'
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

                                        <label className="label" for="userName"></label>
                                        <TextField id="userName" className="input_field" label="Chave Pública" type="text" placeholder="Insira a chave pública" value={public_key} onChange={(event) => setPublicKey(event.target.value)} />
                                        <label className="label" for="userName"></label>
                                        <TextField id="userName" className="input_field" label='Nome do Usuário' type="text" placeholder="Insira o nome do Usuário" value={usuario} onChange={(event) => setUsuario(event.target.value)} />
                                        <div className="btn_WL">
                                            <input className="btnProxU" type="submit" value="Windows !" onClick={LinuxFalse} />
                                            <input className="btnProxU" type="submit" value="Cadastrar" onClick={cadastrarVirtualMachineLinux} />
                                        </div>
                                        <ToastContainer />
                                    </form>
                                </div>

                            </div>
                        </div>
                        :
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
                                        <h6>Virtual Machine (Windows)</h6>
                                    </div>
                                    <form method='post'>
                                        <label className="label" for="selecionaGR_VM"></label>
                                        <TextField id="selecionaGR_VM" className="input_field" label="Grupo de Recurso" list="listaGR" placeholder="Nome do Grupo de Recursos" value={nomeGR} onChange={(event) => setNomeGR(event.target.value)} />
                                        <label className="label" for="selecionaGS_VM"></label>
                                        <TextField id="selecionaGS_VM" className="input_field" label="Grupo de Segurança" list="listaGS" placeholder="Insira o nome do GS" value={nomeSeguranca} onChange={(event) => setNomeSeguranca(event.target.value)} />
                                        <label className="label" for="nomeSubRede"></label>
                                        <TextField id="nomeSubRede" className="input_field" label='Nome da Subrede' type="text" placeholder="Insira o nome da Subede" value={nomeSubRede} onChange={(event) => setNomeSubRede(event.target.value)} />
                                        <label className="label" for="nomeVM"></label>
                                        <TextField id="nomeVM" className="input_field" label='Nome da Máquina Virtual ' placeholder="Insira o nome da VM" value={nomeVM} onChange={(event) => setNomeVM(event.target.value)} />
                                        <label className="label" for="tamanhoVM"></label>
                                        <TextField
                                            id="tamanhoVM"
                                            select
                                            className="input_field"
                                            label='Tamanho da VM'
                                            type="text"
                                            placeholder="Escolha o tamanho da VM"
                                            value={tamanhoVM} onChange={(event) => setTamanhoVM(event.target.value)}>
                                            {tamanhos.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <label className="label" for="userName"></label>
                                        <TextField id="userName" className="input_field" label='Nome do Usuário' type="text" placeholder="Insira o nome do Usuário" value={usuario} onChange={(event) => setUsuario(event.target.value)} />
                                        <label className="label" for="senha"></label>
                                        <TextField id="senha" className="inputfield" label='Senha do Usuário' type="password" placeholder="Insira a Senha do Usuário" value={senha} onChange={(event) => setSenha(event.target.value)} />
                                        <label className="label" for="hostname"></label>
                                        <TextField id="hostname" className="inputfield" label='Hostname' type="text" placeholder="Insira o Hostname da VM" value={hostname} onChange={(event) => setHostname(event.target.value)} />
                                        <div className="btn_WL">
                                            <input className="btnProxU" type="submit" value="Linux !" onClick={LinuxTrue} />
                                            <input className="btnProxU" type="submit" value="Cadastrar" onClick={cadastrarVirtualMachineWindows} />
                                        </div>
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
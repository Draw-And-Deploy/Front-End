// import banner from "./pages/login/img/banner_login2.svg";
import '../../assets/css/pages/style.css'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import UserPool from '../../UserPool';
// import { parseJwt, usuarioAutenticado } from '../../services/auth';
import banner from '../../assets/img/banner_login2.svg'
import img_login from '../../assets/img/logo_black.svg'
import img_login2 from '../../assets/img/undraw_cloud_files_wmo8.svg'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import axios from "axios";
import jwt_decode from "jwt-decode";
import { IconButton } from '@mui/material';
// import InputLabel from "@material-ui/core/InputLabel";
import { Visibility } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';
import { Input } from '@mui/material';
import { styled } from '@mui/material/styles';



//MANIPULAR O CUSTOM ATRIBUTE DO COGNITO
// localStorage.setItem('username', Userdata["custom:username"] );


function Login() {

  
  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')
  const [username, setUsername] = useState('')
  const  [Jwt_Decode, jwt7]= useState('')
  const [loading, setLoading] = useState(false)
  const [Animaition, setAnimaition] = useState(false);
  const navigate = useNavigate();




  const [values, setValues] = useState({
    password: Senha,
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };



  const Cadastrar = (event) => {
    event.preventDefault();

    axios.post("http://54.165.113.191:8080/api/create_user/", {
      username: username
      // username: username,
      // project_name: project_name
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          console.log("User cadastrado");
          setUsername("");
          // setUsername([]);
          // setNomeprojeto([]);
        }
      }).catch(erro => console.log(erro))

    UserPool.signUp(Email, values.password, [{
      Name: 'custom:username',
      Value: username
    }], null, (err, data) => {
      if (err) {
        setLoading(false)
        toast.error("Erro no cadastro! Revise seus dados!")
        console.error(err)
      } else {
        toast.success("Usuário cadastrado com sucesso!")
        toast.success("Um email de verificação foi enviado para o seu email! Verifique para poder realizar o login!")
        console.log(data)
        setEmail('')
        setSenha('')
        setUsername('')
        setLoading(false)



      }
    })
  };

  const EfetuarLogin = (event) => {
    event.preventDefault();
    setLoading(true)

    const user = new CognitoUser({
      Username: Email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: Email,
      Password: values.password,
    });

    user.authenticateUser(authDetails,  {
      onSuccess: (data) => {
        let Userdata = jwt_decode(data.getIdToken().getJwtToken());
        localStorage.setItem('email', Userdata.email );
        localStorage.setItem('username', Userdata["custom:username"] );
        // console.log( jwt_decode(data.getIdToken().getJwtToken()))

        navigate("/meus_projetos")
        // navigate("/criar_recursos")
        console.log("onSuccess: ", data);
        setLoading(true)
      },
      onFailure: (err) => {
        setLoading(false)
        // setMsg(true)
        console.error("onFailure: ", err);
        toast.error("Dados inválidos!")
      },
      newPasswordRequired: (data) => {
        setLoading(false)
        // navigate("/main")
        console.log("newPasswordRequired: ", data);
    },


    });
  }



  const addClass = () => {
    setAnimaition(true)
    // container.classList.add("sign-up-mode");
  };
  const removeClass = () => {
    setAnimaition(false)
    // container.classList.remove("sign-up-mode");
  };


  return (
    <>
      <div className={Animaition ? 'container sign-up-mode' : 'container '}   >
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" onSubmit={EfetuarLogin}>
              <h2 className="title">Login</h2>
              <div className="input-field ">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="Email" value={Email} onChange={(evt) => setEmail(evt.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <Input
                  placeholder='Senha'
                  type={values.showPassword ? "text" : "password"}
                  onChange={handlePasswordChange("password")}
                  value={values.password}
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton

                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              
              {
                loading === true && <button type="submit" className="btn solid">Login</button> 
              }
              {
                loading === false && <button type="submit"  className="btn solid" onClick={EfetuarLogin}>Login</button>
              }
              <ToastContainer/>
            </form>
            <form action="#" className="sign-up-form" onSubmit={Cadastrar} >
              <h2 className="title">Cadastrar-se</h2>
              <div className="input-field">
                <i className='fas fa-user'></i>
                <input
                  type="text" placeholder="Username" value={username} onChange={(evt) => setUsername(evt.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text" placeholder="Email" value={Email} onChange={(evt) => setEmail(evt.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <Input
                  placeholder='Senha'
                  type={values.showPassword ? "text" : "password"}
                  onChange={handlePasswordChange("password")}
                  value={values.password}
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton

                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />  
              </div>
              <p className="social-text">
                <li>8 caracteres</li>
                <li>Uma letra minúscula</li>
                <li>Uma letra maiúscula</li>
                <li>Um número</li>
              </p>
              <input type="submit" className="btn" onClick={Cadastrar} value="Sign up" />
              <ToastContainer/>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Novo aqui ?</h3>
              <p>          
                Cadastre seu usuário para começar a realizar seus projetos!
              </p>
              <button onClick={addClass} className='btn transparent' id="sign-up-btn">
                Cadastrar-se
              </button>
              <img src={banner} className="image" alt="" />
            </div>
            <img src="" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            {/* <img src={img_login} alt="" /> */}
            <div className="content">
              <h3>Bora logar ?</h3>
              <p>
                Faça o login para entrar na plataforma!
              </p>
              <button onClick={removeClass} className="btn transparent" id="sign-in-btn">
                Entrar
              </button>
            </div>
            <img
              src={img_login2}
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}


export default Login;

import { FormEvent, useEffect, useCallback, useContext, useState, useRef } from 'react';
import * as Styled from './styled';
import Avatar from '../components/Avatar';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from '../contexts/themeContext';
import { themes } from '../styles/colors';
import { menuType, Message } from '../types';
import { authContex } from '../contexts/authContext';
import { IoMdSend } from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import {
  defaultMessagesLogged,
  defaultMessagesLoggedOut,
  defaultMessagesLoggedOutIniital,
  getFormatMsgObject,
  invalidOptionMessage,
  currenciescode
} from './data';
import { Regex } from '../utils/Regex';
import { api } from '../services/api';

function Index() {

  const { theme, changeTheme } = useContext(ThemeContext);
  const { user, isSinged, singUp, singIn, updateDefaultcurrentUser, loginErr, isLoadResponse: isLoadAuthResponse } = useContext(authContex);

  const divMsgsRef = useRef<HTMLDivElement>();

  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [menu, setMenu] = useState<menuType>('initial');

  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const [emailLogin, setEmailLogin] = useState('');

  const [nameRegister, setNameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [codeDefault, setCodeDefault] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');

  const [currencyCode, setCurrencyCode] = useState('');

  useEffect(() => {
    if (!isSinged) return;
    setMenu('initialLogged');
    const defaultCurrency = user?.default_currency ? `(${user?.default_currency})` : ''
    setMessages([
      getFormatMsgObject(`Olá, ${user.name.split(' ')[0]} ${defaultCurrency}, seja bem vindo(a) 🖖🤖`),
      ...defaultMessagesLogged
    ]);
  }, [isSinged]);

  useEffect(() => {
    if (!loginErr) return;
    setMenu('initial');
    setMessages(currentMessages => [
      ...currentMessages,
      getFormatMsgObject(loginErr),
      ...defaultMessagesLoggedOut
    ]);
  }, [loginErr]);

  useEffect(() => {
    if (isSinged) return;
    setMessages(defaultMessagesLoggedOutIniital);
  }, []);

  useEffect(() => {
    if (!(isLoadingResponse || isLoadAuthResponse)) {
      setMessages(currentMessages => {
        const tmpMessages = [...currentMessages];
        const index = tmpMessages.findIndex(message => message.is_loading);
        if (index !== -1) {
          tmpMessages.splice(index, 1);
        }
        return tmpMessages;
      });
    }
  }, [isLoadingResponse, isLoadAuthResponse]);

  useEffect(() => {
    setMsg('');
    if (!divMsgsRef.current) return;
    divMsgsRef.current.scrollTo(0, divMsgsRef.current.scrollHeight);

  }, [messages]);

  const handleInitialLoggedOptions = useCallback((newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (newMsg.trim() === '1') {
    }
    else if (newMsg.trim() === '2') {
      setMenu('insertDepositBalanceOptions');
      newMsgs.push(getFormatMsgObject('Escolha uma opção 👇'));
      newMsgs.push(getFormatMsgObject('1 - Escolher tipo de moeda a ser depositada'));
      user.default_currency && newMsgs.push(getFormatMsgObject(`2 - Escolher moeda padrão (${user.default_currency})`));
      setMessages(currentMessage => [...currentMessage, ...newMsgs]);
    }
    else if (newMsg.trim() === '3') {

    }
    // else if (newMsg.trim() === '4') {
    //   setMenu('insertDefaultCode');
    //   setMessages(currentMessage => [...currentMessage, ...newMsgs, getFormatMsgObject('Insira o código da moeda (https://pt.wikipedia.org/wiki/ISO_4217) 👇')])
    // }
    else {
      newMsgs = [...newMsgs, ...invalidOptionMessage, ...defaultMessagesLogged];
      setMessages(currentMessages => [...currentMessages, ...newMsgs])
    }
  }, [user]);

  const handleInsertCodeOptions = useCallback(async (newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (!currenciescode.includes(newMsg.trim())) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, código inválido. Códigos disponíveis (https://pt.wikipedia.org/wiki/ISO_4217) 😉')]);
    }
    else {
      setCurrencyCode(newMsg);
      setMenu('insertDepositBalanceMotant');
      setMessages(currentMessage => [...currentMessage, ...newMsgs, getFormatMsgObject('Insira o montante (digitar ponto ao invés de virgula. EX: 457.45) 👇')])
    }
  }, [user]);

  const handleInsertDepositBalanceOptions = useCallback((newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (newMsg.trim() === '1') {
      setMenu('insertDepositcurrency');
      setMessages(currentMessages => [...currentMessages, getFormatMsgObject('Insira um código de moeda. Códigos disponíveis (https://pt.wikipedia.org/wiki/ISO_4217) 👇')]);
    }
    else if (newMsg.trim() === '2') {
      setCurrencyCode(user.default_currency);
      setMenu('insertDepositBalanceMotant');
      setMessages(currentMessage => [...currentMessage, ...newMsgs, getFormatMsgObject('Insira o montante (digitar ponto ao invés de virgula. EX: 457.45) 👇')])
    }
    else {
      newMsgs = [...newMsgs, ...invalidOptionMessage];
      newMsgs.push(getFormatMsgObject('1 - Escolher moeda a ser exibida'));
      user.default_currency && newMsgs.push(getFormatMsgObject(`2 - Escolher moeda padrão (${user.default_currency})`));
      setMessages(currentMessage => [...currentMessage, ...newMsgs]);
    }
  }, [user]);

  const handleInsertDepositBalanceMotant = useCallback(async (newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (!Number(newMsg)) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, montant inválido, digite um montante válido 😉')]);
    }
    else {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('...Processando 🌀', false, true)]);
      setIsLoadingResponse(true);
      try {
        const response = await api.post('/user/deposit', { montant: newMsg, currencyCode });
        setMenu('initialLogged')
        const defaultCurrency = user?.default_currency ? `(${user?.default_currency})` : ''
        setMessages([
          getFormatMsgObject(`Depósito realizado com sucesso, Saldo atual: ${response.data.balance} (${user.default_currency})`),
          getFormatMsgObject(`Olá, ${user.name.split(' ')[0]} ${defaultCurrency}`),
          ...defaultMessagesLogged
        ]);
      }
      catch (err) {
        setMessages(currentMessages => [...currentMessages, getFormatMsgObject('Ops, Algum erro acontedeu 👇')]);
      }
      setIsLoadingResponse(false);
    }
  }, [user, currencyCode]);

  const handleInitialOptions = useCallback((newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (newMsg.trim() === '1') {
      setMenu('insertEmailLogin');
      setMessages(currentMessage => [...currentMessage, ...newMsgs, getFormatMsgObject('Insira seu E-mail para login 👇')])
    }
    else if (newMsg.trim() === '2') {
      setMenu('insertName');
      setMessages(currentMessage => [...currentMessage, ...newMsgs, getFormatMsgObject('Insira seu nome 👇')])
    }
    else {
      newMsgs = [...newMsgs, ...invalidOptionMessage, ...defaultMessagesLoggedOut];
      setMessages(currentMessages => [...currentMessages, ...newMsgs])
    }
  }, []);

  const handleInsertEmailLoginOptions = useCallback((newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (!newMsg) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, insira seu E-mail para login 😉')]);
    }
    else {
      setEmailLogin(newMsg);
      setMenu('insertPasswordLogin');
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Insira sua senha para login 👇')]);
    }
  }, []);

  const handleInsertPasswordLoginOptions = useCallback(async (newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (!newMsg) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, insira uma senhasenha 😉')]);
    }
    else {
      //LOGIN DE USUÁRIO AQUI
      setMessages(currentMessages => [...currentMessages, ...newMsgs]);
      singIn({ email: emailLogin, password: newMsg });
    }
  }, [emailLogin, singIn]);

  const handleInsertNameOptions = useCallback((newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (!newMsg) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, vc não digitou nenhuma nome, por favor, insira um nome 😉')]);
    }
    else if (/\d/.test(newMsg)) { // verifica se contem números
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, Nome inválido, insira um nome válido 😉')]);
    }
    else {
      setNameRegister(newMsg);
      setMenu('insertEmailRegister');
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Insira seu E-mail 👇')]);
    }
  }, []);

  const handleInsertEmailRegisterOptions = useCallback(async (newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (!newMsg) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, vc não digitou nenhuma E-mail, por favor, insira um E-mail 😉')]);
    }
    else if (!newMsg.match(Regex.email)) { // verifica se é um email válido
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, E-mail inválido, insira um e-mail válido 😉')]);
    }
    else {
      setEmailRegister(newMsg);
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('...Processando 🌀', false, true)]);
      setIsLoadingResponse(true);
      try {
        await api.post('/auth/email', { email: newMsg });
        setMessages(currentMessages => [...currentMessages, getFormatMsgObject('Insira um código de moeda. Códigos disponíveis (https://pt.wikipedia.org/wiki/ISO_4217) 👇')]);
        setMenu('insertDefaultCode');
      }
      catch (err) {
        setMessages(currentMessages => [...currentMessages, getFormatMsgObject('Ops, já existe um usuário cadastrado com esse e-mail, insira outro 👇')]);
      }
      setIsLoadingResponse(false);
    }
  }, []);


  const handleCodeDefaultOptions = useCallback((newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (!currenciescode.includes(newMsg.trim())) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, código inválido. Códigos disponíveis (https://pt.wikipedia.org/wiki/ISO_4217) 😉')]);
    }
    else {
      setCodeDefault(newMsg);
      setPasswordRegister(newMsg);
      setMessages(currentMessages => [...currentMessages, getFormatMsgObject('Insira uma senha (deve conter no mínimo 6 caractéres) 👇')]);
      setMenu('insertPassowrd');
    }
  }, []);

  const handleInsertPasswordOptions = useCallback((newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (newMsg.length < 6) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, senha deve conter no mínimo 6 caractéres 😉')]);
    }
    else {
      setPasswordRegister(newMsg);
      setMenu('insertConfirmPassowrd');
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Insira a senha novamente 👇')]);
    }
  }, []);

  const handleInsertPasswordConfirmOptions = useCallback(async (newMsg: string) => {
    let newMsgs: Message[] = [getFormatMsgObject(newMsg, true)];
    if (newMsg !== passwordRegister) {
      setMessages(currentMessages => [...currentMessages, ...newMsgs, getFormatMsgObject('Ops, senhas não batem, insira a mesma senha 😉')]);
    }
    else {
      //CADASTRAR USUÁRIO AQUI
      singUp({ email: emailRegister, name: nameRegister, password: passwordRegister, default_currency: codeDefault });

    }
  }, [codeDefault, passwordRegister, emailRegister, nameRegister, singUp]);

  const handleSendMsg = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (menu === 'initialLogged') {
      handleInitialLoggedOptions(msg);
    }
    else if (menu === 'initial') {
      handleInitialOptions(msg);
    }
    else if (menu === 'insertDepositBalanceOptions') {
      handleInsertDepositBalanceOptions(msg);
    }
    else if (menu === 'insertDepositcurrency') {
      handleInsertCodeOptions(msg);
    }
    else if (menu === 'insertDepositBalanceMotant') {
      handleInsertDepositBalanceMotant(msg);
    }
    else if (menu === 'insertEmailLogin') {
      handleInsertEmailLoginOptions(msg);
    }
    else if (menu === 'insertPasswordLogin') {
      handleInsertPasswordLoginOptions(msg);
    }
    else if (menu === 'insertName') {
      handleInsertNameOptions(msg);
    }
    else if (menu === 'insertEmailRegister') {
      handleInsertEmailRegisterOptions(msg);
    }
    else if (menu === 'insertDefaultCode') {
      handleCodeDefaultOptions(msg);
    }
    else if (menu === 'insertPassowrd') {
      handleInsertPasswordOptions(msg);
    }
    else if (menu === 'insertConfirmPassowrd') {
      handleInsertPasswordConfirmOptions(msg);
    }
  }, [
    msg,
    menu,
    handleInitialLoggedOptions,
    handleInitialOptions,
    handleInsertEmailLoginOptions,
    handleInsertPasswordLoginOptions,
    handleInsertNameOptions,
    handleInsertEmailRegisterOptions,
    handleInsertPasswordOptions,
    handleInsertPasswordConfirmOptions
  ]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Styled.Container>
        <div>
          <header>
            <Avatar src={'images/bot.png'} />
            <div className='user-info'>
              <span className='user-name'>BOT</span>
              <span className='user-status'>online</span>
            </div>
            <Switch
              checked={theme === 'dark'}
              name="check"
              inputProps={{ 'aria-label': 'primary checkbox' }}
              onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <div className='icon-theme'>
              {theme === 'light' ? '🌞' : '🌛'}
            </div>

          </header>
          <main  >
            <div className='msgs' ref={divMsgsRef}>
              {
                messages.map((msg, i) => (
                  <div key={i} className={`msg-row ${i === 0 ? 'first-msg' : ''} ${msg.is_me ? 'my-msg-row' : ''}`}>
                    <div className={`msg-wrapper ${msg.is_me ? 'my-msg-wrapper' : ''}`}>
                      <span className='msg'>
                        {msg.text} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </span>
                      <span className='time-msg'>
                        {moment(msg.created_at).format('HH:mm')}
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
            <footer>
              <form onSubmit={handleSendMsg}>
                <div className='input-wrapper'>
                  <input
                    type='text'
                    placeholder='Digite uma mensagem'
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    disabled={isLoadingResponse}
                  />
                </div>
                <IconButton type='submit'>
                  <IoMdSend style={{ marginLeft: '2px' }} size={28} />
                </IconButton>
              </form>
            </footer>
          </main>
        </div>
      </Styled.Container>
    </ThemeProvider>
  );
}

export default Index;

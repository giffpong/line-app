import React, { useState } from 'react';
import RegisterForm from '../components/RegisterComponent.js';
import translation from '../utils/translation';
import { Provider, Translate } from 'react-translated';
import {
  Button,
  createMuiTheme,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
// import Switch from '@material-ui/core/Switch';

export default function Register() {
  const [language, setLanguage] = useState('en');
  const [darkState, setDarkState] = useState(false);

  const palletType = darkState ? 'dark' : 'light';
  // const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  // const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  let darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      // primary: {
      //   main: mainPrimaryColor,
      // },
      // secondary: {
      //   main: mainSecondaryColor,
      // },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
    console.log('🚀 ~ Register ~ darkTheme', darkTheme);
  };

  const onPressSwitchLanguage = () => {
    const lang = {
      en: 'th',
      th: 'en',
    }[language];
    console.log('🚀 ~ onPressSwitchLanguage ~ language', lang);
    setLanguage(lang);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider language={language} translation={translation}>
        <title>
          <Translate text='Register Key' />
        </title>
        <div className='App' style={{ height: '100vh' }}>
          {/* <Typography>Language: {language}</Typography> */}
          <Translate text='Language' />: {language}
          <br />
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              onPressSwitchLanguage();
            }}
            title='Switch language'
          >
            <Translate text='Switch language' />
          </Button>
          <Switch checked={darkState} onChange={handleThemeChange} />
          <Translate text='Dark Mode' />
          <RegisterForm></RegisterForm>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

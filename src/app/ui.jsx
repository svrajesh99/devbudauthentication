import React, { useEffect } from 'react';
import styles from './ui.module.scss';
import Button from './components/Button';
import Devbud from './components/Devbud';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const UI = ({}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [auth, setAuth] = useState(false);
  const mainAuth = getAuth();
  const [userData, setUserData] = useState();
  const [accessToken, setAccessToken] = useState(null);

  const signUp = () => {
    console.log(email);
    signUpWithEmail(mainAuth, email, password);
  };

  const signUpWithEmail = async (mainAuth, email, password) => {
    const res = await createUserWithEmailAndPassword(mainAuth, email, password);
    if (res) {
      setAuth(true);
    }
    setEmail('');
    setPassword('');
  };

  const signIn = () => {
    console.log(email);
    signInWithEmail(mainAuth, email, password);
  };

  const signInWithEmail = async (mainAuth, email, password) => {
    const res = await signInWithEmailAndPassword(mainAuth, email, password);
    console.log(res);
    if (res) {
      setAuth(true);
    }
    setEmail('');
    setPassword('');
  };

  const googleLogin = () => {
    parent.postMessage({ pluginMessage: { type: 'login' } }, '*');
  };

  useEffect(() => {
    window.onmessage = (event) => {
      let windowURL = event.data.pluginMessage?.windowURL;
      let pollURL = event.data.pluginMessage?.pollURL;
      console.log('pollUrl', pollURL);
      window.open(windowURL);

      let acTK = null;
      let rfTK = null;

      async function fetchAccessToken() {
        if (!acTK) {
          const res = await fetch(pollURL);
          const data = await res.json();
          acTK = data.data.accessToken;
          rfTK = data.data.refreshToken;
          // console.log(data);
          // console.log(acTK);
        } else {
          clearInterval(fetchAccessTokenTimer);
          setAccessToken(acTK);
          setAuth(true);

          const url = 'https://api.bud.dev2staging.com/v1/users/me';

          axios
            .get(url, {
              headers: {
                Authorization: `Bearer ${acTK}`,
              },
            })
            .then((response) => {
              console.log(response.data.data.name);
              setUserData(response.data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      const fetchAccessTokenTimer = setInterval(fetchAccessToken, 1000);
    };
  }, []);

  return (
    <div className={styles.Container}>
      {!auth ? (
        <div className={styles.loginContainer}>
          <h4 className={styles.Title}>Experience the AI revolution inside Figma</h4>

          <div className={styles.loginFields}>
            <div className={styles.inputField}>
              <input type="email" placeholder="Your email" />
            </div>

            <div className={styles.inputField}>
              <input className={styles.input} type="password" placeholder="Your API key" />
            </div>
          </div>

          <p className={styles.link}>How to get an API Key?</p>

          <div className={styles.buttonContainer}>
            <Button onClick={googleLogin}>Login to DevBud</Button>
          </div>
        </div>
      ) : (
        <Devbud />
      )}
    </div>
  );
};

export default UI;

// async function getWebsiteCookies(url) {
//   const cookies = [];
//   const response = await fetch(url);
//   console.log('response', response);
//   const responseCookies = response.headers.get('accessToken');
//   if (responseCookies) {
//     responseCookies.split(';').forEach((cookie) => {
//       const [name, value] = cookie.split('=');
//       cookies.push({ name: name.trim(), value: value.trim() });
//     });
//   }

//   return cookies;
// }

// const fetchAccessTokens = setInterval(
//   getWebsiteCookies(url)
//     .then((cookies) => console.log('Cookies:', cookies))
//     .catch((error) => console.error('Error getting cookies:', error)),
//   2000
// );

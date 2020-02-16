import React from 'react';
import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

const SIGN_IN_REDIRECT_URL = '/signin';
const DEFAULT_URL_AFTER_SIGNIN = '/main';

export const login = ( token ) => {
  // , { domain: ".whos.now.sh", secure: true, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year }
  cookie.set('token', token,  { expires: 365 });
  Router.push(DEFAULT_URL_AFTER_SIGNIN)
}

export const auth = ctx => {
  const { token } = nextCookie(ctx);
  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: SIGN_IN_REDIRECT_URL });
      ctx.res.end();
    } else {
      Router.push(SIGN_IN_REDIRECT_URL);
    }
  }

  return token;
}

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toString());
  Router.push(SIGN_IN_REDIRECT_URL);
}

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push(SIGN_IN_REDIRECT_URL);
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      }
    }, []);

    return <WrappedComponent {...props} />;
  }

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  }

  return Wrapper;
}
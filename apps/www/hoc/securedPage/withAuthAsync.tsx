import React from 'react';
import { useEffect } from 'react';
import Router from 'next/router';
// import nextCookie from 'next-cookies';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import ME from '../../graphql/me.graphql';
import SIGN_OUT from '../../graphql/sign-out.graphql';
import CircularProgress from '../../components/CircularProgress';

const SIGN_IN_REDIRECT_URL = '/signin';
const DEFAULT_URL_AFTER_SIGNIN = '/main';

export const login = (): void => {
  // , { domain: ".whos.now.sh", secure: true, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year }
  // cookie.set('token', token,  { expires: 365 });
  Router.push(DEFAULT_URL_AFTER_SIGNIN)
}

// export const auth = ctx => {
//   const { token } = nextCookie(ctx);
//   // If there's no token, it means the user is not logged in.
//   if (!token) {
//     if (typeof window === 'undefined') {
//       ctx.res.writeHead(302, { Location: SIGN_IN_REDIRECT_URL });
//       ctx.res.end();
//     } else {
//       Router.push(SIGN_IN_REDIRECT_URL);
//     }
//   }

//   return token;
// }

const logout = async () => {
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toString());
  Router.push(SIGN_IN_REDIRECT_URL);
};

export const useLogout = () => {
  const [signOut, {data, loading, error}] = useLazyQuery(SIGN_OUT, {
    onCompleted(data) {
      console.log('SIGN OUT completed', data);
      logout();
    },
    onError(e) {
      console.log('SIGN OUT error', e);
    },
    ssr: false,
    fetchPolicy: 'no-cache', // 이 옵션이 없으면 처음 호출에 생성된 캐시 때문에 두 번쨰 이후부터는 호출되지 않는 문제가 발생함
  });

  return signOut;
};

export const withAuthAsync = WrappedComponent => {
  const Wrapper = props => {

    const { data, loading, error } = useQuery(ME, {
      onCompleted(data) {
        console.log('useQuery(ME) data = ', data);
      },
      onError(error) {
        console.log('useQuery(ME) error = ', error.message);
        Router.push('/signin');
      },
    });

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

    return loading ? (
      <div className="gx-loader-view gx-loader-pos-ab">
        <CircularProgress />
      </div>
    ) : error ? null : <WrappedComponent {...props} />;
  }

  // Wrapper.getInitialProps = async ctx => {
  //   const token = auth(ctx);
  //   const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
  //   return { ...componentProps, token };
  // }

  return Wrapper;
};
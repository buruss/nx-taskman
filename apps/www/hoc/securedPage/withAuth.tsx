import React from 'react';
// import {getCookie} from '../../util/session';
// import redirect from '../../util/redirect';
import { useQuery } from '@apollo/react-hooks';
import ME from '../../graphql/me.query';
import Router from 'next/router';
import CircularProgress from '../../components/CircularProgress';
import { withApollo } from '../../util/next_example_page';

// export default ComposedComponent =>
//   class WithAuth extends Component {

//     static async getInitialProps(context) {
//       const isLoggedIn = getCookie('token', context.req) ? true : false;
//       console.log('withAuth getInitialProps context.req = ', context.req);
//       console.log('withAuth getInitialProps isLoggedIn = ', isLoggedIn);
//       if (!isLoggedIn) {
//         redirect(context, '/');
//       }
//       return {isLoggedIn};
//     }

//     render() {
//       return <ComposedComponent {...this.props} />;
//     }
//   };

const withAuth = (WrappedComponent, options: {redirectOnAuth?: string; redirectOnFail?: string;} = {redirectOnFail: '/signin'}) => withApollo(props => {
  const {redirectOnAuth, redirectOnFail} = options;

  const { data, loading, error } = useQuery(ME, {
    onCompleted(data) {
      console.log('useQuery(ME) data = ', data);
      console.log('redirectOnAuth', redirectOnAuth);
      if (redirectOnAuth) {
        Router.push(redirectOnAuth);
      }
    },
    onError(error) {
      console.log('useQuery(ME) error = ', error);
      console.log('redirectOnFail', redirectOnFail);
      if (redirectOnFail) {
        Router.push(redirectOnFail);
      }
    },
  });

  return loading ? (
    <div className="gx-loader-view gx-loader-pos-ab">
      <CircularProgress />
    </div>
  ) : error ? null : <WrappedComponent {...props} />;
});

export default withAuth;

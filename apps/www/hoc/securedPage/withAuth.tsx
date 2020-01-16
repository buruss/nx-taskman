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

const withAuth = (WrappedComponent) => withApollo(props => {

  const { data, loading, error } = useQuery(ME, {
    onCompleted(data) {
      console.log('useQuery(ME) data = ', data);
    },
    onError(error) {
      console.log('useQuery(ME) error = ', error);
      Router.push('/signin');
    },
  });

  return loading ? (
    <div className="gx-loader-view gx-loader-pos-ab">
      <CircularProgress />
    </div>
  ) : error ? null : <WrappedComponent {...props} />;
});

export default withAuth;

/**
 * 구버전. withAuthAsync.tsx로 대체됨
 */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import ME from '../../graphql/me.graphql';
import Router from 'next/router';
import CircularProgress from '../../components/CircularProgress';
import { withApollo } from '../../util/next_example_page';

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

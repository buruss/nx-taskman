import React from 'react';
import Layout from '../../containers/Layout';

export default ComposedComponent => props => (
  <Layout>
    <ComposedComponent {...props} />
  </Layout>
);

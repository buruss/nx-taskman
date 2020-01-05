import {compose} from 'redux';
import WithAuth from './withAuth';
import WithLayout from './withLayout';

export default compose(
  WithAuth,
  WithLayout,
);

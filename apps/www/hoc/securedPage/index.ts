import {compose} from 'redux';
import {withAuthSync} from './withAuthSync';
import WithLayout from './withLayout';

export default compose(
  withAuthSync,
  WithLayout,
);

import {compose} from 'redux';
import {withAuthAsync} from './withAuthAsync';
import WithLayout from './withLayout';

export default compose(
  withAuthAsync,
  WithLayout,
);

import {compose} from 'redux';
import {withAuthAsync} from './withAuthAsync';
import withLayout from './withLayout';
import withLang from '../withLang';
import { withApollo } from '../withApollo';

export default compose(
  withApollo,
  withAuthAsync,
  withLang,
  withLayout,
);

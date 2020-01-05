import React from 'react';
import {ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import AppLocale from '../lngProvider';

const currentAppLocale = AppLocale["en"];

export default ComposedComponent => props => (
  <ConfigProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ComposedComponent {...props} />
    </IntlProvider>
  </ConfigProvider>
);

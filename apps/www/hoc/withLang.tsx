import React from 'react';
import {ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import AppLocale from '../lngProvider';
import {connect} from "react-redux";

export default ComposedComponent => {
  const wrapper = props => {
    const {locale} = props;
    const currentAppLocale = AppLocale[locale.locale];

    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <ComposedComponent {...props} />
        </IntlProvider>
      </ConfigProvider>
    );
  };
  const mapStateToProps = ({settings}) => {
    const {locale} = settings;
    return {locale};
  };
  return connect(mapStateToProps)(wrapper);
};

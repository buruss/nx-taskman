import zhMessages from "../locales/zh-Hans.json";

let appLocaleData;
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  appLocaleData = require('@formatjs/intl-pluralrules/dist/locale-data/zh'); // Add locale data for de
}
if (!("RelativeTimeFormat" in Intl)) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  appLocaleData = require('@formatjs/intl-relativetimeformat/dist/locale-data/zh'); // Add locale data for de
}

const ZhLan = {
  messages: {
    ...zhMessages
  },
  antd: null,
  locale: 'zh-Hans-CN',
  data: appLocaleData
};
export default ZhLan;

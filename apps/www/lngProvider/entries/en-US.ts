import antdEn from "antd/lib/locale-provider/en_US";
import enMessages from "../locales/en_US.json";

let appLocaleData;
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  appLocaleData = require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
}
if (!("RelativeTimeFormat" in Intl)) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  appLocaleData = require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for de
}

const EnLang = {
  messages: {
    ...enMessages
  },
  antd: antdEn,
  locale: 'en-US',
  data: appLocaleData
};
export default EnLang;

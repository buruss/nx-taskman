import antdSA from "antd/lib/locale-provider/ca_ES";
import saMessages from "../locales/es_ES.json";

let appLocaleData;
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  appLocaleData = require('@formatjs/intl-pluralrules/dist/locale-data/es'); // Add locale data for de
}
if (!("RelativeTimeFormat" in Intl)) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  appLocaleData = require('@formatjs/intl-relativetimeformat/dist/locale-data/es'); // Add locale data for de
}

const saLang = {
  messages: {
    ...saMessages
  },
  antd: antdSA,
  locale: 'es',
  data: appLocaleData
};
export default saLang;

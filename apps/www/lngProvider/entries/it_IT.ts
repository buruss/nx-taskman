import antdSA from "antd/lib/locale-provider/it_IT";
import saMessages from "../locales/it_IT.json";

let appLocaleData;
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  appLocaleData = require('@formatjs/intl-pluralrules/dist/locale-data/it'); // Add locale data for de
}
if (!("RelativeTimeFormat" in Intl)) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  appLocaleData = require('@formatjs/intl-relativetimeformat/dist/locale-data/it'); // Add locale data for de
}

const saLang = {
  messages: {
    ...saMessages
  },
  antd: antdSA,
  locale: 'it-IT',
  data: appLocaleData
};
export default saLang;

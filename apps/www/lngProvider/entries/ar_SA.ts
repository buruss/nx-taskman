import antdSA from "antd/lib/locale-provider/en_US";
import saMessages from "../locales/ar_SA.json";

let appLocaleData;
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  appLocaleData = require('@formatjs/intl-pluralrules/dist/locale-data/ar'); // Add locale data for de
}
if (!("RelativeTimeFormat" in Intl)) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  appLocaleData = require('@formatjs/intl-relativetimeformat/dist/locale-data/ar'); // Add locale data for de
}

const saLang = {
  messages: {
    ...saMessages
  },
  antd: antdSA,
  locale: 'ar',
  data: appLocaleData
};
export default saLang;

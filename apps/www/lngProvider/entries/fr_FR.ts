import antdSA from "antd/lib/locale-provider/fr_FR";
import saMessages from "../locales/fr_FR.json";

let appLocaleData;
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  appLocaleData = require('@formatjs/intl-pluralrules/dist/locale-data/fr'); // Add locale data for de
}
if (!("RelativeTimeFormat" in Intl)) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  appLocaleData = require('@formatjs/intl-relativetimeformat/dist/locale-data/fr'); // Add locale data for de
}

const saLang = {
  messages: {
    ...saMessages
  },
  antd: antdSA,
  locale: 'fr-FR',
  data: appLocaleData
};
export default saLang;

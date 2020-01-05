import enLang from "./entries/en-US";
import zhLang from "./entries/zh-Hans-CN";
import arLang from "./entries/ar_SA";
import itLang from "./entries/it_IT";
import esLang from "./entries/es_ES";
import frLang from "./entries/fr_FR";
// import {addLocaleData} from "react-intl";

const AppLocale = {
  en: enLang,
  zh: zhLang,
  ar: arLang,
  it: itLang,
  es: esLang,
  fr: frLang
};
// addLocaleData(AppLocale.en.data);
// addLocaleData(AppLocale.zh.data);
// addLocaleData(AppLocale.ar.data);
// addLocaleData(AppLocale.it.data);
// addLocaleData(AppLocale.es.data);
// addLocaleData(AppLocale.fr.data);

// if (!Intl.PluralRules) {
//   require('@formatjs/intl-pluralrules/polyfill');
//   require('@formatjs/intl-pluralrules/dist/locale-data/en');
//   require('@formatjs/intl-pluralrules/dist/locale-data/zh');
//   require('@formatjs/intl-pluralrules/dist/locale-data/ar');
//   require('@formatjs/intl-pluralrules/dist/locale-data/it');
//   require('@formatjs/intl-pluralrules/dist/locale-data/es');
//   require('@formatjs/intl-pluralrules/dist/locale-data/fr');
// }

// if (!Intl.RelativeTimeFormat) {
//   require('@formatjs/intl-relativetimeformat/polyfill');
//   require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
//   require('@formatjs/intl-relativetimeformat/dist/locale-data/zh');
//   require('@formatjs/intl-relativetimeformat/dist/locale-data/ar');
//   require('@formatjs/intl-relativetimeformat/dist/locale-data/it');
//   require('@formatjs/intl-relativetimeformat/dist/locale-data/es');
//   require('@formatjs/intl-relativetimeformat/dist/locale-data/fr');
// }

export default AppLocale;

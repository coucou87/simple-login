import React, { useState, createContext, useContext } from 'react';
import { languageOptions, dictionaryList } from '../../languages/index';
import Cookies from 'universal-cookie';


// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: 'fa',
  dictionary: dictionaryList.fa
});


// it provides the language context to app
export function LanguageProvider({ children }) {
  const [userLanguage, setUserLanguage] = useState('fa');
  const cookie = new Cookies();

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: selected => {
      if(cookie.get('lang') === undefined){
        selected = 'fa'
      }
      const newLanguage = languageOptions[selected] ? selected : 'fa'
      setUserLanguage(newLanguage);
      cookie.set('dir', newLanguage === 'fa' ? 'rtl' : 'ltr' ,{ path: '/'})
      cookie.set('lang', newLanguage , { path: '/'});
    }
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};

// get text according to id & current language
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary[tid] || tid;
};

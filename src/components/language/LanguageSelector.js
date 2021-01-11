import React, { useContext, useEffect } from 'react';
import { languageOptions } from '../../languages';
import { LanguageContext } from './Language';
import Cookies from 'universal-cookie';
// import '../languageSelector.css';

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);
  const cookie = new Cookies();

  // set selected language by calling context method
  const handleLanguageChange = e => userLanguageChange(e.target.value);

  useEffect(() => {
    let defaultLanguage = cookie.get('lang');
    if (!defaultLanguage) {
      cookie.set('dir', defaultLanguage === 'en' ? 'ltr' : 'rtl');
      defaultLanguage = window.navigator.language.substring(0, 2);
    }
    userLanguageChange(defaultLanguage);
  }, [userLanguageChange, cookie]);

  return (
    <select className="xxx"
      onChange={handleLanguageChange}
      value={userLanguage}
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id} className="xxx">{name}</option>
      ))}
    </select>
  );
};

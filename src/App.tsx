import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n/config';
function App() {

  const { t } = useTranslation();

  return (
    <>
      <div>
        <p>{t('title.Welcome to React')}</p>
      </div>
    </>
  );
}

export default App;

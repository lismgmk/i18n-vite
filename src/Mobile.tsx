import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n/config';
function Mobile() {
  const { t } = useTranslation();
  console.log(navigator.languages, '++++');
  return (
    <>
      <h1>Hello world</h1>
      <div>
        <p>{t('title.validate')}</p>
        <></>
      </div>
    </>
  );
}

export default Mobile;

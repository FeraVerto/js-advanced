import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import { IGlobalState } from '../../redux/state';
import { CurrencyState } from '../../redux/currencyReducer';
import { bindActionCreators, compose, Dispatch } from 'redux';
import {
  ChangeActionAC,
  ChangeCurrencyFieldAC,
  changeCurrentCurrencyAC
} from '../../redux/actions';
import { selectAll } from '../../redux/selectors';


const CurrencyEContainer: React.FunctionComponent = () => {

  let dispatch = useDispatch()
  let {currencies, currentCurrency, isBuying, amountOfBYN, amountOfCurrency} = useSelector(selectAll)

  //Курс валюты, выводится в компонент CurrencyExchange (Валютная биржа)
  let currencyRate: number = 0;

  //проходит по массиву валют и проверяет равна ли currencyName(наименование валюты) currentCurrency(текущей выбранной валюте)
  //и, если равна, то присваиваем currencyRate значение в зависимости от isBuying либо buyRate, либо sellRate этой валюты
  //возвращает currencyName
  //передаем в CurrencyExchange, мапим и выводим список валют

  const currenciesName = currencies.map((currency) => {
    if (currency.currencyName === currentCurrency) {
      currencyRate = isBuying ? currency.buyRate : currency.sellRate;
    }
    return currency.currencyName;
  });


  const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
    //вводим значение в инпут "You give the next amount of BYN:" и записываем его в value
    let value = e.currentTarget.value;
    //isFinite проверяет является ли переданное число конечным
    //если не является, то завешаем функцию
    //null здесь быть не может, так как это эвент
    if (!isFinite(+value)) return;

    if (e.currentTarget.dataset.currency) {
      //проверка для typescript
      //достаем значение атрибута data-currency тэга input (data-* - нестандартный атрибут для передачи данных
      // из html в js)
      const trigger: string = e.currentTarget.dataset.currency;
      //проверяем чему он равен
      if (trigger === 'byn') {
        if (value === '') {
          //отправляет в диспатч пустые значения
          dispatch(ChangeCurrencyFieldAC(value, value));
        } else {
          dispatch(ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
        }
      } else {
        if (value === '') {
          dispatch(ChangeCurrencyFieldAC(value, value));
        } else {
          dispatch(ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
        }
      }
    }
  };

  //достает значение из атрибута  data-action и проверяет: если 'buy', то диспатчит true
  const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.dataset.action === 'buy' ? dispatch(ChangeActionAC(true)) : dispatch(ChangeActionAC(false));
  };

  //достает значение из data-currency= "currency" и диспатчит
  const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.dataset.currency && dispatch(changeCurrentCurrencyAC(e.currentTarget.dataset.currency));
  };

  return (
    <React.Fragment>
      <CurrencyExchange
        currenciesName={currenciesName}
        currentCurrency={currentCurrency}
        currencyRate={currencyRate}
        isBuying={isBuying}
        amountOfBYN={amountOfBYN}
        amountOfCurrency={amountOfCurrency}
        changeCurrencyField={changeCurrencyField}
        changeAction={changeAction}
        changeCurrentCurrency={changeCurrentCurrency}
      />
    </React.Fragment>
  );
};

export default CurrencyEContainer;


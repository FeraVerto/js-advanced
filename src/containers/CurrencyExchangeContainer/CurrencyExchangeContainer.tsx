import React from 'react';
import { connect } from 'react-redux';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import { IGlobalState } from '../../redux/state';
import { CurrencyState } from '../../redux/currencyReducer';
import { compose, Dispatch } from 'redux';
import {
  ChangeActionAC,
  ChangeCurrencyFieldAC,
  changeCurrentCurrencyAC,
  CurrencyReducersTypes,
} from '../../redux/actions';
import { log } from 'util';

/*const initialState: CurrencyState = {
  currencies: [
    {
      currencyName: 'USD',
      buyRate: 2.62,
      sellRate: 2.58,
    },
    {
      currencyName: 'EUR',
      buyRate: 3.1,
      sellRate: 3.06,
    },
    {
      currencyName: 'RUR',
      buyRate: 0.0345,
      sellRate: 0.0341,
    },
  ],
  currentCurrency: 'USD',
  isBuying: true,
  amountOfBYN: '',
  amountOfCurrency: '',
};*/

interface ICurrencyProps extends CurrencyState {
  setCurrencyAmount: (amountOfBYN: string, amountOfCurrency: string) => void;
  setAction: (isBuying: boolean) => void;
  changeCurrency: (currency: string) => void;
}

const CurrencyEContainer: React.FunctionComponent<ICurrencyProps> = ({
   currencies,
   currentCurrency,
   isBuying,
   amountOfBYN,
   amountOfCurrency,
   setCurrencyAmount,
   setAction,
   changeCurrency,
 }) => {

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
    if (!isFinite(+value)) return;

    if (e.currentTarget.dataset.currency) {
      //достаем значение атрибута data-currency тэга input (data-* - нестандартный атрибут для передачи данных
      // из html в js)
      const trigger: string = e.currentTarget.dataset.currency;
      //проверяем чему он равен
      if (trigger === 'byn') {
        if (value === '') {
          //отправляет в диспатч пустые значения
          setCurrencyAmount(value, value);
        } else {
          //отправляет в диспатч значение введенное в инпут и вычисленное значение
          //Метод toFixed() форматирует число, используя запись с фиксированной запятой.
          setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
        }
      } else {
        if (value === '') {
          setCurrencyAmount(value, value);
        } else {
          setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
        }
      }
    }
  };

  //достает значение из атрибута  data-action и проверяет: если 'buy', то диспатчит true
  const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
  };

  //достает значение из data-currency= "currency" и диспатчит
  const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
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

const mapStateToProps = (state: IGlobalState) => {
  return {
    currencies: state.currency.currencies,
    currentCurrency: state.currency.currentCurrency,
    isBuying: state.currency.isBuying,
    amountOfBYN: state.currency.amountOfBYN,
    amountOfCurrency: state.currency.amountOfCurrency,
  };
};
// @ts-ignore
const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) => {
  return {
    setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
      dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
    },
    setAction(isBuying: boolean) {
      dispatch(ChangeActionAC(isBuying));
    },
    changeCurrency(currency: string) {
      dispatch(changeCurrentCurrencyAC(currency));
    },
  };
};
// @ts-ignore
export const CurrencyExchangeContainer = compose(connect(mapStateToProps, mapDispatchToProps))(CurrencyEContainer);


import { ACTIONS_TYPE, CurrencyReducersTypes } from './actions';

type CurrencyType = {
  currencyName: string;
  buyRate: number;
  sellRate: number;
};
export type CurrencyState = {
  currencies: Array<CurrencyType>;
  currentCurrency: string;
  isBuying: boolean;
  amountOfBYN: string;
  amountOfCurrency: string;
};

const initialState: CurrencyState = {
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
};

export const currencyReducer = (state: CurrencyState = initialState, action: CurrencyReducersTypes): CurrencyState => {

  switch (action.type) {
    case 'CHANGE_CURRENCY_FIELD':
      return { ...state, amountOfBYN: action.amountOfBYN, amountOfCurrency: action.amountOfCurrency };

    case 'IS_BUYING':
      return { ...state, isBuying: action.isBuying };

    case 'CHANGE_CURRENT_CURRENCY':
      return { ...state, currentCurrency: action.currentCurrency };

    default:
      return state;
  }
};

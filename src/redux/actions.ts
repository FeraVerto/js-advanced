export enum ACTIONS_TYPE {
  CHANGE_CURRENCY_FIELD_TYPE = 'CurrencyExchange/CHANGE_CURRENCY_FIELD_TYPE',
  CHANGE_CHANGE_ACTION = 'CurrencyExchange/CHANGE_CHANGE_ACTION',
  CHANGE_CURRENT_CURRENCY = 'CurrencyExchange/CHANGE_CURRENT_CURRENCY',
}

/*----------ChangeCurrencyField------------*/
export type ChangeCurrencyFieldType = {
  type: "CHANGE_CURRENCY_FIELD"
  amountOfBYN: string
  amountOfCurrency: string
};

export const ChangeCurrencyFieldAC = (amountOfBYN: string, amountOfCurrency: string): ChangeCurrencyFieldType => ({
  type: "CHANGE_CURRENCY_FIELD", amountOfBYN, amountOfCurrency,
});

/*----------ChangeAction------------*/

export type ChangeAction = {
  type: "IS_BUYING"
  isBuying: boolean
};

export const ChangeActionAC = (isBuying: boolean): ChangeAction => ({
  type: "IS_BUYING", isBuying
});

/*----------ChangeCurrentCurrency------------*/

export type ChangeCurrentCurrencyType = {
  type: "CHANGE_CURRENT_CURRENCY"
  currentCurrency: string
};

export const changeCurrentCurrencyAC = (currentCurrency: string): ChangeCurrentCurrencyType => ({
  type: "CHANGE_CURRENT_CURRENCY", currentCurrency
});

export type CurrencyReducersTypes = ChangeCurrencyFieldType | ChangeAction | ChangeCurrentCurrencyType;

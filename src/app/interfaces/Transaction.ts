export enum DateFrequency {
  NEVER = 'n',
  DAYS = 'd',
  WEEKS = 'w',
  MONTHS = 'M',
  QUARTERS = 'Q',
  YEARS = 'y',
  /* HOURS = 'h',
  MINUTES = 'm',
  SECONDS = 's',
  MILLISECONDS = 'ms', */
}

export interface ITransaction {
  id: string;
  name: string;
  type: 'income' | 'expenses';
  startDate: string;
  dueDate?: string;
  isSettled?: boolean;
  settlement?: ISettlement;
  noOfRepeats: number;
  frequency: DateFrequency;
  amount: number;
  frequencyCount: number;
}

export interface ISettlement {
  id: string;
  date: string;
  transactionId: string;
}

export enum DateFrequencySignalr {
  n = 'NEVER',
  d = 'DAY',
  w = 'WEEK',
  M = 'MONTH',
  Q = 'QUARTER',
  y = 'YEAR',
  /* h = 'HOUR',
   m = 'MINUTE',
   s = 'SECOND',
   ms = 'MILLISECOND', */
}

export enum DateFrequencyPlural {
  n = 'NEVER',
  d = 'DAYS',
  w = 'WEEKS',
  M = 'MONTHS',
  Q = 'QUARTERS',
  y = 'YEARS',
  /* h = 'HOURS',
   m = 'MINUTES',
   s = 'SECONDS',
   ms = 'MILLISECONDS', */
}

export const getDetaultTransaction = (): ITransaction => {
  return {
    name: '',
    type: 'income',
    amount: null,
    startDate: '',
    frequencyCount: null,
    frequency: DateFrequency.NEVER,
    noOfRepeats: 1,
    id: '',
  };
};

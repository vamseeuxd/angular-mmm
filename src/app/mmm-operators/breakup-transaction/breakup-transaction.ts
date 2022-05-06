import { MonoTypeOperatorFunction, pipe } from 'rxjs';
// @ts-ignore
import moment from 'moment';
import { map, delay, tap } from 'rxjs/operators';
import { ISettlement, ITransaction } from '../../interfaces/Transaction';

function isTransactionAsSelectedMonth(m: string, t: ITransaction) {
  const frmt = 'MMM-yyyy';
  const stDt = moment(t.startDate);
  // @ts-ignore
  stDt.subtract(1, 'M');
  const enDt = moment(t.startDate);
  // @ts-ignore
  enDt.add(t.noOfRepeats * t.frequencyCount, t.frequency);
  // @ts-ignore
  enDt.add(1, 'M');
  const selDt = moment(m);
  /* console.log(
    'Is Date :',
    selDt.format(frmt),
    ' is in Betweem',
    stDt.format(frmt),
    ' Start : ',
    enDt.format(frmt),
    ' End : ',
    moment(selDt.format(frmt)).isBetween(stDt.format(frmt), enDt.format(frmt))
  ); */
  return moment(selDt.format(frmt)).isBetween(
    stDt.format(frmt),
    enDt.format(frmt)
  );
}
function breakupTransaction(
  selectedMonth: string,
  settlements: ISettlement[]
): MonoTypeOperatorFunction<any[]> {
  console.clear();
  return pipe(
    map((transactions: ITransaction[]) => {
      const ITSM = isTransactionAsSelectedMonth;
      // console.log(transactions.filter((t) => ITSM(selectedMonth, t)));
      return transactions
        .filter((t) => ITSM(selectedMonth, t))
        .map((transaction) => {
          return Array.from(Array(transaction.noOfRepeats).keys()).map(
            (repeatCount) => {
              const date = moment(transaction.startDate);
              const startDate = moment(transaction.startDate);
              // @ts-ignore
              date.add(
                repeatCount * transaction.frequencyCount,
                transaction.frequency
              );
              const dueDate = date.format('DD-MMM-yyyy');
              const settlement = settlements.find(
                (d) =>
                  d.transactionId === transaction.id &&
                  d.date.toLowerCase() === dueDate.toLowerCase()
              );
              const isSettled = !!settlement;
              return {
                dueDate,
                ...transaction,
                isSettled,
                settlement,
                startDate: startDate.format('DD-MMM-yyyy'),
              };
            }
          );
        });
    }),
    map((transactions: ITransaction[][]) => {
      const list = [];
      transactions.forEach((v) => {
        list.push(...v);
      });
      return list;
    }),
    map((d) => {
      return d.filter(
        (dd) => moment(dd['dueDate']).format('MMM-yyyy') == selectedMonth
      );
      // console.log(selectedMonth, dueDate);
    }),
    delay(1)
  );
}
export default breakupTransaction;

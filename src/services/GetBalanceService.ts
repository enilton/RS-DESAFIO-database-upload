// import AppError from '../errors/AppError';
import Balance from '../models/Balance';
import Transaction from '../models/Transaction';

class GetBalanceService {
  public async execute(transactions: Transaction[]): Promise<Balance> {

    const balanceIncome = transactions.filter(transaction => transaction.type === 'income');
    const balanceOutcome = transactions.filter(transaction => transaction.type === 'outcome');

    let balance = new Balance();

    balanceIncome.map(transaction => {
      balance.income += transaction.value;
    });

    balanceOutcome.map(transaction => {
      balance.outcome += transaction.value;
    });

    balance.total = balance.income - balance.outcome

    return balance;
  }
}

export default GetBalanceService;

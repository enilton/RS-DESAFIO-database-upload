// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

import TransactionsRepository from '../repositories/TransactionsRepository';

class GetBalanceService {
  public async execute(): Promise<Balance> {

    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionRepository.find();

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

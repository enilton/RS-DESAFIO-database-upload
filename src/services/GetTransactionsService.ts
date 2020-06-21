// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

import GetBalanceService from './GetBalanceService';

import TransactionRepository from '../repositories/TransactionsRepository';

interface GetTransactionsResponse {
  transactions:Transaction[],
  balance: Balance,
}

class GetTransactionsService {
  public async execute(): Promise<GetTransactionsResponse> {

    const transactionRepository = getCustomRepository(TransactionRepository);
    const getBalanceService = new GetBalanceService();

    const transactions = await transactionRepository.find({
      relations:['category'],
    });

    const balance = await getBalanceService.execute(transactions);

    return {
        transactions,
        balance,
      }
  }
}

export default GetTransactionsService;

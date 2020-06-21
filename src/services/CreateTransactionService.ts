// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CategoryRepository from '../repositories/CategoryRepository';

import GetBalanceService from '../services/GetBalanceService';

import AppError from '../errors/AppError';

interface CreateTrasactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: CreateTrasactionRequest): Promise<Transaction> {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (type === 'outcome') {
      const getBalanceService = new GetBalanceService();
      const balance = await getBalanceService.execute(await transactionsRepository.find());

      if (balance.total < value)
        throw new AppError('Saldo Insuficiente', 400);
    }

    let categoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categoryExists) {
      categoryExists = categoryRepository.create({ title: category });
      await categoryRepository.save(categoryExists);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: categoryExists.id
    });

    await transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;

import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(idT: string): Promise<void> {

    const transactionRepository = getCustomRepository(TransactionRepository);

    const transactionExists  = await transactionRepository.findOne({
      where: { id: idT },
    });

    if (!transactionExists){
      throw new AppError('Transação inexistente',400);
    }

    await transactionRepository.remove(transactionExists);
  }
}

export default DeleteTransactionService;

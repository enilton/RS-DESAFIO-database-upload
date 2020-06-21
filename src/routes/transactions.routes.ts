import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const getTransactionsService = new GetTransactionsService();
  return response.json(await getTransactionsService.execute());
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    category,
  });
  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;

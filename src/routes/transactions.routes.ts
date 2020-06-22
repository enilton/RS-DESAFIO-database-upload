import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload';
const upload = multer(uploadConfig);

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const getTransactionsService = new GetTransactionsService();
  return response.json(await getTransactionsService.execute());
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransactionService = new CreateTransactionService();
  return response.json(await createTransactionService.execute({
    title,
    value,
    type,
    category,
  }));
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteTransactionService = new DeleteTransactionService();
  await deleteTransactionService.execute(id);
  return response.sendStatus(204);
});

transactionsRouter.post('/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();
    const transactions = await importTransactionsService.execute(request.file.path);
    return response.json(transactions);
});

export default transactionsRouter;

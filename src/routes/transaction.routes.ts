import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import Repository from '../repositories/TransactionsRepository';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const repository = new Repository();

// const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', async (request, response) => {
  try {
    const list = await repository.all();
    const balance = await repository.getBalance();
    return response.json({ transactions: list, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transaction = { title, value, type };
    const createTransactionService = new CreateTransactionService(repository);
    const transactionCreated = createTransactionService.execute(transaction);
    return response.json(transactionCreated);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

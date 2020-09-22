/* eslint-disable class-methods-use-this */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const balance: Balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw new Error("You don't have money to do this transaction");
    } else {
      const transaction = this.transactionsRepository.create({
        title,
        type,
        value,
      });
      return transaction;
    }
  }
}

export default CreateTransactionService;

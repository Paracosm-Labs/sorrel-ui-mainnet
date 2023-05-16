import TransferComptroller from "../contracts/transferComptroller";

class TransactionPublisher {
  observers = [];
  data = []
  timer = null;
  constructor() {
    this.init();
  }

  readTxns = async () => {
    let tc = new TransferComptroller();
    await tc.init();
    return await tc.getTransactions();
}
  getData = async () => {
    this.data = await this.readTxns();
    this.notify();
  };
  init = async () => {
    this.timer = setInterval(() => this.getData(), 3 * 1000);
  };

  attach = (observer) => {
    this.observers.push(observer);
  };

  detach = (observer) => {
    this.observers = this.observers.filter((observed) => observed !== observer);
  };

  notify = () => {
    console.log(this.data);
    this.observers.forEach((observer) => observer(this.data));
  };
}

const transactionPublisher = new TransactionPublisher();

export default transactionPublisher;




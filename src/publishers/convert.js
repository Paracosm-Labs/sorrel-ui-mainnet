import ConvertComptroller from "../contracts/convertComptroller";

class ConvertPublisher {
  observers = [];
  data = []
  timer = null;
  constructor() {
    this.init();
  }

  readTxns = async () => {
    let cc = new ConvertComptroller();
    await cc.init();
    return await cc.getTransactions();
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

const convertPublisher = new ConvertPublisher();

export default convertPublisher;




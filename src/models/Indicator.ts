import { Model } from 'src/models/Model';

interface IndicatorType {
  id: number;
  age: number;
  weight: number;
  height: number;
  user_id: number;
}

class Indicator extends Model<IndicatorType> {
  constructor() {
    super('indicator');
  }
}

export default new Indicator();

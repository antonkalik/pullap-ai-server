import { Model } from 'src/models/Model';
import type { Indicator } from 'src/@types';

export class IndicatorModel extends Model {
  static tableName = 'indicators';

  public static async findAllByUserId(userId: number) {
    return this.findAllBy<
      {
        user_id: number;
      },
      Indicator
    >({
      user_id: userId,
    });
  }

  public static async updateByUserId(userId: number, data: Partial<Indicator>) {
    return this.updateBy<
      {
        user_id: number;
      },
      Partial<Indicator>
    >(
      {
        user_id: userId,
      },
      data
    );
  }
}

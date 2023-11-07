import { Model } from 'src/models/Model';
import type { Activity, Indicator } from "src/@types";

export class ActivityModel extends Model {
  static tableName = 'activities';

  public static async findAllByUserId(userId: number) {
    return this.findAllBy<
      {
        user_id: number;
      },
      Activity
    >({
      user_id: userId,
    });
  }
}

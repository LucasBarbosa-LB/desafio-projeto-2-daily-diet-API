// eslint-disable-next-line
import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    snacks: {
      id: string;
      user_id: string;
      name: string;
      description: string;
      is_diet: boolean;
      created_at: string;
    };
    users: {
      id: string;
      name: string;
      username: string;
      session_id?: string;
    };
  }
}

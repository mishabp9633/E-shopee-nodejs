import { Env } from '@/configs/env';

export const dbConnection = {
  url: Env.MONGO_URL,
  options: {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
};

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UserRoute from '@/routes/user.route';
import validateEnv from '@utils/validateEnv';
import RecentViewRoute from './routes/recentView.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UserRoute(),
  new AuthRoute(),
  new RecentViewRoute()
]);

app.listen();

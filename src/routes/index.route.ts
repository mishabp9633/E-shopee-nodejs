import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes ,BaseRoute} from '@interfaces/routes.interface';

class IndexRoute extends BaseRoute implements Routes {
  public path = '/';
  public indexController = new IndexController();

  constructor() {
    super()
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;

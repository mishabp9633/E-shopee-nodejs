import { Router } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}


export class BaseRoute{
  public router = Router();
}

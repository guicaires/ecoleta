import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async create (req: Request, res: Response) {
    const { name, email, whatsapp, longitude, latitude, city, uf, items } = req.body;

    const trx = await knex.transaction();

    const point = { image: 'image-fake', name, email, whatsapp, longitude, latitude, city, uf };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return { point_id, item_id };
    });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return res.json({ id: point_id, ...point });
  }

}

export default PointsController;

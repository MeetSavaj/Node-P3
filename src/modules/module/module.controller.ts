import { NextFunction, Request, Response } from "express";
import { User } from '../../models/user';
import { BadRequestResponse, CannotDeleteResponse, SuccessResponse } from "../../helpers/http";
import db from "../../models/conn";

export class ModuleContoller {


    public getAllModule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const module = await User.findAll();

            const module = await db.sequelize.query(`SELECT * FROM user
            where last_update > now() - interval 40 hour`,
                { type: db.sequelize.QueryTypes.SELECT });

            return SuccessResponse(res, 'Ok', module);
        } catch (err) {
            next(err);
        }

    }

    public copyAllModule = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const module = await db.sequelize.query(`INSERT INTO user2 (user_id, last_update) 
            SELECT id, now() as last_update FROM user WHERE NOT EXISTS (SELECT user_id FROM user2 WHERE user_id = user.id)`,
                { type: db.sequelize.QueryTypes.INSERT });
            if (module[1]) {
                return res.status(200).send('Module created successfully').json(module);
            } else {
                const module = await db.sequelize.query(`UPDATE user2 SET last_update = now()
                WHERE user_id = user2.user_id`,
                    { type: db.sequelize.QueryTypes.UPDATE});

                return res.status(400).send('Modules are already exist').json(module);
            }
        } catch (err) {
            next(err);
        }

    }

    public createModule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;
            const module = await User.findOrCreate({
                where: {
                    first_name: body.first_name
                },
                defaults: body
            });
            // console.log(module);
            if (module[1]) {
                return res.status(200).send('Module created successfully').json(module);
            } else {
                return res.status(400).send('Module already exist').json(module);
            }
        } catch (err) {
            next(err);
        }
    }

    public updateModule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;
            
            const { id } = req.params;
            const module = await User.findByPk(id);
            if (module) {
                await module.update(body);
                return SuccessResponse(res, 'Module updated successfully');
            } else {
                return BadRequestResponse(res, 'Module not found');
            }
        } catch (err) {
            next(err);
        }
    }

    public deleteModule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const permission = await User.findOne({ where: { id: id } });
            if (!permission) return CannotDeleteResponse(res);
            const module = await User.findByPk(id);
            if (module) {
                await module.destroy();
                return SuccessResponse(res, 'Module deleted successfully');
            } else {
                return BadRequestResponse(res, 'Module not found');
            }
        } catch (err) {
            next(err);
        }
    }
}


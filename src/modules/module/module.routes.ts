import { Router } from "express";
import { MailService } from "../../services/email.service";
import { PdfService } from "../../services/pdf.service";
// import { Auth } from "../../middleware/auth.middleware";
// import { bodyvalidator } from "../../middleware/validate.middleware";
// import { schemaBio } from "../../schemas/bio.schema";
// import { AuthController } from "../auth/auth.controller";
import { ModuleContoller } from "../module/module.controller";
// import { getScore } from "./module.controller";

export class ModuleRoutes {
    router = Router();

    private modulectrl: ModuleContoller = new ModuleContoller();
    private pdfCtrl: PdfService = new PdfService();
    private mailCtrl: MailService = new MailService();


    constructor() {

        this.router.get('/', this.modulectrl.getAllModule);

        this.router.get('/copy', this.modulectrl.copyAllModule);

        this.router.get('/pdf', this.pdfCtrl.getPdf);

        this.router.get('/email', this.mailCtrl.sendMail);

        this.router.post('/',/* [Auth, bodyvalidator(schemaBio)],*/ this.modulectrl.createModule);

        this.router.put('/:id', /*[Auth, bodyvalidator(schemaBio)],*/ this.modulectrl.updateModule);

        this.router.delete('/:id', /*[Auth],*/ this.modulectrl.deleteModule);

    }
}
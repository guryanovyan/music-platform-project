import {Controller, Get, Query} from "@nestjs/common";
import {AppService} from "./app.service";

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Get('/search')
    search(@Query('query') query: string) {
        return this.appService.search(query)
    }
}
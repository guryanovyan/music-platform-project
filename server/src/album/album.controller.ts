import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {ObjectId} from "mongoose";

@Controller('/albums')
export class AlbumController {
    constructor(private albumService: AlbumService) {    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audios', maxCount: 50},
    ]))
    create(@Body() dto: CreateAlbumDto,
           @UploadedFiles() files: {picture?: Express.Multer.File[]; audios?: Express.Multer.File[]}
    ) {
        const {picture, audios} = files;
        return this.albumService.create(dto, picture[0], audios)
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number,) {
        return this.albumService.getAll(count, offset);
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }
}
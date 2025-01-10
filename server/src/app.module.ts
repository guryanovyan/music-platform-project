import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import * as path from 'path'
import {ServeStaticModule} from "@nestjs/serve-static";
import {AlbumModule} from "./album/album.module";
import {AppService} from "./app.service";
import {AppController} from "./app.controller";
import {Track, TrackSchema} from "./track/schemas/track.schema";
import {Album, AlbumSchema} from "./album/schemas/album.schema";

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, '..', 'static')}),
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.dpoof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
        TrackModule,
        AlbumModule,
        FileModule,
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    ],
    providers: [AppService],
    controllers: [AppController]
})
export class AppModule {}
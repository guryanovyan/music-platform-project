import {Module} from "@nestjs/common";
import {AlbumController} from "./album.controller";
import {AlbumService} from "./album.service";
import {FileService} from "../file/file.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "../track/schemas/track.schema";
import {Album, AlbumSchema} from "./schemas/album.schema";
import {TrackService} from "../track/track.service";
import {Comment, CommentSchema} from "../track/schemas/comment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService, TrackService]
})
export class AlbumModule {}
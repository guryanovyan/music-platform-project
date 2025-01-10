import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./track/schemas/track.schema";
import {Model} from "mongoose";
import {Album, AlbumDocument} from "./album/schemas/album.schema";

@Injectable()
export class AppService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,) {}

    async search(query: string): Promise<any> {
        const foundTracks = await this.trackModel.find({
            $or: [
                {name: {$regex: new RegExp(query, 'i')}},
                {artist: {$regex: new RegExp(query, 'i')}},
            ]
        })
        const foundAlbums = await this.albumModel.find({
            $or: [
                {name: {$regex: new RegExp(query, 'i')}},
                {author: {$regex: new RegExp(query, 'i')}},
            ]
        })
        return {albums: foundAlbums, tracks: foundTracks}
    }
}
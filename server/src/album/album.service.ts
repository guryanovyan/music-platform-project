import {Injectable} from "@nestjs/common";
import {Album, AlbumDocument} from "./schemas/album.schema";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "../track/schemas/track.schema";
import {Model, ObjectId} from "mongoose";
import {FileService, FileType} from "../file/file.service";
import {TrackService} from "../track/track.service";

@Injectable()
export class AlbumService {
    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
                @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                private fileService: FileService,) {    }

    async create(dto: CreateAlbumDto, picture, audios): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

        const trackIds = [];
        for (const [index, trackDto] of dto.tracks.entries()) {
            const audio = audios[index];
            const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
            const track = await this.trackModel.create({
                ...trackDto,
                artist: dto.author,
                album: dto.name,
                picture: picturePath,
                audio: audioPath
            });
            trackIds.push(track._id);
        }

        const album = await this.albumModel.create({...dto, picture: picturePath, tracks: trackIds})
        return album;
    }

    async getAll(count = 10, offset = 0): Promise<Album[]> {
        const albums = await this.albumModel.find().skip(offset).limit(count);
        return albums;
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(id).populate('tracks');
        return album;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const album = await this.albumModel.findById(id);
        const tracks = await this.trackModel.find({album: album.name});
        for (const track of tracks) {
            if (track.audio) {
                this.fileService.removeFile(track.audio);
            }
            await this.trackModel.findByIdAndDelete(track._id);
        }
        if (album.picture) {
            this.fileService.removeFile(album.picture);
        }
        await this.albumModel.findByIdAndDelete(id);
        return id;
    }
}
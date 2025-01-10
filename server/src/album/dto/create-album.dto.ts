import {CreateTrackDto} from "../../track/dto/create-track.dto";

export class CreateAlbumDto {
    readonly name: string;
    readonly author: string;
    readonly tracks: CreateTrackDto[];
}
export class CreateTrackDto {
    readonly name: string;
    readonly artist: string;
    readonly album: string;
    readonly text?: string;
}
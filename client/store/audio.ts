class AudioPlayer {
    private static instance: AudioPlayer;
    public audio: HTMLAudioElement;

    private constructor() {
        if (typeof window !== "undefined")
            this.audio = new Audio()
    }

    public static getInstance(): AudioPlayer {
        if (!AudioPlayer.instance) {
            AudioPlayer.instance = new AudioPlayer();
        }
        return AudioPlayer.instance
    }
}

export const audioPlayer = AudioPlayer.getInstance();
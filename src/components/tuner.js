import PitchFinder from "pitchfinder";

export default class Tuner {
    constructor(sampleRate = 22050, bufferSize = 2048) {
        this.sampleRate = sampleRate;
        this.bufferSize = bufferSize;
        this.pitchFinder = new PitchFinder.YIN({ sampleRate: this.sampleRate });
    }

    start(onNoteDetected) {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.analyser = this.audioContext.createAnalyser();
                this.microphone = this.audioContext.createMediaStreamSource(stream);
                this.microphone.connect(this.analyser);
                this.dataArray = new Float32Array(this.bufferSize);

                const detectPitch = () => {
                    this.analyser.getFloatTimeDomainData(this.dataArray);
                    const frequency = this.pitchFinder(this.dataArray);
                    if (frequency) {
                        const note = this.getNoteData(frequency);
                        onNoteDetected(note);
                    }
                    requestAnimationFrame(detectPitch);
                };
                detectPitch();
            })
            .catch((err) => console.error("Microphone access denied:", err));
    }

    getNoteData(frequency) {
        const A4 = 440;
        const noteIndex = Math.round(12 * Math.log2(frequency / A4)) + 69;
        const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        return {
            name: noteNames[noteIndex % 12],
            frequency,
            cents: this.getCents(frequency, noteIndex),
            octave: Math.floor(noteIndex / 12) - 1,
        };
    }

    getCents(frequency, noteIndex) {
        const standardFreq = 440 * Math.pow(2, (noteIndex - 69) / 12);
        return Math.floor((1200 * Math.log2(frequency / standardFreq)));
    }
}

import PitchFinder from "pitchfinder";

export default class Tuner {
    constructor(sampleRate = 44100, bufferSize = 8192) {
        this.sampleRate = sampleRate;
        this.bufferSize = bufferSize;
        this.pitchFinder = new PitchFinder.YIN({ sampleRate: this.sampleRate });
        this.lastFrequency = null;
        this.audioContext = null; // Added to keep track of the audio context
        this.microphone = null; // Added to keep track of the microphone source
        this.analyser = null; // Added to keep track of the analyser
        this.dataArray = null; // Added to keep track of the data array
        this.detectPitch = null; // Added to store the pitch detection function
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

                // Define the pitch detection function
                this.detectPitch = () => {
                    this.analyser.getFloatTimeDomainData(this.dataArray);
                    const frequency = this.pitchFinder(this.dataArray);

                    if (frequency && this.isStableFrequency(frequency)) {
                        const note = this.getNoteData(frequency);
                        onNoteDetected(note);
                    }
                    requestAnimationFrame(this.detectPitch);
                };

                // Start detecting pitch
                this.detectPitch();
            })
            .catch((err) => console.error("Microphone access denied:", err));
    }

    stop() {
        if (this.microphone) {
            this.microphone.disconnect();
            this.microphone = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        if (this.detectPitch) {
            cancelAnimationFrame(this.detectPitch);
            this.detectPitch = null;
        }
    }

    isStableFrequency(frequency) {
        if (!this.lastFrequency) {
            this.lastFrequency = frequency;
            return true;
        }
        const stabilityThreshold = 0.5; // More precise, smaller threshold
        const stable = Math.abs(this.lastFrequency - frequency) < stabilityThreshold;
        this.lastFrequency = frequency;
        return stable;
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
        return Math.floor(1200 * Math.log2(frequency / standardFreq));
    }
}

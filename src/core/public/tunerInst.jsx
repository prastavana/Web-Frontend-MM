import { useEffect, useState, useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import { GiGuitar } from "react-icons/gi";

const tuningFrequencies = {
    guitar: { E2: 82.41, A2: 110.00, D3: 146.83, G3: 196.00, B3: 246.94, E4: 329.63 },
    ukulele: { G4: 392.00, C4: 261.63, E4: 329.63, A4: 440.00 },
};

const TunerInst = () => {
    const [instrument, setInstrument] = useState("guitar");
    const [currentNote, setCurrentNote] = useState(null);
    const [deviation, setDeviation] = useState(0);
    const [isTuning, setIsTuning] = useState(false);
    const [currentString, setCurrentString] = useState(0); // Track the current string being tuned
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);

    useEffect(() => {
        return () => stopTuning();
    }, []);

    const startTuning = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Microphone access is not supported in this browser.");
            return;
        }

        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 8192; // Increase FFT size for better frequency resolution
        analyserRef.current.smoothingTimeConstant = 0.85; // Make smoothing less aggressive

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const microphone = audioContextRef.current.createMediaStreamSource(stream);
            microphone.connect(analyserRef.current);

            dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
            setIsTuning(true);
            detectPitch();
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopTuning = () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
            setIsTuning(false);
        }
    };

    const detectPitch = () => {
        const detect = () => {
            if (!isTuning) return;

            analyserRef.current.getByteFrequencyData(dataArrayRef.current);

            // Find the peak frequency (the strongest signal in the frequency bins)
            let maxVal = -1;
            let maxIndex = -1;
            for (let i = 0; i < dataArrayRef.current.length; i++) {
                if (dataArrayRef.current[i] > maxVal) {
                    maxVal = dataArrayRef.current[i];
                    maxIndex = i;
                }
            }

            // Convert the index of the peak frequency to the actual frequency
            const nyquist = audioContextRef.current.sampleRate / 2;
            const frequency = (maxIndex / dataArrayRef.current.length) * nyquist;

            let closestNote = findClosestNote(frequency);
            setCurrentNote(closestNote.note);
            setDeviation(((frequency - closestNote.freq) / closestNote.freq) * 100); // Deviation in percentage

            requestAnimationFrame(detect);
        };
        detect();
    };

    const findClosestNote = (freq) => {
        let notes = Object.entries(tuningFrequencies[instrument]);
        let closest = notes.reduce((prev, curr) =>
            Math.abs(curr[1] - freq) < Math.abs(prev[1] - freq) ? curr : prev
        );
        return { note: closest ? closest[0] : "Unknown", freq: closest[1] };
    };

    const handleStringChange = (direction) => {
        if (direction === 'next' && currentString < 5) {
            setCurrentString(currentString + 1);
        } else if (direction === 'prev' && currentString > 0) {
            setCurrentString(currentString - 1);
        }
    };

    const getTargetFrequency = () => {
        const strings = Object.keys(tuningFrequencies[instrument]);
        const targetNote = strings[currentString];
        return tuningFrequencies[instrument][targetNote];
    };

    const getDeviationColor = () => {
        if (Math.abs(deviation) < 5) {
            return 'bg-green-400'; // Close to target pitch
        } else if (Math.abs(deviation) < 15) {
            return 'bg-yellow-400'; // Moderate deviation
        } else {
            return 'bg-red-400'; // Far from target pitch
        }
    };

    const getDeviationPercentage = () => {
        const targetFreq = getTargetFrequency();
        const currentFreq = tuningFrequencies[instrument][currentNote] || 0;
        const deviation = Math.abs(currentFreq - targetFreq);
        return (deviation / targetFreq) * 100;
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{instrument.toUpperCase()} TUNER</h2>
            <select
                className="mb-4 p-2 border border-gray-300 rounded bg-gray-700 text-white"
                onChange={(e) => setInstrument(e.target.value)}
                value={instrument}
            >
                <option value="guitar">Guitar</option>
                <option value="ukulele">Ukulele</option>
            </select>
            <button
                className="px-4 py-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                onClick={isTuning ? stopTuning : startTuning}
            >
                {isTuning ? "Stop Tuning" : "Start Tuning"}
            </button>
            <div className="mb-4">
                <GiGuitar size={100} />
            </div>
            <h3 className="text-xl font-semibold">
                Current Note: {currentNote || "Waiting..."}
            </h3>
            <div className="text-lg font-semibold mb-4">
                Target Frequency: {getTargetFrequency().toFixed(2)} Hz
            </div>

            {/* Range Bar */}
            <div className="w-full bg-gray-600 h-6 rounded-full mt-4 relative">
                <div
                    className={`h-6 rounded-full ${getDeviationColor()} w-[${Math.min(Math.max(deviation, -100), 100)}%]`}
                    style={{ width: `${Math.abs(deviation)}%` }}
                ></div>
            </div>

            <div className="mt-4 text-lg font-semibold">
                Deviation: {deviation.toFixed(2)}%
            </div>

            <div className="mt-4 flex justify-around w-full">
                <button
                    className="px-4 py-2 bg-gray-500 text-white font-bold rounded"
                    onClick={() => handleStringChange('prev')}
                >
                    Previous String
                </button>
                <button
                    className="px-4 py-2 bg-gray-500 text-white font-bold rounded"
                    onClick={() => handleStringChange('next')}
                >
                    Next String
                </button>
            </div>
        </div>
    );
};

export default TunerInst;


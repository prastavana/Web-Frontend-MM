import  { useState, useEffect } from "react";
import Tuner from "../../components/tuner.js";  // Import tuner logic here
import Meter from "../../components/meter.jsx";
import Note from "../../components/note.jsx";

const TunerComponent = () => {
    const [note, setNote] = useState({ name: "A", octave: 4, frequency: 440, cents: 0 });

    useEffect(() => {
        const tuner = new Tuner();
        tuner.start(setNote);  // Start the tuner and update note state
    }, []);

    return (
        <div style={styles.container}>
            <Meter cents={note.cents} />
            <Note name={note.name} octave={note.octave} />
            <p style={styles.frequency}>{note.frequency.toFixed(1)} Hz</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    frequency: {
        fontSize: "28px",
        color: "#37474f",
    },
};

export default TunerComponent;

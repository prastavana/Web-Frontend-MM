import React from "react";

// eslint-disable-next-line react/prop-types
const Note = ({ name, octave }) => {
    return (
        <div style={styles.note}>
            <span style={styles.name}>{name[0]}</span>
            {/* eslint-disable-next-line react/prop-types */}
            {name.length > 1 && <span style={styles.sharp}>{name[1]}</span>}
            <span style={styles.octave}>{octave}</span>
        </div>
    );
};

const styles = {
    note: {
        fontSize: "64px",
        fontWeight: "bold",
        color: "#c62828",
        textAlign: "center",
    },
    sharp: {
        fontSize: "32px",
        verticalAlign: "super",
        marginLeft: "5px",
    },
    octave: {
        fontSize: "32px",
        marginLeft: "10px",
    },
};

export default Note;

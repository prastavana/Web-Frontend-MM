import React from "react";
import { useSelector } from "react-redux";

import Strings from "./strings";
import StringSelect from "./string-select";

const GuitarNeck = () => {
    const selected = useSelector((state) => state.selected);
    const tuning = useSelector((state) => state.tuning);
    const animatedKey = useSelector((state) => state.animated_key);

    return (
        <div className="col-sm-7">
            <div className="guitar-neck width">
                <div className="background">
                    <div className={"overlay " + tuning}>
                        <div className="box-style orange text-center">
                            Tuning the Guitar for <b><i>{selected}</i></b>
                        </div>
                    </div>

                    <div className="guitar-keys">
                        {[...Array(6)].map((_, i) => (
                            <img
                                src={require("../../assets/images/guitar-key.png")}
                                alt="Guitar Key"
                                key={i}
                                className={`${animatedKey} key-${i}`}
                            />
                        ))}
                    </div>

                    <Strings />
                </div>

                <StringSelect />
            </div>
        </div>
    );
};

export default GuitarNeck;

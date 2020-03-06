import React from "react";
import PulseLoader from "react-spinners/PulseLoader";


const Loader = () => {
    return (
        <div>
            <PulseLoader
                size={20}
                color={"#000"}
                loading={true}
            />
        </div>
    );
}

export default Loader;

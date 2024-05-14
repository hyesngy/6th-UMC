import React from "react";
import { SyncLoader } from "react-spinners";

const override = {
    display: "flex",
    margin: "0 auto",
    
};

const Spinner = ({ loading }) => {
    return (
        <div>
            <SyncLoader
                color="white"
                loading={loading}
                cssOverride={override}
                size={15}
            />

        </div>
    );
};

export default Spinner;
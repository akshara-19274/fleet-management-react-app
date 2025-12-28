import React from "react";
const FleetCard=React.memo(
    function FleetCard({fleet,onUpdateDriver,onToggleAvailability,onDelete}){
        const {id,regNo,category,driver,available,image}=fleet;
        return(
            <div className=" card fleet-card">
                <img src={image} alt="Vehicle" className="thumb" />
                <div className="fleet-info">
                    <p><strong>Reg No:</strong>{regNo}</p>
                    <p><strong>Category:</strong>{category}</p>
                    <p><strong>Driver:</strong>{driver}</p>
                    <p><strong>Status:</strong>{" "}
                    <span className={available? "ok" : "bad"}>
                        {available ? "Available" : "Unavailable"}
                    </span>
                    </p>
                </div>
                <div className="actions">
                    <button onClick={()=>onUpdateDriver(id)}>Update Driver</button>
                    <button onClick={()=>onToggleAvailability(id)}>
                        Change Availability
                    </button>
                    <button className="danger" onClick={()=>onDelete(id)}>Delete vehicle</button>
                </div>
            </div>
        );
    }
);
export default FleetCard;
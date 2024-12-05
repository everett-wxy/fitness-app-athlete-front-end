import React from "react";

const EquipmentAccess = ({ equipmentAccessSubmit, handleChange, formData }) => {
    return (
        <>
            <h1 className="text-4xl font-medium">
                What training equipments do you have access to?
            </h1>
            <form className="flex flex-col" onSubmit={equipmentAccessSubmit}>
                <div>
                    <input
                        type="radio"
                        name="accessToEquipmentLevel"
                        value="every equipment"
                        id="everyEquipment"
                        checked={
                            formData.accessToEquipmentLevel ===
                            "every equipment"
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="everyEquipment">Every Equipment</label>
                    <input
                        type="radio"
                        name="accessToEquipmentLevel"
                        value="basic equipment"
                        id="basicEquipment"
                        checked={
                            formData.accessToEquipmentLevel ===
                            "basic equipment"
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="basicEquipment">Basic Equipment</label>
                    <input
                        type="radio"
                        name="accessToEquipmentLevel"
                        value="no equipment"
                        id="noEquipment"
                        checked={
                            formData.accessToEquipmentLevel === "no equipment"
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="noEquipment">No Equipment</label>
                    <button
                        className="border border-black rounded-md p-1 my-2"
                        type="submit"
                    >
                        continue
                    </button>
                </div>
            </form>
        </>
    );
};

export default EquipmentAccess;

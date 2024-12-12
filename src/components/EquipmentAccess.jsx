import React from "react";

const EquipmentAccess = ({ equipmentAccessSubmit, handleChange, formData }) => {
    return (
        <>
            <h1 className="text-4xl font-semibold  mt-10">
                What training equipments do you have access to?
            </h1>
            <form
                className="flex flex-col space-y-4"
                onSubmit={equipmentAccessSubmit}
            >
                <div className="space-y-4">
                    <div className="flex items-center">
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
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label
                            htmlFor="everyEquipment"
                            className="ml-2 text-lg"
                        >
                            Every Equipment
                        </label>
                    </div>

                    <div className="flex items-center">
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
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label
                            htmlFor="basicEquipment"
                            className="ml-2 text-lg"
                        >
                            Basic Equipments
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="accessToEquipmentLevel"
                            value="no equipment"
                            id="noEquipment"
                            checked={
                                formData.accessToEquipmentLevel ===
                                "no equipment"
                            }
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label htmlFor="noEquipment" className="ml-2 text-lg">
                            No Equipment
                        </label>
                    </div>
                </div>

                <button
                    className="bg-custom-grey text-custom-off-white-two rounded-md p-1 hover:bg-custom-dark"
                    type="submit"
                >
                    continue
                </button>
            </form>
        </>
    );
};

export default EquipmentAccess;

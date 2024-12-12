import React from "react";

const BasicInfo = ({ basicInfoSubmit, handleChange, formData }) => {
    return (
        <>
            <h1 className="text-4xl font-semibold  mt-10">Lets get to know you</h1>
            <form
                className="flex flex-col space-y-4"
                onSubmit={basicInfoSubmit}
            >
                <label className="font-semibold" htmlFor="firstName">
                    First Name
                </label>
                <input
                    className=" rounded-md p-1 my-2"
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label className="font-semibold" htmlFor="firstName">
                    Last Name
                </label>
                <input
                    className=" rounded-md p-1 my-2"
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label className="font-semibold" htmlFor="dob">
                    Date of Birth
                </label>
                <input
                    className=" rounded-md p-1 my-2"
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />
                <label className="font-semibold" htmlFor="weight">
                    Weight (kg)
                </label>
                <input
                    className="rounded-md p-1 my-2"
                    id="weight"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                />
                <label className="font-semibold" htmlFor="height">
                    Height (cm)
                </label>
                <input
                    className="rounded-md p-1 my-2"
                    id="height"
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                />
                <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            id="male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label htmlFor="male" className="ml-2 text-lg">
                            Male
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            id="female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label htmlFor="female" className="ml-2 text-lg">
                            Female
                        </label>
                    </div>
                </div>

                <button
                    className="bg-custom-grey text-custom-off-white-two rounded-md p-1 hover:bg-custom-dark"
                    type="submit"
                >
                    Continue
                </button>
            </form>
        </>
    );
};

export default BasicInfo;

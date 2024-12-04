import React from "react";

const BasicInfo = ({ continueSubmit, handleChange, formData }) => {
    return (
        <>
            <h1 className="text-4xl font-medium">Lets get to know you</h1>
            <form className="flex flex-col" onSubmit={continueSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    className="border border-black rounded-md p-1 my-2"
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="firstName">Last Name</label>
                <input
                    className="border border-black rounded-md p-1 my-2"
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="dob">Date of Birth</label>
                <input
                    className="border border-black rounded-md p-1 my-2"
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />
                <label htmlFor="weight">Weight</label>
                <input
                    className="border border-black rounded-md p-1 my-2"
                    id="weight"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                />
                <label htmlFor="height">Height</label>
                <input
                    className="border border-black rounded-md p-1 my-2"
                    id="height"
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                />
                <div>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        id="male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        id="female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                    />
                    <label htmlFor="female">Female</label>
                </div>
                <button
                    className="border border-black rounded-md p-1 my-2"
                    type="submit"
                >
                    continue
                </button>
            </form>
        </>
    );
};

export default BasicInfo;

import React, { useState } from "react";
import SignUp from "./SignUp";
import BasicInfo from "./BasicInfo";
import useFetch from "../hooks/useFetch";

const AccountCreation = () => {
    const fetchData = useFetch();
    const [formData, setFormData] = useState({
        email: "everett@gmail.com",
        password: "Password123",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        height: "",
        weight: "",
    });

    const [validation, setValidation] = useState({
        passwordValidation: true,
        passwordConfirmation: "Password123",
        passwordMatch: true,
        emailValidation: true,
    });

    const registerNewUser = async (formData) => {
        const { ok, msg, data } = await fetchData(
            "/users/register",
            "POST",
            formData
        );

        if (ok) {
            const { status, message, token } = data;
            localStorage.setItem("token", token);
            alert("Signed up successfully");
        } else {
            console.error(msg);
            alert("signed up failed");
        }
    };

    const updateUser = async (formData) => {
        const { ok, msg } = await fetchData(
            "/update/user",
            "PATCH",
            formData,
            true // Pass `true` to include the authorization token automatically
        );

        if (ok) {
            alert("User details updated");
        } else {
            console.error(msg);
            alert("User details update failed");
        }
    };

    const createPhysicalMeasurement = async (formData) => {
        const { ok, msg } = await fetchData(
            "/update/measurement",
            "POST",
            formData,
            true
        );

        if (ok) {
            alert("physical measurement recorded");
        } else {
            console.error(msg);
            alert("physical measurement failed to record: ");
        }
    };

    const handleChange = (e) => {
        const { name: fieldName, value: fieldValue } = e.target;

        if (fieldName === "email") {
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: fieldValue,
            }));

            setValidation((prevData) => ({
                ...prevData,
                // && is used instead of || because all conditions needs to be true for email to be considered valid
                emailValidation:
                    fieldValue !== "" && // true if not empty
                    !fieldValue.includes(" ") && // true if no space included
                    fieldValue.includes("@"), // true if includes @
            }));
        }

        if (fieldName === "password") {
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: fieldValue,
            }));

            setValidation((prevData) => ({
                ...prevData,
                passwordValidation:
                    fieldValue !== "" &&
                    fieldValue.length > 6 &&
                    /[A-Z]/.test(fieldValue) &&
                    /[a-z]/.test(fieldValue) &&
                    /\d/.test(fieldValue),

                passwordMatch: fieldValue === validation.passwordConfirmation,
            }));
        }

        if (fieldName === "passwordConfirmation") {
            setValidation((prevData) => ({
                ...prevData,
                passwordConfirmation: fieldValue,
                passwordMatch: fieldValue === formData.password,
            }));
        }

        if (
            fieldName === "firstName" ||
            fieldName === "lastName" ||
            fieldName === "dob" ||
            fieldName === "gender" ||
            fieldName == "height" ||
            fieldName == "weight"
        ) {
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: fieldValue,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerNewUser(formData);
        console.log("User registered:", formData);
    };

    const continueSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        createPhysicalMeasurement(formData);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex-col w-6/12">
                <SignUp
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formData={formData}
                    validation={validation}
                />
                <BasicInfo
                    continueSubmit={continueSubmit}
                    handleChange={handleChange}
                    formData={formData}
                />
            </div>
        </div>
    );
};

export default AccountCreation;

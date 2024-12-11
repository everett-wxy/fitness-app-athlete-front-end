import React, { useState } from "react";
import SignUp from "./SignUp";
import BasicInfo from "./BasicInfo";
import useFetch from "../hooks/useFetch";
import TrainingPreferenceGoal from "./TrainingPreferenceGoal";
import FitnessLevel from "./FitnessLevel";
import AvailableTime from "./availableTime";
import EquipmentAccess from "./EquipmentAccess";
import { useNavigate } from "react-router-dom";


const AccountCreation = () => {
    const fetchData = useFetch();
    const [currentStep, setCurrentStep] = useState(6);
    const [formData, setFormData] = useState({
        email: "everett@gmail.com",
        password: "Password123",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        height: "",
        weight: "",
        trainingGoal: "",
        startingFitnessLevel: "",
        availableDaysToTrain: 0,
        availableTimetoTrain: 0,
        accessToEquipmentLevel: "",
    });
    const navigate = useNavigate();


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
            console.log("User registered");
            setCurrentStep(2);
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
            console.log("User details updated");
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
            console.log("physical measurement recorded");
        } else {
            console.error(msg);
            alert("physical measurement failed to record: ");
        }
    };

    const createTrainingPreference = async (formData) => {
        const { ok, msg } = await fetchData(
            "/update/preferences",
            "POST",
            formData,
            true
        );

        if (ok) {
            console.log("Training preference recorded: ");

            setCurrentStep((prevStep) => prevStep + 1);
        } else {
            console.error(msg);
            alert("physical preference failed to record: ");
        }
    };

    const createEquipmentAccess = async (formData) => {
        const { ok, msg } = await fetchData(
            "/update/accessToEquipments",
            "POST",
            formData,
            true
        );
        if (ok) {
            alert("Equipment access recorded");
        } else {
            console.error(msg);
            alert("Equipment access failed to record:");
        }
    };

    const generateWorkout = async () => {
        const { ok, msg, data } = await fetchData(
            "/workoutProgram/create",
            "POST",
            null,
            true
        );
    
        if (ok) {
            // If successful, alert the user and handle the workout data
            alert("Workout program generated");
            // updateWorkoutProgram(data.trainingProgram);
            navigate("/workoutProgram");
        } else {
            console.error(msg);
            alert("Workout program failed to generate");
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
            fieldName == "weight" ||
            fieldName == "trainingGoal" ||
            fieldName == "startingFitnessLevel" ||
            fieldName == "availableDaysToTrain" ||
            fieldName == "availableTimetoTrain" ||
            fieldName == "accessToEquipmentLevel"
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
    };

    const basicInfoSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        createPhysicalMeasurement(formData);
        setCurrentStep(3);
    };

    const trainingPreferenceSubmit = (e) => {
        e.preventDefault();
        createTrainingPreference(formData);
    };

    const equipmentAccessSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEquipmentAccess(formData); 
            await generateWorkout();                  
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const handleBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex-col w-6/12">
                {currentStep === 1 && (
                    <SignUp
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        formData={formData}
                        validation={validation}
                    />
                )}
                {currentStep === 2 && (
                    <BasicInfo
                        basicInfoSubmit={basicInfoSubmit}
                        handleChange={handleChange}
                        formData={formData}
                    />
                )}
                {currentStep === 3 && (
                    <TrainingPreferenceGoal
                        trainingPreferenceSubmit={trainingPreferenceSubmit}
                        handleChange={handleChange}
                        formData={formData}
                    />
                )}
                {currentStep === 4 && (
                    <FitnessLevel
                        trainingPreferenceSubmit={trainingPreferenceSubmit}
                        handleChange={handleChange}
                        formData={formData}
                    />
                )}
                {currentStep === 5 && (
                    <AvailableTime
                        trainingPreferenceSubmit={trainingPreferenceSubmit}
                        handleChange={handleChange}
                        formData={formData}
                    />
                )}
                {currentStep === 6 && (
                    <EquipmentAccess
                        equipmentAccessSubmit={equipmentAccessSubmit}
                        handleChange={handleChange}
                        formData={formData}
                    />
                )}
                {currentStep > 2 && (
                    <button
                        onClick={handleBack}
                        className="bg-gray-500 text-white p-2 rounded mt-4"
                    >
                        Back
                    </button>
                )}
            </div>
        </div>
    );
};

export default AccountCreation;

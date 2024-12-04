import React from "react";

const SignUp = ({ handleSubmit, handleChange, formData, validation }) => {
    return (
        <>
            <h1 className="text-4xl font-medium">Create an account</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    className="border border-black rounded-md p-1 my-2"
                    id="email"
                    type="text"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {!validation.emailValidation && formData.email ? (
                    <p className="text-red-500 text-xs">
                        Email format is invalid
                    </p>
                ) : (
                    <p></p>
                )}
                <label htmlFor="password">Password</label>
                <input
                    className="border border-black rounded-md p-1 my-2"
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {!validation.passwordValidation && formData.password ? (
                    <p className="text-red-500 text-xs">
                        Password must be at least 7 characters long and include
                        both uppercase and lowercase letters.
                    </p>
                ) : (
                    <p></p>
                )}
                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <input
                    className="border border-black rounded-md p-1 my-2"
                    id="passwordConfirmation"
                    type="password"
                    name="passwordConfirmation"
                    autoComplete="new-password"
                    value={validation.passwordConfirmation}
                    onChange={handleChange}
                />
                {validation.passwordConfirmation &&
                !validation.passwordMatch ? (
                    <p className="text-red-500 text-xs">Password mismatch</p>
                ) : (
                    <p></p>
                )}
                <button
                    className={`border border-black rounded-md p-1 my-2 ${
                        !(
                            validation.passwordConfirmation &&
                            formData.password &&
                            formData.email &&
                            validation.passwordMatch !== false &&
                            validation.passwordValidation !== "invalid"
                        )
                            ? "bg-gray-300 cursor-not-allowed text-gray-500"
                            : ""
                    }`}
                    type="submit"
                    disabled={
                        !formData.password ||
                        !formData.email ||
                        !validation.emailValidation ||
                        !validation.passwordConfirmation ||
                        !validation.passwordValidation ||
                        !validation.passwordMatch
                    }
                >
                    Sign up
                </button>
            </form>
        </>
    );
};

export default SignUp;

import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const fetchData = useFetch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const videoFiles = [
        { src: "6509537-uhd_3840_2160_30fps.mp4", start: 2, end: 10 },
        { src: "5319759-uhd_3840_2160_25fps.mp4", start: 1, end: 14 },
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null); // access and store a mutable reference to a DOM node

    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const decoded = decodeToken(token);
            const currentTime = Date.now() / 1000; // Current time in seconds
            return decoded.exp > currentTime; // Check if token is not expired
        } catch (error) {
            console.error("Invalid token:", error);
            return false;
        }
    };

    const [text, setText] = useState("");
    const fullText = "Greatness is not more unique to us than breathing.";
    const fullText2 = "We're all capable of it";


    useEffect(() => {
        let i = 0; // Track the index for the fullText
        let typingInterval;

        const startTyping = () => {
            typingInterval = setInterval(() => {
                if (i < fullText.length-1) {
                    setText((prev) => prev + fullText[i]); // Append the character
                    i++;
                } else {
                    clearInterval(typingInterval); // Stop typing once done
                    // No restart or loop, just stop at the end
                }
            }, 100); // Typing speed
        };

        startTyping(); // Start the typing effect

        return () => clearInterval(typingInterval); // Cleanup interval on component unmount
    }, []); // Empty dependency array ensures this effect runs once on mount


    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/planner");
        }
    }, [navigate]); // best practice to include

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    const login = async (email, password) => {
        const body = { email, password };
        const { ok, msg, data } = await fetchData("/users/login", "POST", body);

        if (ok) {
            const { accessToken } = data;
            localStorage.setItem("token", accessToken);
            alert("Logged in successfully");
            navigate("/planner");
        } else {
            console.error(msg);
            alert("Login failed");
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current; // access the video element
        if (!videoElement) return;

        // Set the initial video source and start time
        const { src, start } = videoFiles[currentVideoIndex];
        videoElement.src = src;
        videoElement.currentTime = start;

        const handleTimeUpdate = () => {
            const { end } = videoFiles[currentVideoIndex];
            if (videoElement.currentTime >= end) {
                playNextVideo();
            }
        };

        const playNextVideo = () => {
            setCurrentVideoIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % videoFiles.length; //ensure the index wraps around to the beginning when it reaches the end of the array
                const nextVideo = videoFiles[nextIndex];
                const videoElement = videoRef.current;

                // Set the new video source and start time
                videoElement.src = nextVideo.src;

                // Wait for the video to load before playing
                // Using onloadeddata ensures the currentTime is set only after the video is fully loaded, preventing playback issues.
                videoElement.onloadeddata = () => {
                    videoElement.currentTime = nextVideo.start;
                    videoElement.play(); // Play only after the video is ready
                };

                return nextIndex;
            });
        };

        //Continuously checks the playback time of the video
        videoElement.addEventListener("timeupdate", handleTimeUpdate);

        videoElement.play();

        // Cleanup and remove old event listener, prevent memory leaks (when the program allocates memory but fails to release it)
        return () => {
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [currentVideoIndex]);

    return (
        <div className="flex justify-center flex-grow">
            <div className="w-7/12 relative">
                <video
                    ref={videoRef}
                    className="object-cover object-center h-full w-full max-h-screen"
                    alt="workout video"
                    autoPlay
                    muted
                />
                <h1 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-white text-5xl font-semibold z-10">
                    {text}
                </h1>
            </div>

            <div className="flex-1 flex flex-col justify-center p-8 items-center">
                <h1 className="w-2/3 max-w-sm text-5xl font-semibold">
                    Welcome Back Athlete
                </h1>
                <form
                    className="w-2/3 max-w-sm flex flex-col mt-4 gap-5"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border border-gray-900 rounded"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 border border-gray-900 rounded"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        type="submit"
                    >
                        Login
                    </button>
                    <p>Don't have an account?</p>
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Sign up here
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;

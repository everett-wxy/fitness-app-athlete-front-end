import React, { useState, useEffect, useRef } from "react";

const AnimatedText = () => {
    const [text, setText] = useState(""); // State for rendering the text
    const textRef = useRef("");  // Ref for internal text management
    const lineOne = "Greatness is not more unique to us than breathing.";
    const lineTwo = "We're all capable of it.";

    const startTyping = (textToType, onComplete) => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < textToType.length) {
                textRef.current = textToType.slice(0, i + 1); // Update text in ref
                setText(textRef.current); // Trigger re-render to display new text
                i++;
            } else {
                clearInterval(typingInterval); // Stop typing
                onComplete(); // Trigger the next step
            }
        }, 80); // Typing speed
    };

    useEffect(() => {
        const typeSequence = () => {
            // Start typing lineOne
            startTyping(lineOne, () => {
                // Pause for 1 second before typing lineTwo
                const timeout = setTimeout(() => {
                    startTyping(lineTwo, () => {
                        // Pause for 3 seconds after lineTwo before restarting
                        setTimeout(() => {
                            setText(""); // Clear text before restarting
                            typeSequence(); // Restart the whole process
                        }, 4000); // 3-second pause after lineTwo
                    });
                }, 2000); // 1-second pause after lineOne
            });
        };

        typeSequence(); // Start the typing sequence

        // Cleanup on unmount
        return () => {
            setText(""); // Clear text on unmount
        };
    }, []); // Empty dependency array ensures this effect runs once on mount

    return (
        <div className=" w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-custom-off-white-two text-6xl font-semibold z-10">
            {text}  {/* Render the current text */}
        </div>
    );
};

export default AnimatedText;

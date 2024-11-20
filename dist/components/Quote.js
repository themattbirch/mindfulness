import { useState, useEffect } from 'react';
import { quotes } from '../data/quotes';
export default function Quote() {
    var _a = useState(quotes[0]), currentQuote = _a[0], setCurrentQuote = _a[1];
    var _b = useState(true), isVisible = _b[0], setIsVisible = _b[1];
    useEffect(function () {
        var interval = setInterval(function () {
            setIsVisible(false);
            setTimeout(function () {
                setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
                setIsVisible(true);
            }, 500);
        }, 300000); // Change quote every 5 minutes
        return function () { return clearInterval(interval); };
    }, []);
    return (React.createElement("div", { className: "mt-8 bg-blue-50 p-4 rounded-lg transition-opacity duration-500", style: { opacity: isVisible ? 1 : 0 } },
        React.createElement("p", { className: "text-center italic text-gray-800 font-serif" },
            "\"",
            currentQuote.text,
            "\""),
        React.createElement("p", { className: "text-center text-sm text-gray-600 mt-2" },
            "\u2014 ",
            currentQuote.author)));
}

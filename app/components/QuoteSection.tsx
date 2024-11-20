import React from 'react';

function QuoteSection({ quote }) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <p className="text-center italic text-gray-800 font-serif">&ldquo;{quote.text}&rdquo;</p>
      <p className="text-center text-sm text-gray-600 mt-2">— {quote.author}</p>
    </div>
  );
}

export default QuoteSection; 
import React from 'react';

function Loading({ mode = 0 }) {
    return (
        <div className={`${mode === 0 ? "h-screen" : "h-full"} w-full flex justify-center items-center`}>
            Loading...
        </div>
    );
}

export default Loading;
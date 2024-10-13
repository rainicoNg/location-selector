import React from "react";

export function FontAwesomeIcon({ className, ...props }: { className?: string }) {
    return <i className={`fa ${className}`} {...props}></i>
}
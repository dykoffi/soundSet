import React from "react";


interface IProps {
    title: string
    details: string
}

export default function Message({ title, details }: IProps) {
    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-600">{title}</h1>
            <span>{details}</span>
        </div>
    )
}
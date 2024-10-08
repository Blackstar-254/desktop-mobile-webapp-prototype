
import React, { InputHTMLAttributes } from "react";

export type InputElProps = {
    error_message?: string
    description?: string
    input_props: Record<string, any> & { name: string } & Partial<InputHTMLAttributes<any>>

}

export function InputEl({ error_message, input_props, description }: InputElProps) {

    return (
        <div className="mb-2 mx-2">

            {/* include validation with required or other standard HTML validation rules */}
            <div className="">
                <p className="text-xl capitalize">{input_props.name}</p>
                <input {...{ ...input_props, className: "rounded-md border-2 border-blue-200 p-2 w-full" }} />
            </div>
            {(description && true) && <span className="text-blue px-2 ml-1">{description}</span>}
            {/* errors will return when field validation fails  */}
            {(error_message && true) && <span className="text-red">{error_message}</span>}
        </div>
    )
}
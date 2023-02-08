import React from "react";
import "./TitleBox.css";
import { Button, Divider } from "@mui/material";

type ITitleBox = {
    title: string;
    children?: React.ReactNode;
    buttonText?: string;
    buttonAction?: () => void;
};

export default function TitleBox({
    title,
    buttonText,
    buttonAction,
    children,
}: ITitleBox) {
    return (
        <div className="titlebox">
            <div className="titlebox__header">
                <h1 className="titlebox__title">{title}</h1>
                {buttonText && (
                    <Button
                        variant="contained"
                        onClick={() => buttonAction && buttonAction()}
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
            <Divider />
            {children}
        </div>
    );
}

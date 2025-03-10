import React, { ChangeEvent, useRef, useState } from "react";
import { StyledInputContainer } from "./InputContainer";
import { StyledInputTitle } from "./InputTitle";
import { StyledInputElement } from "./StyledInputElement";
import { Eye, EyeOff } from "lucide-react";

interface InputWithLabelProps {
  type?: "password" | "text" | "email";
  title: string;
  placeholder: string;
  required?: boolean;
  error?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  id?: string;
}

const LabeledInput = ({
  title,
  placeholder,
  required = false,
  error,
  onBlur, 
  onChange,
  value, 
  name,
  id,
  type = "text",
}: InputWithLabelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);
  const [reveal, setReveal] = useState(false)

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClickButton = () => {
    setReveal(!reveal)
  };
  
  return (
    <StyledInputContainer
      className={`${error ? "error" : ""}`}
      onClick={handleClick}
    >
      <StyledInputTitle
        className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
      >
        {title}
      </StyledInputTitle>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <StyledInputElement
          type={reveal ? "text" : type}
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={onBlur ?? handleBlur}
          onChange={onChange}
          value={value}
          className={error ? "error" : ""}
          ref={inputRef}
        />
        {type === "password" ? 
        (reveal ? 
        <EyeOff onClick={handleClickButton} className="cursor-pointer w-6 h-6 text-black" /> : 
        <Eye onClick={handleClickButton} className="cursor-pointer w-6 h-6 text-black" />) 
        : null}
      </div>
    
    </StyledInputContainer>
  );
};

export default LabeledInput;

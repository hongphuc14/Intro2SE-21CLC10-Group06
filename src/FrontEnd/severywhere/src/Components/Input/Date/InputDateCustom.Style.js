import styled from "styled-components";

export const InputForm = styled.input`
    min-height: 2.5em;

    outline: none;
    border: none;
    font-weight: 500;
    border-radius: 0.5em;
    padding: 0 8px;
    border: 1px solid transparent;
    transition: all .3s ease;

    &:focus {
        outline: none;
    }

    &::placeholder {

    }
`;

export const TextError = styled.div`
    font-style: italic;
    font-size: 0.75em;
`;


export const ViewPassWord = styled.div`
    position: absolute;

    right: 0.8rem;
    top: 25%;

    cursor: pointer;
    user-select: none;
`;
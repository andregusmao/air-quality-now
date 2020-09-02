import styled from 'styled-components';

export const Root = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    width: 100vw;
    height: 6.4rem;
    background-color: #d2691e;
    font: 700 2.0rem Archivo;
    font-size: 2rem;
    color: #fff8dc;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 2rem 8rem 0rem 8rem;
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Label = styled.label`
    display: flex;
    font: 400 2.0rem Poppins;
    font-size: 1.2rem;
    color: #808080;
`;

export const City = styled.input`
    display: flex;
    font: 400 2.0rem Poppins;
    font-size: 1.2rem;
    color: #808080;
    border: solid 1px #a0a0a0;
    border-radius: 0.2rem;
    margin-top: 0.2rem;
    padding: 0.2rem;
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font: 400 2.0rem Poppins;
    font-size: 1.2rem;
    color: #fff;
    background-color: #ffa07a;
    border: solid 1px #ffa07a;
    text-decoration: none;
    padding: 0.4rem;
    margin-top: 0.8rem;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #d2691e;
        border: solid 1px #d2691e;
    }
`;

export const Result = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.8rem;
    font: 400 2.0rem Poppins;
    font-size: 1.2rem;
    color: #808080;
`;

export const Location = styled.span`
    font-weight: bold;
    font-style: italic;
    margin-left: 0.4rem;
`;

export const Quality = styled.span`
    color: #fff;
    padding: 0.4rem;
    border-radius: 0.4rem;
    font-weight: bold;
    margin-left: 0.8rem;
`;

export const Error = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.8rem;
    font: 400 2.0rem Poppins;
    font-size: 1.2rem;
    color: #dc143c;
`;

export const Map = styled.div`
    margin-top: 4rem;
`;
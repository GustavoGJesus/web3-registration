import styled from "styled-components"

export const Container = styled.div`
  font-family: "Poppins", sans-serif;
  text-align: center;
`;

export const Main = styled.div` 
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  gap: 10px;
`

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;


export const FormLabel = styled.label`
  font-size: 25px;
  display: flex;
  flex-direction: column;
  gap: 05px;
  margin-top: 20px;

  font-weight: 500;
`;

export const FormInput = styled.input`
  padding: 10px;
  width: 300px;
  height: 20px;

  border-radius: 10px;
  outline: none;
  border: none;

  font-weight: 600;
  font-size: 18px;
`;

export const Button = styled.input`
  border: none;
  padding: 10px;
  width: 200px;
  margin-top: 20px;

  font-weight: 600;
  font-size: 18px;

  border-radius: 20px;
  cursor: pointer;

`;
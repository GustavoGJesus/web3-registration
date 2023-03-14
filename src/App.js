import { useState } from 'react';

import { ethers } from 'ethers';

import ABI from "./abi.json";

import './styles.js';
import { Button, Container, ContainerForm, FormInput, FormLabel, Main } from './styles.js';

function App() {
  const [ customerId, setCustomerId ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ name, setName ] = useState("");
  const [ age, setAge ] = useState("");

  const CONTRACT_ADDRESS = "0xE9956c971B72aD74F249E616828df613F03E858b";

  const getProvider = async () => {
    // check if wallet in browser
    if(!window.ethereum) return setMessage("Not wallet found!");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // get permissions
    const accounts = await provider.send("eth_requestAccounts", []);
    if(!accounts || !accounts.length) return setMessage("Error autorized account");

    return provider;
  };

  const doSearch = async() => {
    //read contract
    try{
       const provider = await getProvider();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const customer = await contract.getCustomer(customerId);
      setMessage(JSON.stringify(customer));
    }catch(err){
      setMessage(err.message);
    }
  };

  const onSearchClick = () => {
    setMessage("");
    doSearch();
  };

  // writer contract
  const doSave = async () => {
    try{
      const provider = await getProvider();
      // autorization transaction ( signer )
      const signer = provider.getSigner();
  
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const contractSigner = contract.connect(signer);
  
      const tx = await contractSigner.addCustomer({ name, age });
      setMessage(JSON.stringify(tx))
    }catch(err){
      setMessage(err.message);
    }
  };

  const onSaveClick = () => {
    setMessage("");
    doSave();
  };

  return (
    <Container>
      <Main>
        <ContainerForm>
          <FormLabel>
            Name
            <FormInput
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormLabel>

          <FormLabel>
            Age
            <FormInput
              type="number"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </FormLabel>
        </ContainerForm>
        <Button type="button" value="Save" onClick={onSaveClick} />

        <div style={{marginTop: "50px"}}>
          <FormLabel>
            Customer id
            <FormInput
              type="number"
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
            />
          </FormLabel>
          <Button type="button" value="Search" onClick={onSearchClick} />
        </div>
        <p>{message}</p>
      </Main>
    </Container>
  );
}

export default App;

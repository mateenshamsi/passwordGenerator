import { useState, useCallback, useRef,useEffect } from "react";
import "./App.css";

function App() {
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password) 
  }, [
    password
  ]);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
    if(number) str+="0123456789"
    if(character) str+="!@#$%^&*()_+-={}[]"
    for (let i = 0; i < length; i++) {
      let ch = Math.floor(Math.random()*str.length+1) 
       pass = pass+str.charAt(ch)
      
      
    }
    setPassword(pass) 
  }, [character, number, length, setPassword]);

  useEffect(()=>{passwordGenerator()},[number,character,length,passwordGenerator]) 
  return (
    <div className="w-full max-w-md border shadow-md rounded-lg px-4 py-3 my-10 text-orange-200 bg-gray-800 ">
      <h3 className="text-4xl text-center my-3">Password generator</h3>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none text-center w-full py-1 px-3 my-2 text-blue-600 "
          placeholder="password"
          useref="copyPasswordToClipboard"
          readOnly
        />
        <button
          className="text-blue-400 px-3 py-0.5 shrink-0"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={50}
            name="length"
            id="length"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <label>Length: {length}</label>
        </div>
        <div className="text-sm flex gap-x-1"> 
          <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name=""
            id="numberInput"
            defaultChecked={number}
            onClick={(e) => {
              setNumber((prev) => !prev);
            }}
          />
          <label>Number</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name=""
            id="charcterInput"
            defaultChecked={character}
            onClick={(e) => {
              setCharacter((prev) => !prev);
            }}
          />
          <label>Character</label>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;

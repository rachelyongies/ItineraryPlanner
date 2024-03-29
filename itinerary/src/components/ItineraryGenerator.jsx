import { useState } from 'react'
import '../App.css'

export default function ItineraryGenerator() {

    const [step, setStep] = useState(1);

    const [userData, setUserData] = useState({
      country: "",
      adjective: "",
      period: ""
    });

    const [inputValue, setInputValue] = useState("");

    const [country, setCountry] = useState("");
    const [period, setPeriod] = useState("");
    const [adjective, setAdjective] = useState("");


    const [generatedItinerary, setGeneratedItinerary] = useState("");
    
    //insert your own API_KEY here 

    const API_KEY = ""

    function getNextStepQuestion () {
      switch (step) {
        case 1:
          return "Where are we going?";
        case 2:
          return "What kind of trip is it?";
        case 3:
          return "How long will you be staying? Please indicate measurement of time (weeks, months, days..?) ";
        default:
          return null;
      }
    };


    const handleChange = (event) => {
      const newValue = event.target.value;
      setInputValue(newValue);
      if (step===1) {
        setCountry(newValue)
      } else if (step===2) {
        setAdjective(newValue)
      } else {
        setPeriod(newValue)
      }
    };

    const handleUpdateUserData = () => {
      setUserData({
        country: country,
        adjective: adjective,
        period: period
      })
      setStep(prevStep => prevStep+1)
      setInputValue("")
    }

    async function itineraryGenerator () {

        const APIbody = {

            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": "Generate an itinerary for " + country + " suited for a " + adjective + " trip for a period of " + period + " in point form, separated by the day",
              },
            ],
            "temperature": 0.7,
            "max_tokens": 2048, //max number of tokens for gpt 3.5 turbo 
            "top_p": 1
          
        }
        await fetch("https://api.openai.com/v1/chat/completions",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY,
          },
          body: JSON.stringify(APIbody)
        }).then((data)=>{
          return data.json();
        }).then((data) => {
          console.log(data);
          setGeneratedItinerary(data.choices[0].message.content.trim());
        });
      }
    


   return ( 
   <> 
    {step <=3 ? (
      <div className="roboto-mono-1">
        <h4 color="primary">{getNextStepQuestion()}</h4>
        <textarea
        value={inputValue}
        onChange={(e)=>handleChange(e)}
        cols={50}
        rows={10}
        />
        <div>
        <button onClick={handleUpdateUserData}>Next</button>
        </div>
      </div>
    ):(
      <div className="roboto-mono-1">

      <p className="space-mono-regular">{generatedItinerary}</p>

      {(userData) ? <button onClick={itineraryGenerator}>Generate Itinerary</button> : null} 

    </div>
    )}
    </>
    
    )

}
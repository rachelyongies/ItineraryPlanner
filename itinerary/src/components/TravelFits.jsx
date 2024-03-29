import { useState } from 'react'
import '../App.css'

export default function TravelFits() {

    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
      country: "",
      adjective: "",
      period: ""
    });

    const [country, setCountry] = useState("");
    const [period, setPeriod] = useState("");
    const [adjective, setAdjective] = useState("");


    const [generatedItinerary, setGeneratedItinerary] = useState("");
    
    const API_KEY = '';

    function getNextStepQuestion () {
      switch (step) {
        case 1:
          return "Which country are you planning to visit? Include any specific cities";
        case 2:
          return "What kind of trip is it? (Solo, Adventurous, Sea activity, Family etc.)?";
        case 3:
          return "How long will you be staying? Please indicate measurement of time (weeks, months, days..?) ";
        default:
          return null;
      }
    };

    const handleChange = (event) => {
      const newValue = event.target.value;
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
    }

    async function itineraryGenerator () {

        // const { country, adjective, period } = userData;

        const APIbody = {

            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": "Generate an itinerary for " + country + " suited for a " + adjective + " trip for a period of " + period,
              },
            ],
            "temperature": 0.7,
            "max_tokens": 2000,
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
    <h4 className="space-mono-bold-italic">Work in progress...</h4>
    </>
    
    )

}
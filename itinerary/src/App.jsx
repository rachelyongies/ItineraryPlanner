import './App.css'
import ItineraryGenerator from './components/ItineraryGenerator'
import TravelFits from './components/TravelFits'
import { NextUIProvider } from '@nextui-org/react'
import { useState } from 'react'
import {Button} from '@nextui-org/button'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

// Background Credits: 
// Photo by <a href="https://unsplash.com/@emilianobar?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Emiliano Bar</a> on <a href="https://unsplash.com/photos/empire-state-building-kheTI8pIywU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
  
function App() {

  const [activeTabContent, setActiveTabContent] = useState(null);
  
  let tabs = [
    {
      key:"itineraryGenerator",
      title:"Create an itinerary",
      content: <ItineraryGenerator/>
    },
    {
      key:"fashionFits",
      title:"Get Inspired",
      content: <TravelFits/>
    },
  ]

  const handleTabClick = (item) => {
    setActiveTabContent(item.content);
  };

  return (
    <>
    <NextUIProvider>
      <div className='App'>
      <h2 className="space-mono-bold-italic">Travel Planner v1</h2>
      <h4 className="roboto-mono-1">Let's Start</h4>
    
      <Tabs aria-label="Dynamic tabs" items={tabs} color="primary" className="roboto-mono-1" >
        {(item)=> (
          <Tab key={item.id} title={item.title}color="purple-dark" onClick={handleTabClick}>
          <Card>
            <CardBody>
              {item.content}  
            </CardBody>
          </Card> 
        </Tab>
        )
        }
      </Tabs>

      </div>
    </NextUIProvider>
    </>
  )
}

export default App

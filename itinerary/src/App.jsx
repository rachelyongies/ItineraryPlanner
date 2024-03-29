import './App.css'
import ItineraryGenerator from './components/ItineraryGenerator'
import TravelFits from './components/TravelFits'
import { NextUIProvider } from '@nextui-org/react'
import { useState } from 'react'
import {Button} from '@nextui-org/button'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";


// Photo by <a href="https://unsplash.com/@neom?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">NEOM</a> on <a href="https://unsplash.com/photos/an-aerial-view-of-a-desert-with-rocks-and-sand-39n8YVSn0d4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
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
      <h4 className="roboto-mono-1" color="white">What should we do today?</h4>
    
      <Tabs aria-label="Dynamic tabs" items={tabs} color="primary" className="roboto-mono-1" >
        {(item)=> (
          <Tab key={item.id} title={item.title}color="purple-dark">
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

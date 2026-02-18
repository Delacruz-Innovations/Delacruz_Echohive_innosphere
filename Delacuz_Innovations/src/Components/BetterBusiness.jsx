import React from 'react'
import { useState, useEffect } from 'react'
const BetterBusiness = () => {
const [displayedTitle, setDisplayedTitle] = useState('');
const [displayedText, setDisplayedText] = useState('');
const [titleIndex, setTitleIndex] = useState(0);
const [textIndex, setTextIndex] = useState(0);
const [showCursor, setShowCursor] = useState('title');

const title = 'Making Business Better';
const fullText = `Innosphare Consulting FEZ LLC is Dubai based consultancy firm helping organisations transfom though technology, innovation, and stategic advisory.

Registerd under a wide range of technology, consultancy, and marketing activities, innosphere is uniquely positioned to act as a 360 degress partner for enterprrises, SMEs, and goverment organization in the UAE.

Our Multidiciplinary approach -- covering digital transformation, cyber security, marketing, management consulting, and software innovation -- ensure clients not only meet today's challenges but also align with Dubai D33, UAE AI Strategy 2031, and the Digital Government Strategy 2025`;

useEffect(() => {
  if (titleIndex < title.length) {
    const timeout = setTimeout(() => {
      setDisplayedTitle(prev => prev + title[titleIndex]);
      setTitleIndex(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timeout);
  } else if (textIndex < fullText.length) {
    setShowCursor('text');
    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + fullText[textIndex]);
      setTextIndex(prev => prev + 1);
    }, 20);
    return () => clearTimeout(timeout);
  } else {
    setShowCursor('none');
  }
}, [titleIndex, textIndex]);
  return (
    <>
    <div className='bg-gray-900 text-white py-4'>

    <div className='flex flex-col-reverse md:flex-row gap-8 justify-between items-center max-w-7xl mx-auto animate-fade-in'>
        <div className='flex-1 mx-2'>
            <img src="https://www.affilityconsulting.com/wp-content/uploads/2024/08/affility-business-strategy.jpg" alt="" />
        </div>
        <div className='flex-1 mx-2'>
         <h4 className='uppercase font-bold text-2xl md:text-4xl my-4 text-purple-300'>
  {displayedTitle}
  {showCursor === 'title' && <span className='animate-pulse'>|</span>}
</h4>


<p className='font-medium whitespace-pre-line'>
  {displayedText}
  {showCursor === 'text' && <span className='animate-pulse'>|</span>}
</p>

        </div>
    </div>
    </div>
    
    </>
  )
}

export default BetterBusiness
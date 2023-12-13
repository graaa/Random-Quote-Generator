
import './styles.css';
import React, { useState } from 'react';


function MainContent({ text }) {
  return <main>
    <i class="fa fa-quote-left"> </i><span id="text">{text}</span>
  </main>;
}

function App() {
  const url='';
  let quotes = [];
  const [isVisible, setIsVisible] = useState(true);
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe"
  });
  async function loadQuotes(){
    const response = await fetch("https://type.fit/api/quotes");
    quotes = await response.json();
  }
  
  const random = () => {
    const select = quotes[Math.floor(Math.random()*quotes.length)]
    setQuote(select);
  }
  
  const twitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote.text} - ${quote.author.split(',')[0]}`)}`);
  }
  
  loadQuotes();
  const fetchNewQuote = () => {
    // Fade out the quote
    setIsVisible(false);

    // After a timeout, fetch and set a new quote then fade in
    setTimeout(() => {
      // Fetch your new quote here and then:
      const select = quotes[Math.floor(Math.random()*quotes.length)]
      setQuote(select);
      setIsVisible(true);
    }, 500); // This duration should match the CSS transition-duration
  };
  
  return (
    <div class = 'mainDiv' id='quote-box'>
      <div id='quote-text' className={`quote-container ${isVisible ? 'visible' : 'hidden'}`}>
        <MainContent id='text' text={quote.text}/>
      </div>
      <p id='author' className={`quote-container ${isVisible ? 'visible' : 'hidden'}`}>-{quote.author.split(',')[0]}</p>
      <div id='buttons'>
        <a class="button" id="tweet-quote" title="Tweet this quote!" target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote.text} - ${quote.author.split(',')[0]}`)}`}>
        <i class="fa-brands fa-x-twitter"></i>
        </a>
        <button class="button" id="new-quote" onClick={fetchNewQuote}>New quote</button>
      </div>
    </div>
  );
}

export default App;

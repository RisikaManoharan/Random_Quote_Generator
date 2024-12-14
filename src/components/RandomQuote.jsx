import { useState, useEffect } from 'react'; 
import React from 'react';
import './RandomQuote.css';
import twitter_icon from './Assets/twitter.png';
import reload_icon from './Assets/refresh.jpeg';
import whatsapp_icon from './Assets/whatsapp.jpeg';

export const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe",
  });

  useEffect(() => {
    async function loadQuotes() {
      try {
        const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
        const data = await response.json();
        setQuotes(data.quotes);
        if (data.quotes.length > 0) {
          setQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)]);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    }
    loadQuotes();
  }, []);

  const random = () => {
    if (quotes.length === 0) return;
    const select = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(select);
  };

  const twitter = () => {
    const tweetText = encodeURIComponent(`${quote.quote} - ${quote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const whatsapp = () => {
    const whatsappText = encodeURIComponent(`${quote.quote} - ${quote.author}`);
    window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
  };

  return (
    <div className='container'>
      <div className="quote">{quote.quote}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">{quote.author}</div>
          <div className="icons">
            <img src={reload_icon} onClick={random} alt="Reload" />
            <img src={twitter_icon} onClick={twitter} alt="Tweet" />
            <img src={whatsapp_icon} onClick={whatsapp} alt="WhatsApp" />
          </div>
        </div>
      </div>
    </div>
  );
}



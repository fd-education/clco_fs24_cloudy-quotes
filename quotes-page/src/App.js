import './App.css';
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const url =
      'https://get-quotes-worker.fabian-diemand.workers.dev/api/rnd-quote';
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers,
    })
      .then((res) => {
        if (res.status != 200) {
          return;
        }

        return res.json();
      })
      .then((data) => {
        setQuote(data.quote);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [setQuote]);

  return quote ? (
    <div id="quote">
      <p>{quote.quote}</p>
      <p>
        <i>~ {quote.author}</i>
      </p>
    </div>
  ) : (
    <></>
  );
};

import React, { useEffect } from 'react';

const ThankYou = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Thank you for your time!</h1>
    </div>
  );
};

export default ThankYou;

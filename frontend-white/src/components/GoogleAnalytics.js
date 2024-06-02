import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize('G-2S6H1832M8');
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
};

export default GoogleAnalytics;

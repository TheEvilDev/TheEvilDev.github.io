import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';

const useLocationTracking = () => {
    useMemo(() => {
        const TRACKING_ID = 'G-G50L9676XM';
        ReactGA.initialize(TRACKING_ID);
    }, []);

    const location = useLocation();

    useEffect(() => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    }, [location]);

    return location;
};

export default useLocationTracking;
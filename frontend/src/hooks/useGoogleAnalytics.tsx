import ReactGA from 'react-ga'

const useGoogleAnalytics = () => {
    
    const trackButtonClick = (linkName: string): any => {
        ReactGA.event({
            category: 'Button Click',
            action: `Button clicked: ${linkName}`,
        });
    }

    return {
        trackButtonClick
    };
};
export default useGoogleAnalytics;
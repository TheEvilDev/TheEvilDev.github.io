import { useEffect, useMemo } from "react";
import ReadingTracker from '@/utilities/ReadingTracker';

const useReadTracker = () => {
    const readTracker = useMemo(() => new ReadingTracker(), []);

    useEffect(() => {
        return () => {
            readTracker.dispose();
        }
    }, [readTracker]);

    return {
        track: (article : string, element : Element, callback: (readTime : number, article : string) => void) => readTracker.track(article, element, callback),
        untrack: (article : string, element : Element) => readTracker.untrack(article, element)
    };
};

export default useReadTracker;
import IDisposable from './IDisposable';
import IntersectionTracker from './IntersectionTracker';

export default class ReadingTimer implements IDisposable {
    private visibilityTracker: IntersectionTracker;
    private visibilityTimers = new Map<string, Date>();

    constructor() {
        this.visibilityTracker = new IntersectionTracker();
    }

    public track(article : string, element : Element, callback: (readTime : number, article : string) => void) {
        this.visibilityTracker.track(element, (entry) => {
            if (entry.intersectionRatio > 0 && entry.intersectionRatio < 1) {
                this.startTimer(article);
            } else {
                const readTime = this.stopTimer(article);
                if (readTime !== null) {
                    callback(readTime, article);
                }
            }
        })
    }

    public untrack(article : string, element : Element) {
        this.visibilityTracker.untrack(element);
        this.visibilityTimers.delete(article);
    }

    public dispose() {
        this.visibilityTracker.dispose();
        this.visibilityTimers.clear();
    }

    private startTimer(article : string) {
        this.visibilityTimers.set(article, new Date());
    }

    private stopTimer(article : string) : number | null {
        const startTime = this.visibilityTimers.get(article);
        if (startTime) {
            const readTime = new Date().valueOf() - startTime.valueOf();
            this.visibilityTimers.delete(article);

            return readTime;
        }

        return null;
    }
};
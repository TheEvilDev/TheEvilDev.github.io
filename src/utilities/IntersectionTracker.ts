import IDisposable from './IDisposable';

export default class IntersectionTracker implements IDisposable {
    private callbackMap : Map<Element, (entry: IntersectionObserverEntry) => void> = new Map();
    private observer: IntersectionObserver;

    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target) {
                    const cb = this.callbackMap.get(entry.target);
                    cb && cb(entry);
                }
            });
        }, {
            threshold: [0, 0.8, 1]
        });
    }

    public track(element: Element, callback: (entry: IntersectionObserverEntry) => void) : IntersectionTracker {
        this.callbackMap.set(element, callback);
        this.observer.observe(element);
        return this;
    }

    public untrack(element?: Element) : IntersectionTracker {
        if (element) {
            this.observer.unobserve(element);
            this.callbackMap.delete(element);
        } 

        return this;
    }

    public dispose() {
        this.callbackMap.forEach((_value, e) => {
            this.observer.unobserve(e);
        });
        this.callbackMap.clear();
    }
}
import Box from '@/layouts/box-layout/box';
import { lazy, Suspense, useCallback } from 'react';
import Article from '@/components/article';
import ReactGA from 'react-ga';
import useReadTracker from '@/hooks/useReadTracker';

const LazyPosts = () => {
    const postModules = (require as any).context('./posts', true, /\.mdx$/, 'lazy');

    const { track } = useReadTracker();

    const trackReadTime = useCallback((r: Element | null, article : string) => {
        if (track && r) {
            track(article, r, (readTime : number) => {
                ReactGA.event({
                    action: article,
                    category: 'read-article',
                    value: readTime
                });
            });
        };
    }, [track]);

    const posts = postModules.keys().map((module : string) => {
        const Lazy = lazy(() => import(`!babel-loader!@mdx-js/loader!./posts/${module.replace('./','')}`).then(module => {
            const { Meta, default : MDXContent } = module;
            return { default: () => <Article meta={Meta} ref={(r) => trackReadTime(r, Meta.id)}><MDXContent /></Article> }
        }));

        return (
            <div key={module} className={'blog-post'}>
                <Suspense fallback={`Loading "${module}"...`}>
                    <Lazy />
                </Suspense>
            </div>
        )
    });

    return (<>{posts}</>)
}


const AboutMePage = () => {
    return (
        <Box header={'This is what I think about'} className={'blog'} route={'/about-me'} content={() => <LazyPosts />} />
    )
};

export default AboutMePage;
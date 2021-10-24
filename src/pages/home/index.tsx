import BoxLayout from '@/layouts/box-layout';
import Box from '@/layouts/box-layout/box';

import useLocationTracking from '@/hooks/useLocationTracking';
import Blog from '@/pages/blog';
import AboutMe from '@/pages/about-me';

const Home = () => {
    useLocationTracking();

    return (
        <BoxLayout>
            <AboutMe />
            <Box header={'These are my creations'} route={'/projects'} content={() => <>Projects</>} />
            <Blog />
            <Box header={'This is how you can connect with me'} route={'/connect'} content={() => <>Connect</>} />
        </BoxLayout>
    );
};

export default Home;
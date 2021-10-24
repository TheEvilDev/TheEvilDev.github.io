import { FC } from 'react';

import '@/styles/component.css';
import '@/styles/bootstrap-responsive.min.css';

interface BoxLayoutProps {

}

const BoxLayout : FC<BoxLayoutProps> = ({ children }) => {
    return (
        <div id="bl-main" className="bl-main">
            {children}
        </div>
    );
};

export default BoxLayout;
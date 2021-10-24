import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import './box.css';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    header: string,
    route: string,
    content: () => ReactElement
};

const Box : FC<BoxProps> = ({ header, route, content : Content, className : cssOverride = '', ...props }) => {
    const match = useRouteMatch(route);
    const history = useHistory();
    const [expanded, setExpanded] = useState(match?.isExact || false);

    useEffect(() => {
        setExpanded(!!match)
    }, [match]);

    const navigate = useCallback(() => {
        history.push(route);
    }, [history, route]);

    const className = `bl-content ${cssOverride}`.trim();

    return (
        <section className={expanded ? 'bl-expand bl-expand-top' : ''}>
            <div className="bl-box">
                <h2 onClick={() => navigate()}>{header}</h2>
            </div>
            <div className={className} {...props}>{!!match && <Content />}</div>
            <Link to={'/'}><span className='bl-icon bl-icon-close' /></Link>
        </section>
    )
}

export default Box;
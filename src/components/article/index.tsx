import { FC, forwardRef } from "react";

export interface ArticleMetadata {
    id: string,
    title: string
    tags: string
}

interface ArticleProps {
    meta: ArticleMetadata,
    ref?: React.Ref<HTMLDivElement>
}

const Article : FC<ArticleProps> = forwardRef(({ meta, children }, ref) => {
    return (
        <article ref={ref}>
            {meta && 
            <header><h1>{meta.title}</h1></header>}
            {children}
        </article>
    )
});

export default Article;
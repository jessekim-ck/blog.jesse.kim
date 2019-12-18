import React from "react";
import MathJax from "react-mathjax";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {darcula} from "react-syntax-highlighter/dist/esm/styles/hljs";


const MarkdownRenderer = props => {

    return (
        <MathJax.Provider>
            <ReactMarkdown
                source={props.source}
                plugins={[RemarkMathPlugin]}
                renderers={{
                    code: props => <SyntaxHighlighter language={props.language} style={darcula}>{props.value}</SyntaxHighlighter>,
                    math: props => <MathJax.Node formula={props.value}/>,
                    inlineMath: props => <MathJax.Node formula={props.value} inline/>,
                }}/>
        </MathJax.Provider>
    )
}

export default MarkdownRenderer

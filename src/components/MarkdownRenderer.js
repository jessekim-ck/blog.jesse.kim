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
                source={
                    props.source.replace(
                        // Replace "-->" to "$rightarrow$"
                        /-->/gi, "$\\rightarrow$"
                    ).replace(
                        // Detect empty lines
                        /^(\r\n|\n|\r|\s*)$/gm, "&nbsp;\n"
                    ).replace(
                        // Detect end of lines
                        /$/gm, "  "
                    )
                }
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

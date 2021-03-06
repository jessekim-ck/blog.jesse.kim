import React from "react";
import MathJax from "react-mathjax";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {darcula} from "react-syntax-highlighter/dist/esm/styles/hljs";


const ImageRenderer = props => {

    const [[alt], [width, height]] = props.alt.split("|").map(str => str.trim().split("x"));
    
    return (
        <center>
            <img src={props.src} alt={alt} width={width} height={height}/>
        </center>
    );
}


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
                    code: props => <SyntaxHighlighter language={props.language} style={darcula}>
                        {/* remove &nbsp; and following three spaces */}
                        {props.value.replace(/&nbsp;\s{3}/gi, "")}
                    </SyntaxHighlighter>,
                    math: props => <MathJax.Node formula={props.value}/>,
                    inlineMath: props => <MathJax.Node formula={props.value} inline/>,
                    image: props => ImageRenderer(props)
                }}/>
        </MathJax.Provider>
    );
}

export default MarkdownRenderer;

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const styleLink = (font_color, underline, hover_opacity) => styled(Link)`
    text-decoration: none;
    color: ${ font_color || 'black' };
    
    :hover {
        text-decoration: ${ underline ? 'underline' : 'none' };
        color: ${ font_color };
        opacity: ${ hover_opacity || 0.6 };
    }
`

class CustomLink extends React.Component {

    render() {
        const StyledLink = styleLink(this.props.color, this.props.underline, this.props.hover_opacity)

        return (
            <StyledLink {...this.props} />
        )
    }
}

export default CustomLink

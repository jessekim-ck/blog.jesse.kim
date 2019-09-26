import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const styleLink = (fontColor, underline, hover_opacity) => styled(Link)`
    text-decoration: none;
    color: ${ fontColor };
    
    :hover {
        text-decoration: ${ underline ? 'underline' : 'none' };
        color: ${ fontColor };
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
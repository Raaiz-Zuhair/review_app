import React from 'react'

const Header = ({heading, bg , txtClor}) => {

    const headerStyle = {
        backgroundColor: bg,
        color:txtClor
    }

  return (
    <>
    <header style={headerStyle}>
    <div className="container">
    <h1>{heading}</h1>
    </div>
    </header>
    </>
  )
}

export default Header
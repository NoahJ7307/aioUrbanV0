import React from 'react'
import MenuComponent from '../components/menu/MenuComponent'

const BasicLayout = ({ children }) => {
    return (
        <>
            <MenuComponent />
            <div className=''>
                {children}
            </div>
        </>
    )
}

export default BasicLayout
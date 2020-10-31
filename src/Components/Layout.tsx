import React from 'react';
import Header from './Header';
const Layout = (props:{children:React.ReactNode})=>{
    return <>
        { <Header  />}
        <div
          style={{
            margin: `1.25rem auto`,
            padding: `0px 1.9875rem `,
            paddingTop: 0,
          }}
        >
            <main>
                {props.children}
            </main>
        </div>
    </>
}
export default Layout;
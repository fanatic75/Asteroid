import React from 'react';
import Header from './Header';
const Layout = (props:{searchID?:string,setSearchID?:React.Dispatch<React.SetStateAction<string>>,children:React.ReactNode})=>{
    return <>
        { <Header searchID={props.searchID} setSearchID={props.setSearchID} />}
       
            <main>
                {props.children}
            </main>
        
    </>
}
export default Layout;
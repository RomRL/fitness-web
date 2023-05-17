import React from "react";
import NavigationBar from '..//componenets/NavigationBar.jsx';
function MainLayout(props){
    const {children} = props;
    const {logged_in} = props;
    console.log(props);
    return( 
    <div className="App">
        <NavigationBar logged_in={logged_in} > </NavigationBar>
        <header className="App-header">
        <div>{children}</div>
        </header>
    </div>
    ) 
    
}
export default MainLayout;
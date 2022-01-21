import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "Hello webpack",
        };
    }

    render() {
        // console.log(11)
        return (
            <div>
                <h2>{this.state.message}</h2>
            </div>
        );
    }
}


export default App
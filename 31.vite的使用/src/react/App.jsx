import React, { Component } from "react";

export default class ReactApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "Hello React",
        };
    }

    render() {
        return (
            <div>
                <h2>{this.state.message}</h2>
            </div>
        );
    }
}

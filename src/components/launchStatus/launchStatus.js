import React, { Component } from 'react';
import './launchStatus.scss';

let kaleidoStatus = "Creating Kaleido Platform";
let contractStatus = "Deploying Solidity Contract";
let readyStatus = "Ready";

class LaunchStatus extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.status === "") {
            return (
                <div className="status-wrapper">
                    <div className="kaleido-loading" />
                    <div className="contract-loading" />
                    <div className="status-loading" />
                </div>
            );
        } else {
            var kaleidoClass = "";
            var contractClass = "";
            var statusClass = "";

            if (this.props.status === kaleidoStatus) {
                kaleidoClass += "kaleido-loading active-loading";
                contractClass += "contract-loading";
                statusClass += "status-loading";
            } else if (this.props.status === contractStatus) {
                kaleidoClass += "kaleido-ready";
                contractClass += "contract-loading active-loading";
                statusClass += "status-loading";
            } else {
                kaleidoClass += "kaleido-ready";
                contractClass += "contract-ready";
                statusClass += "status-ready";
            }


            return (
                <div className="status-wrapper">
                    <div className={kaleidoClass} />
                    <div className={contractClass} />
                    <div className={statusClass} />
                </div>
            );
        }
    }
}

export default LaunchStatus;

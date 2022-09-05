import React, {Component} from "react";


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Default Content"
        }
      }
     
      updateContent = () => {
          this.setState({ message: "Updated Content!"});
      }
     
      render() {
        return (
          <div>
            <div className="h1 bg-secondary text-white text-center p-2">
              { this.state.message }
            </div>
            <div className="text-center">
              <button className="btn btn-secondary" onClick={this.updateContent}>
                Click Me
              </button>
            </div>
          </div>
        );
      }
    }

export default Welcome
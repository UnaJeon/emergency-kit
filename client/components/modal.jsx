import React from 'react';

export default class Modal extends React.Component {

  render() {
    return (
      <div className={`modal ${this.props.show}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center bg-light" style={{ color: 'red' }}>
              <h5 className="modal-title">Welcome to Emergency Kit!</h5>

            </div>
            <div className="modal-body">
              <p className="p-3">Please note that this website is created for the purpose of demonstration. Click the below button to
                 acknowledge that the merchandise shown here is not available for purchase and you will not provide personal information,
                and that you are aware no purchase will truly be processed.</p>
            </div>
            <div className="modal-footer d-flex justify-content-center bg-light">
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.hide}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

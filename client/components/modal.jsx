import React from 'react';

export default class Modal extends React.Component {

  render() {
    return (
      <div className={`modal ${this.props.show}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Emergency Kit</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
              <span aria-hidden="true">&times;</span>
            </div>
            <div className="modal-body">
              <p>Please note that this website is a content management application created for the purpose of demonstration. Please
                 acknowledge that the merchandise shown here is not available for purchase, that you will not provide genuine financial or personal information,
                and that you are aware no purchase will truly be processed.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.hide}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

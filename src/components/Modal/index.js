import { Component } from 'react';

class Modal extends Component {
  render() {
    const { isOpen, onClose } = this.props;

    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <table>
                <tr>
                    <th>Sequence</th>
                    <th>Customer Number</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                </tr>
                <tr>
                    <td>
                        <input type='checkBox' />
                    </td>
                    <td>552142141</td>
                    <td>SK Groceries And Traders</td>
                    <td>SK Groceries And Traders</td>
                </tr>
            </table>

        </div>
      </div>
    );
  }
}

export default Modal;

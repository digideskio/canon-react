import { Component, PropTypes } from 'react';

class ListTableRow extends Component {
  render() {
    return (
      <tr { ...this.props }>{ this._cloneChildren() }</tr>
    );
  }

  _cloneChildren() {
    const { children, instance } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { instance });
    });
  }
}

ListTableRow.propTypes = {
  instance: PropTypes.object
};

export default ListTableRow;

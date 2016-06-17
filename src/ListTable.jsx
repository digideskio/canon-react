import { Component, PropTypes } from 'react';
import ListTableOverlaySelector from './ListTableOverlaySelector';
import OverlayStatus from './OverlayStatus';

class ListTable extends Component {
  render() {
    const {
      children,
      emptyOverlay,
      errorOverlay,
      loadingOverlay,
      overlayStatus
    } = this.props;

    return (
      <div { ...this.props } >
        <table className="rs-list-table">
          { children }
        </table>
        <ListTableOverlaySelector { ...{overlayStatus, emptyOverlay, errorOverlay, loadingOverlay} } />
      </div>
    );
  }
}

ListTable.defaultProps = {
  overlayStatus: OverlayStatus.NONE
};

ListTable.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  emptyOverlay: PropTypes.node,
  errorOverlay: PropTypes.node,
  loadingOverlay: PropTypes.node,
  overlayStatus: PropTypes.oneOf(Object.keys(OverlayStatus))
};

export default ListTable;

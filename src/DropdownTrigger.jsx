import React from 'react';
import ReactDOM from 'react-dom';
import Tether from 'tether';

class DropdownTrigger extends React.Component {
  constructor(props) {
    super(props);

    this._documentClickHandler = this._handleDocumentClick.bind(this);
    this._escapeHandler = this._handleEscapePress.bind(this);

    this.state = {
      isDropdownDisplayed: false
    };
  }

  render() {
    let props;

    props = {
      onClick: this._onTriggerClick.bind(this)
    };

    return (
      React.cloneElement(
        React.Children.only(this.props.children),
        props
      )
    );
  }

  componentWillUnmount() {
    this._unrenderDropdown();
    document.body.removeChild(this._containerDiv);
  }

  componentDidMount() {
    this._containerDiv = document.createElement('div');
    this._containerDiv.className = 'dropdown-container';
    document.body.appendChild(this._containerDiv);
  }

  _onTriggerClick() {
    if (this.state.isDropdownDisplayed) {
      this._hide();
    } else {
      this._show();
    }
  }

  _hide() {
    this._unrenderDropdown();
    this.setState({ isDropdownDisplayed: false });
  }

  _unrenderDropdown() {
    this._removeDocumentListeners();
    if (this._tether) {
      this._tether.destroy();
      this._tether = null;
    }
    if (this._dropdownNode) {
      ReactDOM.unmountComponentAtNode(this._containerDiv);
      this._dropdownNode = null;
    }
  }

  _removeDocumentListeners() {
    document.removeEventListener('click', this._documentClickHandler, false);
    document.removeEventListener('keyup', this._escapeHandler, false);
  }

  _show() {
    this._renderDropdown();
    this._listenToRootCloseEvents();
    this.setState({ isDropdownDisplayed: true });
    this._tether.position();
  }

  _renderDropdown() {
    let dropdown;

    dropdown = React.cloneElement(
      this.props.dropdown,
      {
        hideCallback: this._hide.bind(this),
        tether: this.props.alignment
      }
    );

    this._dropdownNode = ReactDOM.unstable_renderSubtreeIntoContainer(this, dropdown, this._containerDiv);
    this._tether = this._createTether(this._getTetherConfig());
  }

  // This is a seam for testing
  _createTether(tetherConfig) {
    return new Tether(tetherConfig);
  }

  _getTetherConfig() {
    let tetherConfig;

    tetherConfig = {
      attachment: `top ${this.props.alignment}`,
      targetAttachment: `bottom ${this.props.alignment}`
    };

    tetherConfig.element = ReactDOM.findDOMNode(this._containerDiv);
    tetherConfig.target = ReactDOM.findDOMNode(this);

    return tetherConfig;
  }

  _listenToRootCloseEvents() {
    this._listenToClicksOutsideOfDropdown();
    this._listenToEscape();
  }

  _listenToClicksOutsideOfDropdown() {
    document.addEventListener('click', this._documentClickHandler, false);
  }

  _handleDocumentClick(e) {
    if (ReactDOM.findDOMNode(this._dropdownNode).contains(e.target)) {
      return;
    }
    this._hide();
  }

  _listenToEscape() {
    document.addEventListener('keyup', this._escapeHandler, false);
  }

  _handleEscapePress(e) {
    if (e.keyCode === 27) {
      this._hide();
    }
  }
}

DropdownTrigger.propTypes = {
  dropdown: React.PropTypes.element,
  alignment: React.PropTypes.oneOf(['left', 'right'])
};

DropdownTrigger.defaultProps = {
  alignment: 'left'
};

export default DropdownTrigger;

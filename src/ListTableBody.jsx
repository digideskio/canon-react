import { Component, PropTypes } from 'react';

class ListTableBody extends Component {
  constructor() {
    super();

    this._cloneRow = this._cloneRow.bind(this);
  }

  render() {
    return (
      <tbody>
        { this._cloneRowPerInstance() }
      </tbody>
    );
  }

  _cloneRowPerInstance() {
    return this.props.collection.map(this._cloneRow);
  }

  _cloneRow(instance) {
    return React.cloneElement(this.props.children, {
      instance: instance,
      key: this.props.keyGenerator(instance)
    });
  }
}

ListTableBody.defaultProps = {
  keyGenerator: (instance) => (instance.id)
};

ListTableBody.propTypes = {
  children: PropTypes.element.isRequired,
  collection: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyGenerator: PropTypes.func
};

export default ListTableBody;

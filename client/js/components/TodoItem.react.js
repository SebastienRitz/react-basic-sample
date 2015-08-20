import React from 'react';
import TodoActions from '../actions/TodoActions';

export default class TodoItem extends React.Component {

  propTypes: {
    todo: ReactPropTypes.object.isRequired
  }

  constructor(props) {

    super(props);

    this.state = {
      isEditing: false
    };

    this.onDoubleClick = ::this.onDoubleClick;
    this.onSave = ::this.onSave;

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {

    let todoObj = this.props
    ;
    var edit;

    if(this.state.isEditing){
      edit = <div><button onClick={this.onSave}>CLICK ME</button></div>
    }

    return (
      <li>
        <label onDoubleClick={this.onDoubleClick}>
          {todoObj.text}
        </label>
        {edit}
      </li>
    );
  }

  onDoubleClick () {
    this.setState({isEditing: true});
  }

  onSave () {
    TodoActions.create('textfromtodo');
    this.setState({isEditing: false});
  }

  _onChange() {

  }

};

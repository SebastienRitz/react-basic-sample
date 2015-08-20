import TodoConstants from '../constants/TodoConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class TodoActions {

  constructor() {

  }

  create(text) {
    AppDispatcher
      .dispatch({
        actionType: TodoConstants.TODO_CREATE,
        text: text
      });
  }

};

export default new TodoActions;

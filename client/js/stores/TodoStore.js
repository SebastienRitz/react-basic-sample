import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import TodoConstants from '../constants/TodoConstants';

class TodoStore extends EventEmitter {

  constructor() {
    super();

    // Initial model
    this.todos = {
      'toto': {
        'id': 'toto',
        'complete' : false,
        'text' : 'todo1'
      }
    };

    // Bind context
    this.interceptEvent = ::this.interceptEvent;
    this.create = ::this.create;

    // Register store to listen to dispatcher events
    AppDispatcher
      .register(this.interceptEvent);
  }

  interceptEvent (action) {

    var text;

    switch (action.actionType) {

    case TodoConstants.TODO_CREATE:

      text = action.text.trim();

      if (text !== '') {
        this.create(text);
        this.emitChange();
      }

      break;

    default:
      // no op
    }
  }

  create(text) {
    
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    this.todos[id] = {
      id: id,
      complete: false,
      text: text
    };

  }

  getAll() {
    return this.todos;
  }

  emitChange() {
    this.emit(TodoConstants.CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(TodoConstants.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(TodoConstants.CHANGE_EVENT, callback);
  }
}

export default new TodoStore;

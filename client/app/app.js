import React from 'react';
import TodoApp from './components/TodoApp.react';

(function(){

  React.render(
    <TodoApp />,
    document.getElementById('todoapp')
  );

})();

import React, { useState } from 'react';
import { Button, Checkbox, Drawer, Dropdown, Menu, message, Pagination } from 'antd';

import CustomScrollbars from '../../../util/CustomScrollbars';
import filters from './data/filters';
import options from './data/options';
import todoConversation from './data/todoConversation';
import ToDoList from '../../../components/todo/ToDoList';
import ToDoDetail from '../../../components/todo/ToDoDetail';
import AppModuleHeader from '../../../components/AppModuleHeader';
import IntlMessages from '../../../util/IntlMessages';
import CircularProgress from '../../../components/CircularProgress';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import GET_TODO_INITIAL_DATA from '../../../graphql/get-todo-initial-data.graphql';
import GET_TODOS from '../../../graphql/get-todos.graphql';
import { ITodoItem, ITodoLabel } from '@nx-taskman/interfaces';
import { PagingInfo, IPaginatedResponse } from '@nx-taskman/logics';

const ITEM_HEIGHT = 34;

interface State {
  searchTodo: string;
  alertMessage: string;
  loader: boolean;
  showMessage: boolean;
  drawerState: boolean;
  optionName: string;
  anchorEl;
  allTodos: ITodoItem[];
  currentTodo;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  selectedToDos: number;
  labelMenuState: boolean;
  optionMenuState: boolean;
  todos: ITodoItem[];
  filter: number;
  todoConversation;
  conversation;
  addTodo?: boolean;
  selectedSectionId?;
  labels: ITodoLabel[];
  paging: PagingInfo;
}

const defaultState: State = {
  searchTodo: '',
  alertMessage: '',
  loader: false,
  showMessage: false,
  drawerState: false,
  optionName: 'None',
  anchorEl: null,
  allTodos: [],
  currentTodo: null,
  user: {
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    avatar: 'https://via.placeholder.com/150x150',
  },
  selectedToDos: 0,
  labelMenuState: false,
  optionMenuState: false,
  todos: [],
  filter: -1,
  todoConversation,
  conversation: null,
  labels: [],
  paging: {page: 1, itemCount: 10, totalItems: 0, pageCount: 0},
};

interface TodoInitialData {
  getTodos: IPaginatedResponse<ITodoItem>; 
  getTodoLabels: ITodoLabel[];
}

const ToDo: React.FC = () => {

  const [state, setState] = useState(defaultState);
  
  // todo 목록 1페이지 가져오기
  const { data, loading, error,} = useQuery<TodoInitialData>(GET_TODO_INITIAL_DATA, {
    variables: {paging: {page: 1, itemCount: state.paging.itemCount}},
    onCompleted(data) {
      console.log('useQuery(GET_TODO_INITIAL_DATA) data = ', data);
      const {getTodos, getTodoLabels} = data;
      setState({
        ...state,
        todos: getTodos.items,
        labels: getTodoLabels,
        paging: getTodos.paging,
      });
    },
    onError(error) {
      console.log('useQuery(GET_TODO_INITIAL_DATA) error = ', error);
    },
  });

  // 특정 페이지로 점프하기 위한 graphql 함수 준비
  const [getTodos] = useLazyQuery(GET_TODOS, {
    onCompleted(data) {
      console.log('useQuery(GET_TODOs) data = ', data);
      const {getTodos} = data;
      setState({
        ...state,
        todos: getTodos.items,
        paging: getTodos.paging,
      });
    },
    onError(e) {
      console.log('get todos error', e);
    },
    ssr: false,
    fetchPolicy: 'no-cache', // 이 옵션이 없으면 처음 호출에 생성된 캐시 때문에 두 번쨰 이후부터는 호출되지 않는 문제가 발생함
  });


  const onOptionMenuItemSelect = e => {
    handleRequestClose();
    switch (e.key) {
      case 'All':
        getAllTodo();
        break;

      case 'None':
        getUnselectedAllTodo();
        break;

      case 'Starred':
        getStarredToDo();
        break;

      case 'Unstarred':
        getUnStarredTodo();
        break;

      case 'Important':
        getImportantToDo();
        break;

      case 'Unimportant':
        getUnimportantToDo();
        break;

      default:
        return '';
    }
  };

  const getAllTodo = () => {
    const todos = state.allTodos.map(todo =>
      todo ? { ...todo, selected: true } : todo,
    );
    setState({
      ...state,
      selectedToDos: todos.length,
      allTodos: todos,
      optionName: 'All',
      todos: todos,
    });
  };

  const getUnselectedAllTodo = () => {
    const todos = state.allTodos.map(todo =>
      todo ? { ...todo, selected: false } : todo,
    );
    setState({
      ...state,
      selectedToDos: 0,
      allTodos: todos,
      optionName: 'None',
      todos: todos,
    });
  };

  const getStarredToDo = () => {
    let selectedToDos = 0;
    const todos = state.allTodos.map(todo => {
      if (todo.starred) {
        selectedToDos++;
        return { ...todo, selected: true };
      }
      return { ...todo, selected: false };
    });
    setState({
      ...state,
      selectedToDos: selectedToDos,
      allTodos: todos,
      todos: todos.filter(todo => !todo.deleted),
    });
    return todos;
  };

  const getUnStarredTodo = () => {
    let selectedToDos = 0;
    const todos = state.allTodos.map(todo => {
      if (!todo.starred) {
        selectedToDos++;
        return { ...todo, selected: true };
      }
      return { ...todo, selected: false };
    });
    setState({
      ...state,
      selectedToDos: selectedToDos,
      allTodos: todos,
      optionName: 'Unstarred',
      todos: todos.filter(todo => !todo.deleted),
    });
    return todos;
  };

  const getImportantToDo = () => {
    let selectedToDos = 0;
    const todos = state.allTodos.map(todo => {
      if (todo.important) {
        selectedToDos++;
        return { ...todo, selected: true };
      }
      return { ...todo, selected: false };
    });
    setState({
      ...state,
      selectedToDos: selectedToDos,
      allTodos: todos,
      optionName: 'Important',
      todos: todos.filter(todo => !todo.deleted),
    });
    return todos;
  };

  const getUnimportantToDo = () => {
    let selectedToDos = 0;
    const todos = state.allTodos.map(todo => {
      if (!todo.important) {
        selectedToDos++;
        return { ...todo, selected: true };
      }
      return { ...todo, selected: false };
    });
    setState({
      ...state,
      selectedToDos: selectedToDos,
      allTodos: todos,
      optionName: 'Unimportant',
      todos: todos.filter(todo => !todo.deleted),
    });
    return todos;
  };

  const onLabelMenuItemSelect = e => {
    const label = e.key;
    handleRequestClose();
    const todos = state.allTodos.map(todo => {
      if (todo.selected) {
        if (todo.labels.includes(label.id)) {
          return { ...todo, labels: removeLabel(todo, label.id) };
        } else {
          return { ...todo, labels: addLabel(todo, label.id) };
        }
      } else {
        return todo;
      }
    });
    setState({
      ...state,
      alertMessage: 'Label Updated Successfully',
      showMessage: true,
      allTodos: todos,
      todos: todos,
    });
  };

  const handleRequestClose = () => {
    setState({
      ...state,
      showMessage: false,
      addTodo: false,
      labelMenuState: false,
      optionMenuState: false,
    });
  };

  const onLabelUpdate = (data, label) => {
    if (data.labels.includes(label.id)) {
      data.labels = removeLabel(data, label.id);
    } else {
      data.labels = addLabel(data, label.id);
    }

    handleRequestClose();
    const todos = state.allTodos.map(todo => {
      if (todo.id === data.id) {
        return data;
      } else {
        return todo;
      }
    });
    setState({
      ...state,
      alertMessage: 'Label Updated Successfully',
      showMessage: true,
      currentTodo: data,
      allTodos: todos,
      todos: todos,
    });
  };

  const onMarkAsStart = data => {
    const todos = state.allTodos.map(todo => {
      if (todo.id === data.id) {
        return data;
      } else {
        return todo;
      }
    });
    setState({
      ...state,
      alertMessage: 'ToDo Updated Successfully',
      showMessage: true,
      allTodos: todos,
      todos: todos,
    });
  };

  const onToDoUpdate = data => {
    handleRequestClose();
    const todos = state.allTodos.map(todo => {
      if (todo.id === data.id) {
        return data;
      } else {
        return todo;
      }
    });
    setState({
      ...state,
      alertMessage: 'ToDo Updated Successfully',
      showMessage: true,
      currentTodo: data,
      allTodos: todos,
      todos: todos,
    });
  };

  const onDeleteToDo = data => {
    let selectedToDos = 0;
    const todos = state.allTodos.map(todo => {
      if (todo.selected) {
        selectedToDos++;
      }

      if (data.id === todo.id) {
        if (todo.selected) {
          selectedToDos--;
        }

        return { ...todo, deleted: true };
      } else {
        return todo;
      }
    });
    setState({
      ...state,
      alertMessage: 'ToDo Deleted Successfully',
      showMessage: true,
      allTodos: todos,
      currentTodo: null,
      selectedToDos: selectedToDos,
      todos: todos.filter(todo => !todo.deleted),
    });
  };

  const getNavFilters = () => {
    return filters.map((filter, index) => (
      <li
        key={index}
        onClick={() => {
          const filterMails = state.allTodos.filter(todo => {
            if (filter.id === 0 && todo.starred) {
              return todo;
            } else if (filter.id === 1 && todo.important) {
              return todo;
            } else if (filter.id === 2 && todo.important) {
              return todo;
            } else if (filter.id === 3 && todo.important) {
              return todo;
            } else if (filter.id === 4 && todo.completed) {
              return todo;
            } else if (filter.id === 5 && todo.deleted) {
              return todo;
            } else return todo;
          });
          setState({
            ...state,
            loader: true,
            currentTodo: null,
            filter: filter.id,
            todos: filterMails,
          });
          setTimeout(() => { setState({ ...state, loader: false }); }, 1500);
        }}
      >
        <span
          className={
            filter.id === state.selectedSectionId ? 'gx-link active' : 'gx-link'
          }
        >
          <i className={`icon icon-${filter.icon}`} />
          <span>{filter.title}</span>
        </span>
      </li>
    ));
  };

  const getNavLabels = () => {
    return state.labels.map((label, index) => (
      <li
        key={index}
        onClick={() => {
          const filterMails = state.allTodos.filter(todo =>
            todo.labels.findIndex(eachLabel => eachLabel.id === label.id) >= 0,
          );
          setState({
            ...state,
            loader: true,
            currentTodo: null,
            todos: filterMails,
          });
          setTimeout(() => { setState({ ...state, loader: false }); }, 1500);
        }}
      >
        <span className="gx-link">
          <i className={`icon icon-circle gx-text-${label.color}`} />
          <span>{label.title}</span>
        </span>
      </li>
    ));
  };

  const ToDoSideBar = () => {
    return (
      <div className="gx-module-side">
        <div className="gx-module-side-header">
          <div className="gx-module-logo">
            <i className="icon icon-check-circle-o gx-mr-4" />
            <IntlMessages id="sidebar.todoApp" />
          </div>
        </div>
        <div className="gx-module-side-content">
          <CustomScrollbars className="gx-module-side-scroll">
            <div className="gx-module-add-task">
              <Button
                type="primary"
                className="gx-btn-block"
                onClick={() => { setState({ ...state, addTodo: true }); }}
              > <IntlMessages id="todo.addTask" /> 
              </Button>
            </div>
            <ul className="gx-module-nav">
              <li
                onClick={() => {
                  setState({
                    ...state,
                    currentTodo: null,
                    todos: this.state.allTodos,
                  });
                }}
              >
                <span className="gx-link active">
                  <i className="icon icon-all-contacts gx-pt-1" />
                  <span>
                    <IntlMessages id="todo.all" />
                  </span>
                </span>
              </li>

              <li className="gx-module-nav-label">
                <IntlMessages id="todo.filters" />
              </li>

              {getNavFilters()}

              <li className="gx-module-nav-label">
                <IntlMessages id="todo.labels" />
              </li>
              {getNavLabels()}
            </ul>
          </CustomScrollbars>
        </div>
      </div>
    );
  };

  const searchTodo = searchText => {
    if (searchText === '') {
      setState({
        ...state,
        todos: this.state.allTodos.filter(todo => !todo.deleted),
      });
    } else {
      const searchToDos = state.allTodos.filter(
        todo =>
          !todo.deleted &&
          todo.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
      );
      setState({ ...state, todos: searchToDos });
    }
  };

  const showToDos = ({ currentTodo, todos, conversation, user }) => {
    return currentTodo === null ? (
      <ToDoList
        todos={todos}
        onMarkAsStart={onMarkAsStart}
        onTodoSelect={onTodoSelect}
        onTodoChecked={onTodoChecked}
      />
    ) : (
        <ToDoDetail
          todo={currentTodo}
          user={user}
          conversation={conversation}
          onLabelUpdate={onLabelUpdate}
          onToDoUpdate={onToDoUpdate}
          onDeleteToDo={onDeleteToDo}
        />
      );
  };

  const optionMenu = () => {
    return (
      <Menu
        id="option-menu"
        onClick={onOptionMenuItemSelect}
        style={{
          maxHeight: ITEM_HEIGHT * 5.5,
        }}
      >
        {options.map(option => (
          <Menu.Item key={option.title}>{option.title}</Menu.Item>
        ))}
      </Menu>
    );
  };

  const labelMenu = () => {
    return (
      <Menu
        id="label-menu"
        onClick={onLabelMenuItemSelect}
        style={{
          maxHeight: ITEM_HEIGHT * 4.5,
        }}
      >
        {state.labels.map(label => (
          <Menu.Item key={label.id}>{label.title}</Menu.Item>
        ))}
      </Menu>
    );
  };

  const getToDoConversation = (id) => {
    return todoConversation.find(conversation => conversation.id === id);
  };

  const onTodoChecked = (data) => {
    data.selected = !data.selected;
    let selectedToDos = 0;
    const todos = state.todos.map(todo => {
      if (todo.selected) {
        selectedToDos++;
      }

      if (todo.id === data.id) {
        if (todo.selected) {
          selectedToDos++;
        }

        return data;
      } else {
        return todo;
      }
    });
    setState({...state,
      selectedToDos: selectedToDos,
      todos: todos
    });
  };

  const onAllTodoSelect = () => {
    const selectAll = state.selectedToDos < state.todos.length;

    if (selectAll) {
      getAllTodo();
    } else {
      getUnselectedAllTodo();
    }
  };

  const onTodoAdd = (data) => {
    setState(
      {...state,
        todos: this.state.allTodos.concat(data),
        allTodos: this.state.allTodos.concat(data)
      }
    );
  };

  const onTodoSelect = (todo) => {
    const conversationItem = getToDoConversation(todo.id);
    let conversationList = [];

    if (conversationItem) {
      conversationList = conversationItem.conversationData;
    }
    setState({...state,
      currentTodo: todo,
      loader: true,
      conversation: conversationList
    });
    setTimeout(() => { setState({ ...state, loader: false }); }, 1500);
  };

  const removeLabel = (todo, label) => {
    todo.labels.splice(todo.labels.indexOf(label), 1);
    return todo.labels;
  };

  const addLabel = (todo, label) => {
    todo.labels = todo.labels.concat(label);
    return todo.labels;
  };

  const onToggleDrawer = () => {
    setState({...state, 
      drawerState: !state.drawerState
    });
  };

  const updateSearch = evt => {
    setState({...state, 
      searchTodo: evt.target.value,
    });
    searchTodo(evt.target.value);
  };

  // 특정 페이지로 점프하기
  const handlePaging = (page: number) => {
    getTodos({variables: {paging: {page, itemCount: state.paging.itemCount}}});
  }

  const {
    selectedToDos,
    loader,
    drawerState,
    todos,
    alertMessage,
    showMessage,
    paging,
  } = state;

  return (
    <div className="gx-main-content">
      <div className="gx-app-module">
        {/* Todo 왼쪽 사이드 메뉴 드로어 */}
        <div className="gx-d-block gx-d-lg-none">
          <Drawer
            placement="left"
            closable={false}
            visible={drawerState}
            onClose={onToggleDrawer}
          >
            {ToDoSideBar()}
          </Drawer>
        </div>
        {/* Todo 왼쪽 사이드 메뉴 고정형 */}
        <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
          {ToDoSideBar()}
        </div>

        <div className="gx-module-box">
          <div className="gx-module-box-header">
            <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
              <i
                className="icon icon-menu gx-icon-btn"
                aria-label="Menu"
                onClick={onToggleDrawer}
              />
            </span>
            <AppModuleHeader
              placeholder="Search To Do"
              data-user={state.user}
              onChange={updateSearch}
              value={state.searchTodo}
            />
          </div>
          <div className="gx-module-box-content">
            {state.currentTodo === null ? (
              <div className="gx-module-box-topbar gx-module-box-topbar-todo">
                {state.todos.length > 0 ? (
                  <>
                    <Checkbox
                      className="gx-icon-btn"
                      indeterminate={
                        selectedToDos > 0 && selectedToDos < todos.length
                      }
                      checked={selectedToDos > 0}
                      onChange={onAllTodoSelect}
                      value="SelectMail"
                    />
                    <Dropdown
                      overlay={optionMenu()}
                      placement="bottomRight"
                      trigger={['click']}
                    >
                      <div>
                        <span className="gx-px-2"> {state.optionName}</span>
                        <i className="icon icon-charvlet-down" />
                      </div>
                    </Dropdown>
                  </>
                ) : null}

                {selectedToDos > 0 && (
                  <Dropdown
                    overlay={labelMenu()}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <i className="gx-icon-btn icon icon-tag" />
                  </Dropdown>
                )}
              </div>
            ) : (
                <div className="gx-module-box-topbar">
                  <i
                    className="icon icon-arrow-left gx-icon-btn"
                    onClick={() => { 
                      setState({ ...state, currentTodo: null }) 
                    }}
                  />
                </div>
              )}
            {loader ? (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            ) : (
                showToDos(state)
              )}
          </div>
          <div className="gx-module-box-footer">
            <Pagination current={paging?.page || 1} total={paging?.totalItems || 0} onChange={handlePaging}/>
          </div>
        </div>
      </div>
      {showMessage &&
        message.info(<span id="message-id">{alertMessage}</span>, 3, handleRequestClose,)}
    </div>
  );
};

export default ToDo;

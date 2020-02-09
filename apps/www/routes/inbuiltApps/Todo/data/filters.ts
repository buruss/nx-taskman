export interface TodoFilter {
  id: number;
  handle: string;
  title: string;
  icon: string;
}

const filters: TodoFilter[] = [

  {
    'id': 0,
    'handle': 'starred',
    'title': 'Starred',
    'icon': 'star'
  },
  {
    'id': 1,
    'handle': 'important',
    'title': 'Priority',
    'icon': 'important'
  },
  {
    'id': 2,
    'handle': 'dueDate',
    'title': 'Sheduled',
    'icon': 'schedule'
  },
  {
    'id': 3,
    'handle': 'today',
    'title': 'Today',
    'icon': 'calendar'
  },
  {
    'id': 4,
    'handle': 'completed',
    'title': 'Done',
    'icon': 'check-circle-o'
  },
  {
    'id': 5,
    'handle': 'deleted',
    'title': 'Deleted',
    'icon': 'trash'
  }
];

export default filters;
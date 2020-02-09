export interface TaskLabel {
  id: number;
  handle: string;
  title: string;
  color: string;
}

const labels: TaskLabel[] = [
  {
    'id': 1,
    'handle': 'frontend',
    'title': 'HTML',
    'color': 'teal'
  },
  {
    'id': 2,
    'handle': 'backend',
    'title': 'CSS',
    'color': 'indigo'
  },
  {
    'id': 3,
    'handle': 'api',
    'title': 'Laravel',
    'color': 'green'
  },
  {
    'id': 4,
    'handle': 'issue',
    'title': 'Node JS',
    'color': 'info'
  }
];

export default labels;
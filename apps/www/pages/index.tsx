import * as React from 'react';
import { SharedComponent } from '@nx-taskman/components';
import { sharedFunc } from '@nx-taskman/logics';

interface PageProps {
  data: Array<{ id: number; title: string; }>;
}

const Page = (props: PageProps) => {
  return <div>
    <img src='/static/new.png' />
    <SharedComponent />
    {
      props.data ? props.data.map((item) => <h1 key={item.id}>{sharedFunc()} {item.id}: {item.title}</h1>) : <h1> data is empty!</h1>
    }
  </div>
};

Page.getInitialProps = async ({ req, query }) => {
  return query;
};

export default Page;
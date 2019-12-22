import * as React from 'react';
//@로 시작하는 단축 경로 테스트
import { SharedComponent } from '@nx-taskman/components';
import ME from '../graphql/me.query';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import SignOutButton from '../views/components/sign_out_button';

const Home: React.FC = () => {
  const { data, loading, error } = useQuery(ME);

  return (
    <div>
      <head>home page</head>
      {/* static 경로로 asset 접근 테스트 */}
      <h1><img src='/new.png' />welcome!</h1>
      <SharedComponent />

      {loading && <p>로딩 중..</p>}
      {error && <div>
        <Link href="signin">
          <a>로그인하기</a>
        </Link>
        <br />
        <Link href="signup">
          <a>회원가입</a>
        </Link>
      </div>}
      {data && <div>
        <span>
          {
            // props.data ? props.data.map((item) => <h1 key={item.id}>{sharedFunc()} {item.id}: {item.title}</h1>) : <h1> data is empty!</h1>
            JSON.stringify(data)
          }
        </span>
        <SignOutButton />
      </div>}
    </div>
  );
};

export default Home;
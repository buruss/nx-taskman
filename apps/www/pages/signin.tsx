import * as React from 'react';
import SIGN_IN from '../graphql/sign_in.mutation';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import Router from 'next/router';
import { Form, Input, Button, } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import IntlMessage from '../lib/IntlMessage';

const SignIn: React.FC<FormComponentProps> = (props) => {
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');

  const [signIn, { error, loading, data }] = useMutation(SIGN_IN, {
    onCompleted(data) {
      console.log('로그인 성공. accessToken = ', data.signIn.accessToken);
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', data.signIn.accessToken);
      // 홈으로 이동
      Router.push('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        signIn({ variables: { uname, pwd } });
      }
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };
  const buttonItemLayout = {
    wrapperCol: { offset: 4 },
  }
  return (
    <div style={{ width: "80%" }}>
      <Form {...formItemLayout} layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item label="회원명">
          <Input type="text" name="uname" value={uname} onChange={e => setUname(e.target.value)}></Input>
        </Form.Item>
        <br />
        <Form.Item label="비밀번호">
          <Input type="password" name="pwd" value={pwd} onChange={e => setPwd(e.target.value)}></Input>
        </Form.Item>
        <br />
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">로그인</Button>
        </Form.Item>
      </Form>
      {error && <div>로그인 오류: {error.message}</div>}
      {loading && <div>로그인 중...</div>}
    </div>
  );
};

export default Form.create()(SignIn)

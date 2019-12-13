import * as React from 'react';
import SIGN_UP from '../graphql/sign_up.mutation';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import Router from 'next/router';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const SignUp = (props: FormComponentProps) => {
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [emaddr, setEmaddr] = useState('');

  const [signUp, { error, loading, data }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      console.log('회원 가입 성공. data = ', data);
      // 로그인 페이지로 이동
      Router.push('/signin');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ variables: { uname, pwd, emaddr } });
  }

  const { getFieldDecorator } = props.form;
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
    <div style={{ width: '80%' }}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="회원명">
          <Input type="text" name="uname" value={uname} onChange={e => setUname(e.target.value)}></Input>
        </Form.Item>
        <br />
        <Form.Item label="비밀번호">
          <Input type="password" name="pwd" value={pwd} onChange={e => setPwd(e.target.value)}></Input>
        </Form.Item>
        <br />
        <Form.Item label="이메일">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input type="email" name="emaddr" value={emaddr} onChange={e => setEmaddr(e.target.value)}></Input>)}
        </Form.Item>
        <br />
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">회원가입</Button>
        </Form.Item>
      </Form>
      {error && <div>회원가입오류: {error.message}</div>}
      {loading && <div>회원가입중...</div>}
    </div>
  );
};

export default Form.create()(SignUp)
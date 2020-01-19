import React from "react";
import { Button, Checkbox, Form, Icon, Input } from "antd";
import Link from 'next/link';
import Router from 'next/router';
import SIGN_UP from '../../../graphql/sign_up.mutation';
import IntlMessages from '../../../util/IntlMessages';
import { message } from "antd/lib";
import CircularProgress from '../../../components/CircularProgress';
import { useMutation } from '@apollo/react-hooks';
import { FormComponentProps } from 'antd/lib/form';
import { withApollo } from '../../../util/next_example_page';

const SignUp = props => {

  const [signUp, { error, loading, }] = useMutation(SIGN_UP, {
    onCompleted() {
      // 로그인 페이지로 이동
      Router.push('/signin');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        signUp({ variables: { values } });
      }
    });
  };

  const { getFieldDecorator } = props.form;
  
  return <div className="gx-app-login-wrap">
    <div className="gx-app-login-container">
      <div className="gx-app-login-main-content">
        <div className="gx-app-logo-content">
          <div className="gx-app-logo-content-bg">
            <img src='https://via.placeholder.com/272X395' alt='Neature' />
          </div>
          <div className="gx-app-logo-wid">
            <h1><IntlMessages id="app.userAuth.signUp" /></h1>
            <p><IntlMessages id="app.userAuth.bySigning" /></p>
            <p><IntlMessages id="app.userAuth.getAccount" /></p>
          </div>
          <div className="gx-app-logo">
            <img alt="example" src='/images/logo.png' />
          </div>
        </div>

        <div className="gx-app-login-content">
          <Form onSubmit={handleSubmit} className="gx-signup-form gx-form-row0">
            <Form.Item>
              {getFieldDecorator('uname', {
                rules: [{
                  required: true,
                  message: 'Please input your username!'
                }]
              })(<Input placeholder="Username" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('emaddr', {
                rules: [{
                  required: true,
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                }]
              })(<Input placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('pwd', {
                rules: [{
                  required: true,
                  message: 'Please input your Password!'
                }]
              })(<Input type="password" placeholder="Password" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox><IntlMessages id="appModule.iAccept" /></Checkbox>)}
              <span className="gx-link gx-signup-form-forgot"><IntlMessages id="appModule.termAndCondition" /></span>
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="gx-mb-0" htmlType="submit">
                <IntlMessages id="app.userAuth.signUp" />
              </Button>
              <span><IntlMessages id="app.userAuth.or" /></span> <Link href="/signin">
                <a>
                  <IntlMessages id="app.userAuth.signIn" /></a></Link>
            </Form.Item>
          </Form>
        </div>
        {loading && <div className="gx-loader-view">
          <CircularProgress />
        </div>}
        {error && message.error(error.message)}
      </div>
    </div>
  </div>;
};

export default withApollo(Form.create<FormComponentProps>()(SignUp));

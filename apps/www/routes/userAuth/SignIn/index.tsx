import React from 'react';
import { Button, Checkbox, Form, Input, message, } from 'antd';
import Link from 'next/link';
import SIGN_IN from '../../../graphql/sign-in.graphql';
import IntlMessages from '../../../util/IntlMessages';
import CircularProgress from '../../../components/CircularProgress';
import { useMutation } from '@apollo/react-hooks';
import { withApollo } from '../../../util/next_example_page';
import { login } from '../../../hoc/securedPage/withAuthAsync';
import { SharedComponent } from '@nx-taskman/components';
// import { FormComponentProps } from "antd/lib/form/Form";

const SignIn: React.FC<{}> = props => {
  
  const [signIn, { error, loading }] = useMutation(SIGN_IN, {
    onCompleted(data) {
      console.log('로그인 성공. token = ', data.signIn.token);
      // 토큰을 쿠키에 저장
      // 홈으로 이동
      login();
    },
  });

  const handleSubmit = (values) => {
    // props.form.validateFields((err, values) => {
    //   if (!err) {
        signIn({variables: values});
    //   }
    // });
  };

  return (
    <div className="gx-app-login-wrap">
      <SharedComponent />
      
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src="https://via.placeholder.com/272X395" alt="Neature" />
            </div>
            <div className="gx-app-logo-wid">
              <h1>
                <IntlMessages id="app.userAuth.signIn" />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.bySigning" />
              </p>
              <p>
                <IntlMessages id="app.userAuth.getAccount" />
              </p>
            </div>
            <div className="gx-app-logo">
              <img alt="example" src="/images/logo.png" />
            </div>
          </div>
          <div className="gx-app-login-content gx-loader-pos-rel">
            <Form
              onFinish={handleSubmit}
              className="gx-signin-form gx-form-row0"
              initialValues={{remember: true}}
            >
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input placeholder="username" />
              </Form.Item>
              <Form.Item name="pwd" rules={[{
                required: true,
                message: 'Please input your Password!',
              }]}>
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  <IntlMessages id="appModule.iAccept" />
                </Checkbox>
                <span className="gx-signup-form-forgot gx-link">
                  <IntlMessages id="appModule.termAndCondition" />
                </span>
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>
                <span>
                  <IntlMessages id="app.userAuth.or" />
                </span>
                <Link href="/signup">
                  <a>
                    <IntlMessages id="app.userAuth.signUp" />
                  </a>
                </Link>
              </Form.Item>
              <span className="gx-text-light gx-fs-sm">
                {' '}
                demo username: 'demo@example.com' and password: 'demo#123'
              </span>
            </Form>
          </div>
          {loading ? (
            <div className="gx-loader-view gx-loader-pos-ab">
              <CircularProgress />
            </div>
          ) : null}
          {error ? message.error(error.message) : null}
        </div>
      </div>
    </div>
  );
};

export default withApollo(SignIn);


import { useQuery, useMutation } from "@apollo/react-hooks"
import Router from "next/router"
import ME from '../../graphql/me.query';
import SIGN_OUT from '../../graphql/sign_out.mutation';
import { Button } from 'antd';

const SignOutButton = () => {

  const [signOut, { data, error, loading }] = useMutation(SIGN_OUT, {
    onCompleted() {
      localStorage.removeItem('token');
      console.log("signed you OUT!!")
      Router.reload()
    }
  })

  // destructure and rename `loading` `error` and `data` to avoid conflict with above consts
  const {
    loading: queryloading,
    error: queryerror,
    data: querydata
  } = useQuery(ME)

  if (querydata === undefined || querydata.me === undefined) {
    return <p>you aren't signed in</p>
  } else {
    return (
      <Button type="danger" onClick={() => { signOut() }}>Sign Out</Button>
    )
  }
}

export default SignOutButton
import Router from 'next/router';

export default (context: any = {}, target) => {
  console.log(context, target);
  if (context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.push(target);
  }
};

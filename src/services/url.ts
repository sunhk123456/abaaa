interface urlType {
  [k: string]: {
    title: string;
    url: string;
  };
}

const Url: urlType = {
  login: {
    title: '登录接口',
    url: 'http://10.249.219.89:8023',
  },
};

export default Url;
export { Url };

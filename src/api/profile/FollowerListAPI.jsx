import { useRecoilValue } from 'recoil';
import loginToken from '../../recoil/loginToken';

function FollowerListAPI(accountName) {
  const token = useRecoilValue(loginToken);
  const url = 'https://api.mandarin.weniv.co.kr';

  const getFollowerList = async () => {
    try {
      const res = await fetch(`${url}/profile/${accountName}/follower`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('API 접근에 실패하였습니다.', error);
    }
  };

  return { getFollowerList };
}

export default FollowerListAPI;

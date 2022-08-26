/**
 * 구글 로그인 폼 redirect 함수
 */
export function openGoogleLoginPage() {
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const redirectUri = 'api/v1/auth/login/google/';

  const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' ');

  const params = {
    response_type: 'code',
    client_id:
      '310763754913-02lvsola05qlakebccaqpi9km0kj8qlu.apps.googleusercontent.com',
    redirect_uri: `${'ec2-3-35-11-192.ap-northeast-2.compute.amazonaws.com:8000'}/${redirectUri}`,
    prompt: 'select_account',
    access_type: 'offline',
    scope,
  };

  const urlParams = new URLSearchParams(params).toString();

  window.location = `${googleAuthUrl}?${urlParams}` as (string | Location) &
    Location;
}

/**
 * 달력에서 보여지는 지난 달 날짜 목록 반환 함수
 * @param {number} year 이번 년도
 * @param {number} month 지난 달
 * @param {number} lastDay 지난 달 마지막 요일
 * @param {number} lastDate 지난 달 마지막 날짜
 * @returns
 */
export function getPrevMonthDate(
  year: number,
  month: number,
  lastDay: number,
  lastDate: number,
) {
  const result = [];
  if (lastDay !== 6) {
    for (let i = 0; i < lastDay + 1; i++) {
      result.unshift(
        `${year}` + `${month}`.padStart(2, '0') + `${lastDate - i}`,
      );
    }
  }

  return result;
}

/**
 * 달력에서 보여지는 다음 달 날짜 목록 반환 함수
 * @param {number} year 이번 년도
 * @param {number} month 이번 달
 * @param {number} lastDay 이번 달 마지막 요일
 * @returns [...'20200893', '20200831']
 */
export function getNextMonthDate(year: number, month: number, lastDay: number) {
  const result = [];
  for (let i = 1; i < 7 - lastDay; i++) {
    result.push(
      `${year}` + `${month}`.padStart(2, '0') + `${i}`.padStart(2, '0'),
    );
  }

  return result;
}

/**
 * 이번 달 날짜 목록 반환 함수
 * @param {number} year 이번 년도
 * @param {number} month 이번 달
 * @param {number} lastDate 이번 달 마지막 날짜
 * @returns
 */
export function getThisMonthDate(
  year: number,
  month: number,
  lastDate: number,
) {
  const result = [];
  for (let i = 1; i <= lastDate; i++) {
    result.push(
      `${year}` + `${month}`.padStart(2, '0') + `${i}`.padStart(2, '0'),
    );
  }

  return result;
}

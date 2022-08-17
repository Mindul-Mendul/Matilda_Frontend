import useCookie from '../hooks/useCookie';
import { UpdateMember } from '../types/Member';
import { anonymousApiClient, apiClient } from './apiClient';
import { setApiClientHeaders } from './axiosInterceptors';

export const insertMember = async (member: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.post(`/members`, member);
    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }
  console.log(error);
  return { data, error };
}

export const selectMember = async (memberID: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.get(`/members/${memberID}`);

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const putMember = async (member: UpdateMember) => {
  let [data, error] = [undefined, undefined] as any;
  const { getCookie } = useCookie();

  try {
    const cookie=getCookie();
    if(!cookie) throw "noCookie";

    setApiClientHeaders(cookie);
    const result = await apiClient.put(`/members/auth/${member.memberNum}`, member);

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

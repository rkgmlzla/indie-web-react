import axios from 'axios';
import { baseUrl } from './config';


//공연-예매 알림-1.예매알림 ON
//  예매 알림 등록 (예매 알림 ON)
export const registerAlert = async (refId, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/alert`,
      {
        type: 'performance',
        refId: refId,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,  
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 예매 알림 등록 실패:', error);
    throw error;
  }
};


// 공연-예매 알림-2.예매알림 OFF
//  예매 알림 해제 (예매 알림 OFF)

export const cancelAlert = async (refId, authToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/alert/${refId}`, 
      {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 예매 알림 해제 실패:', error);
    throw error;
  }
};

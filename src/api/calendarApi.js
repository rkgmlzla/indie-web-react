import axios from 'axios';
import { baseUrl } from './config';


// 캘린더-1.월별 공연 날짜 마킹
// 🔹 [API] 월별 공연 날짜 마킹
// 특정 연도/월/지역의 공연 날짜 목록 조회
// Method: GET
// Endpoint: /calender/summary
// Request Params: year, month, region (선택)
// 인증 필요: X
export const fetchMonthlyPerformanceDates = async (year, month, region) => {
  try {
    const response = await axios.get(`${baseUrl}/calender/summary`, {
      params: {
        year,
        month,
        ...(region && { region }), // region은 선택이므로 있을 때만 포함
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 월별 공연 날짜 마킹 실패:', error);
    throw error;
  }
};


import axios from 'axios';
import { baseUrl } from './config';

// ✅ 공통 배열 처리 함수 (응답이 배열이 아닐 때 안전 처리)
const safeArray = (data) => (Array.isArray(data) ? data : []);

/**
 * ✅ 1. 월별 공연 날짜 마킹
 * GET /calendar/summary?year=2025&month=8[&region=서울,인천]
 */
export const fetchMonthlyPerformanceDates = async (year, month, region) => {
  try {
    // ✅ region이 배열이면 콤마 문자열 변환
    const regionParam = Array.isArray(region) ? region.join(",") : region;

    const response = await axios.get(`${baseUrl}/calendar/summary`, {
      params: { year, month, ...(regionParam && { region: regionParam }) },
    });
    return safeArray(response.data?.hasPerformanceDates);
  } catch (error) {
    console.error('❌ 월별 공연 날짜 마킹 실패:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ 2. 특정 날짜 공연 리스트 조회
 * GET /calendar/performance/by-date?date=YYYY-MM-DD[&region=서울,인천]
 */
export const fetchPerformancesByDate = async (date, region) => {
  try {
    // ✅ region이 배열이면 콤마 문자열 변환
    const regionParam = Array.isArray(region) ? region.join(",") : region;

    const response = await axios.get(`${baseUrl}/calendar/performance/by-date`, {
      params: { date, ...(regionParam && { region: regionParam }) },
    });
    return safeArray(response.data?.performances);
  } catch (error) {
    console.error('❌ 날짜별 공연 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

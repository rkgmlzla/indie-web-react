// ✅ frontend/src/api/calendarApi.js
import axios from 'axios';
import { baseUrl } from './config';

const safeArray = (data) => (Array.isArray(data) ? data : []);

export const fetchMonthlyPerformanceDates = async (year, month, region) => {
  try {
    const params = { year, month };
    if (region && region.length > 0) {
      params.region = region;
    }

    const response = await axios.get(`${baseUrl}/calendar/summary`, {
      params,
      paramsSerializer: {
        serialize: (params) => {
          const searchParams = new URLSearchParams();
          Object.keys(params).forEach((key) => {
            const value = params[key];
            if (Array.isArray(value)) {
              value.forEach((v) => searchParams.append(key, v));
            } else {
              searchParams.append(key, value);
            }
          });
          return searchParams.toString();
        },
      },
    });

    return safeArray(response.data?.hasPerformanceDates);
  } catch (error) {
    console.error('❌ 월별 공연 날짜 마킹 실패:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchPerformancesByDate = async (date, region) => {
  try {
    const params = { date };
    if (region && region.length > 0) {
      params.region = region;
    }

    const response = await axios.get(`${baseUrl}/calendar/performance/by-date`, {
      params,
      paramsSerializer: {
        serialize: (params) => {
          const searchParams = new URLSearchParams();
          Object.keys(params).forEach((key) => {
            const value = params[key];
            if (Array.isArray(value)) {
              value.forEach((v) => searchParams.append(key, v));
            } else {
              searchParams.append(key, value);
            }
          });
          return searchParams.toString();
        },
      },
    });

    return safeArray(response.data?.performances);
  } catch (error) {
    console.error('❌ 날짜별 공연 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

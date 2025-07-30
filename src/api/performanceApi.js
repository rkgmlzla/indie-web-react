import axios from 'axios';
import { baseUrl } from './config';


// 홈-1.오늘 예정된 공연
/**
 *  [기능] 오늘 예정된 공연 조회
 * Method: GET
 * Endpoint: /performance/home/today
 * 인증 필요 없음
 * Params: 없음
 */
export const fetchTodayPerformances = async () => {
  try {
    const response = await axios.get(`${baseUrl}/performance/home/today`);
    return response.data;
  } catch (error) {
    console.error(' 오늘 공연 조회 실패:', error);
    throw error;
  }
};


// 홈-2.NEW 업로드 공연
/**
 *  [기능] 최근 업로드된 공연 조회
 * Method: GET
 * Endpoint: /performance/home/recent
 * Query Params: limit (선택)
 * 인증 필요 없음
 */
export const fetchRecentPerformances = async (limit) => {
  try {
    const response = await axios.get(`${baseUrl}/performance/home/recent`, {
      params: { limit }, // 🔹 명세서에 value 없음 → 전달만 정의
    });
    return response.data;
  } catch (error) {
    console.error(' 최근 공연 조회 실패:', error);
    throw error;
  }
};


//홈- 3. 티켓 오픈 예정 공연 
/**
 * [기능] 티켓 오픈 예정 공연 조회
 * Method: GET
 * Endpoint: /performance/home/ticket-opening
 * Query Params: startDate, endDate
 * 인증 필요 없음
 */
export const fetchTicketOpeningPerformances = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${baseUrl}/performance/home/ticket-opening`, {
      params: {
        startDate, // 🔹 명세서에 value 없음 → 값은 추후 UI에서 전달
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 티켓 오픈 예정 공연 조회 실패:', error);
    throw error;
  }
};


// 홈-4. 맞춤 추천 공연 
/**
 *  [기능] 맞춤 추천 공연 리스트 조회
 * Method: GET
 * Endpoint: /performance/home/recommendation
 * Request Params: X
 * 인증 필요: O (토큰 등 필요)
 */
export const fetchRecommendedPerformances = async (authToken) => {
  try {
    const response = await axios.get(`${baseUrl}/performance/home/recommendation`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // 인증 토큰 포함
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 맞춤 추천 공연 조회 실패:', error);
    throw error;
  }
};

//  캘린더-2.날짜별 공연 리스트 
//  [API] 날짜별 공연 리스트 조회
// 특정 날짜의 공연 리스트를 조회
// Method : GET
// Endpoint : /performance/by-date
// Request Params : date (예: 2025-05-03)
// 인증 필요 : X

export const fetchPerformancesByDate = async (date) => {
  try {
    const response = await axios.get(`${baseUrl}/performance/by-date`, {
      params: { date }, 
    });
    return response.data;
  } catch (error) {
    console.error(' 날짜별 공연 조회 실패:', error);
    throw error;
  }
};

//공연-1. 공연 목록 조회
// 공연 전체 리스트를 페이지 단위로 조회
// Method : GET
// Endpoint : /performance
// Request Params : region, sort, page, size
// 인증 필요 : X
export const fetchPerformances = async ({ region, sort, page, size }) => {
  try {
    const response = await axios.get(`${baseUrl}/performance`, {
      params: {
        region, // 예: '서울'
        sort,   // 예: 'latest' 또는 'popular'
        page,   // 예: 1
        size,   // 예: 10
      },
    });
    return response.data;
  } catch (error) {
    console.error('공연 목록 조회 실패:', error);
    throw error;
  }
};

//공연-2. 공연 상세 정보 조회
//  공연 id로 상세 정보 요청
// Method : GET
// Endpoint : /performance/{id}
// Request Params : id
// 인증 필요 : X
export const fetchPerformanceDetail = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/performance/${id}`);
    return response.data;
  } catch (error) {
    console.error(' 공연 상세 정보 조회 실패:', error);
    throw error;
  }
};

//가까운 공연 찾기- 2.모든 공연장의 현재 시간 이후 예정 공연 조
/**
 *  지도 영역 내 예정 공연 조회 API
 * POST /nearby/performance
 * Body: sw_lat, sw_lng, ne_lat, ne_lng
 * 인증 필요 없음
 */
export const fetchPerformancesInArea = async (swLat, swLng, neLat, neLng) => {
  try {
    const response = await axios.post(`${baseUrl}/nearby/performance`, {
      sw_lat: swLat,
      sw_lng: swLng,
      ne_lat: neLat,
      ne_lng: neLng,
    });
    return response.data;
  } catch (error) {
    console.error(' 지도 영역 내 공연 조회 실패:', error);
    throw error;
  }
};



//가까운 공연 찾기- 3.특정 공연장의 현재 시간 이후 예정된 공연 조회(마커 클릭)
/**
 * 특정 공연장 현재 시간 이후 예정 공연 조회 API
 * GET /nearby/venue/{venue_id}/performance
 * Query Param: after (현재 시간)
 * 인증 필요 없음
 */
export const fetchUpcomingPerformancesByVenue = async (venueId, afterTime) => {
  try {
    const response = await axios.get(`${baseUrl}/nearby/venue/${venueId}/performance`, {
      params: { after: afterTime },
    });
    return response.data;
  } catch (error) {
    console.error('특정 공연장 예정 공연 조회 실패:', error);
    throw error;
  }
};




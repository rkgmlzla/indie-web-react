import axios from 'axios';
import { baseUrl } from './config';

/**
 * 🎵 아티스트 목록 조회
 * GET /artist
 * Request Params: page, size
 * 인증: 불필요
 */
export const fetchArtistList = async ({ page, size }) => {
  try {
    const response = await axios.get(`${baseUrl}/artist`, {
      params: { page, size },
    });

    const data = response.data;
    console.log('🔥 [API 원본 응답]', data);

    // ✅ artists 배열만 추출해서 반환
    const artistsArray = Array.isArray(data.artists) ? data.artists : [];
    console.log('🔥 [파싱된 artists 배열]', artistsArray);

    return artistsArray;
  } catch (error) {
    console.error('📛 아티스트 목록 조회 실패:', error);
    return []; // 실패 시 안전하게 빈 배열 반환
  }
};

/**
 * 🎵 아티스트 상세 정보 조회
 * GET /artist/{id}
 */
export const fetchArtistDetail = async (artistId) => {
  try {
    const response = await axios.get(`${baseUrl}/artist/${artistId}`);
    const data = response.data;

    // ✅ 백엔드 → 프론트 데이터 매핑
    return {
      ...data,
      profileImageUrl: data.image_url,
      spotify: data.spotify_url,
      instagram: data.instagram_account,
      scheduledPerformances: data.upcomingPerformances || [],
      pastPerformances: data.pastPerformances || []
    };
  } catch (error) {
    console.error('📛 아티스트 상세 정보 조회 실패:', error);
    throw error;
  }
};
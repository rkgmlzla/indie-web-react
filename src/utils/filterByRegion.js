// /utils/filterByRegion.js
export default function filterByRegion(data, selectedRegions) {
    // '전체' 선택 시 필터 없이 전체 리턴
    if (selectedRegions.length === 1 && selectedRegions[0] === '전체') {
        return data;
    }

    // 지역 기준 필터링
    return data.filter((item) => selectedRegions.includes(item.region));
}

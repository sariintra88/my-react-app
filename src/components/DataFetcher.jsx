import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// ดึงค่า API Key จากไฟล์ .env
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// ฟังก์ชันสำหรับดึงข้อมูลรูปภาพจาก Unsplash API
const fetchImages = async (query) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: { query, per_page: 6 },
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
  return response.data.results;
};

const DataFetcher = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('nature');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['images', searchQuery],
    queryFn: () => fetchImages(searchQuery),
    enabled: true,
  });

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">ค้นหารูปภาพจาก Unsplash</h2>

      {/* ช่องกรอกคำค้นหา */}
      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="พิมพ์คำค้นหา เช่น sea, mountain, forest..."
          className="p-2 border rounded text-black w-1/3"
        />
        <button
          onClick={() => {
            if (query.trim()) {
              setSearchQuery(query);
              refetch();
            }
          }}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          ค้นหา
        </button>
      </div>

      {/* แสดง Loading หรือ Error */}
      {isLoading && <p>กำลังโหลดข้อมูล...</p>}
      {error && <p className="text-red-500">เกิดข้อผิดพลาด: {error.message}</p>}

      {/* แสดงผลรูปภาพ */}
      <div className="grid grid-cols-3 gap-4">
        {data &&
          data.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
              <img src={image.urls.small} alt={image.alt_description} className="w-full h-40 object-cover" />
              <p className="text-sm p-2">{image.alt_description || 'ไม่มีคำอธิบาย'}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DataFetcher;
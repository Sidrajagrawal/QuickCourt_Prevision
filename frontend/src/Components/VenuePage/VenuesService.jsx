import axios from "axios";
import { PAGE_SIZE } from "./constants";

export async function fetchVenues({
  page = 1,
  pageSize = PAGE_SIZE,
  q = "",
  filters = {},
} = {}) {
  const res = await axios.get("http://127.0.0.1:8000/api/v1/venues/", {
    params: {
      page,
      page_size: pageSize,
      search: q || undefined,
      type: filters.type || undefined,
      min_price: filters.minPrice ?? undefined,
      max_price: filters.maxPrice ?? undefined,
      min_rating: filters.minRating ?? undefined,
    },
  });

  if (res.data.results) {
    // DRF paginated response
    return {
      data: res.data.results,
      total: res.data.count,
    };
  }

  // If your API doesn’t paginate
  return {
    data: res.data,
    total: res.data.length,
  };
}

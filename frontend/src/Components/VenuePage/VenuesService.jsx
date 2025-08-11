
export async function fetchVenues({ page = 1, pageSize = PAGE_SIZE, q = '', filters = {} } = {}) {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 350));

  // Mock dataset of 36 items
  const all = Array.from({ length: 36 }).map((_, i) => ({
    id: i + 1,
    name: `Court ${i + 1}`,
    city: 'Ahmedabad',
    type: i % 3 === 0 ? 'Outdoor' : 'Indoor',
    pricePerHour: 250 + (i % 6) * 50,
    rating: +(3 + (i % 3) * 0.5).toFixed(1),
    approved: true,
    image: null,
  }));
    // simple search & filter 
  let filtered = all.filter((v) => v.approved);
  if (q) {
    const term = q.trim().toLowerCase();
    filtered = filtered.filter((v) => v.name.toLowerCase().includes(term) || v.city.toLowerCase().includes(term));
  }
  if (filters.type) filtered = filtered.filter((v) => v.type === filters.type);
  if (filters.minPrice != null) filtered = filtered.filter((v) => v.pricePerHour >= filters.minPrice);
  if (filters.maxPrice != null) filtered = filtered.filter((v) => v.pricePerHour <= filters.maxPrice);
  if (filters.minRating != null) {
  filtered = filtered.filter(
    (v) => Number(v.rating) >= Number(filters.minRating)
  );
  if(typeof filters.minRating === "number") filtered = filtered.filter((v) => v.rating >= filters.minRating);
}



  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return { data: pageItems, total };
}
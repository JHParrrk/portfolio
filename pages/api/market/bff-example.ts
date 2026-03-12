import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * BFF (Backend For Frontend) Pattern Example
 *
 * This API Route acts as a proxy to the external GraphQL API.
 * Benefits:
 * 1. Security: Hide external API endpoints and keys from the client.
 * 2. Data Transformation: Fetch large datasets and return only what's needed for the UI.
 * 3. Simplified Client Logic: Complex multi-step backend calls can be handled here.
 */

const GRAPHQL_ENDPOINT = process.env.BACKEND_GRAPHQL_URL || '';

const FETCH_USED_ITEMS_QUERY = `
  query fetchUseditems($page: Int) {
    fetchUseditems(page: $page) {
      _id
      name
      remarks
      price
      images
      pickedCount
      seller {
        name
      }
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { page = 1 } = req.query;

  try {
    // 1. External API Call (Hidden from Browser)
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FETCH_USED_ITEMS_QUERY,
        variables: { page: Number(page) },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      return res.status(500).json({ error: result.errors[0].message });
    }

    // 2. Data Transformation (Formatting for UI)
    // We only return formatted data that the UI actually needs.
    const rawItems = result.data.fetchUseditems;

    const formattedItems = rawItems.map((item: any) => ({
      id: item._id,
      title: item.name,
      summary: item.remarks ? item.remarks.slice(0, 50) + '...' : 'No remarks',
      priceTag: `₩${item.price?.toLocaleString()}`,
      thumbnail: item.images?.[0]
        ? `https://storage.googleapis.com/${item.images[0]}`
        : '/images/no-image.png',
      sellerName: item.seller?.name || 'Anonymous',
      isHot: (item.pickedCount || 0) > 10,
    }));

    // 3. Return Clean Data
    res.status(200).json(formattedItems);
  } catch (error) {
    console.error('BFF Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

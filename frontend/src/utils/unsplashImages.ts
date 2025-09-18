// Unsplash image URLs for different blog topics

// Topic images - one main image per blog topic
export const topicImages = {
  'stone-matrix-asphalt': 'https://images.unsplash.com/photo-1511204190469-cdc2f7ef9ddf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U3RvbmUlMjBNYXRyaXglMjBBc3BoYWx0fGVufDB8fDB8fHww',
  'sma-asphalt-mix-design': 'https://images.unsplash.com/photo-1605892235318-082b7caad77c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHNtYSUyMGFzcGhhbHQlMjBtaXglMjBkZXNpZ258ZW58MHx8MHx8fDA%3D',
  'steel-fibre-reinforced-concrete': 'https://images.unsplash.com/photo-1712671593123-3b741e0f80bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHN0ZWVsJTIwZmlicmUlMjByZWluZm9yY2VkJTIwY29uY3JldGV8ZW58MHx8MHx8fDA%3D',
  'fibre-reinforced-concrete': 'https://images.unsplash.com/photo-1724607806083-32fb1a9840ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZpYnJlJTIwcmVpbmZvcmNlZCUyMGNvbmNyZXRlfGVufDB8fDB8fHww',
  'silica-fume-concrete': 'https://images.unsplash.com/photo-1616621859311-19dff47afafc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2VsZiUyMENvbXBhY3RpbmclMjBDb25jcmV0ZXxlbnwwfHwwfHx8MA%3D%3D'
};

// Get the main topic image
export const getTopicImage = (slug: string): string => {
  return topicImages[slug as keyof typeof topicImages] || topicImages['stone-matrix-asphalt'];
};

export const useStorage = () => {
  const IMGBB_API_KEY = '73ed4a9ac3e9ad07424a99ac06900b11'; // Replace with your ImgBB API key

  const uploadFile = async (file) => {
    try {
      if (!file) return null;

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        throw new Error('Invalid file type. Please upload an image.');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size exceeds 5MB limit.');
      }

      // Create FormData for ImgBB
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', IMGBB_API_KEY);

      // Upload to ImgBB
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log('Image uploaded successfully');
        return data.data.display_url; // Return the direct image URL from ImgBB response
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(error.message || 'Error uploading file');
    }
  };

  return { uploadFile };
}; 
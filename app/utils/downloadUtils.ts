import { useDownloadStore } from "../store/useDownloadStore";

export interface DownloadableItem {
  id: string;
  title: string;
  description: string;
  author: string;
  contentType: 'video' | 'audio' | 'ebook' | 'live';
  fileUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  size?: string;
}

export const useDownloadHandler = () => {
  const { addToDownloads, isItemDownloaded } = useDownloadStore();

  const handleDownload = async (item: DownloadableItem) => {
    try {
      // Check if already downloaded
      if (isItemDownloaded(item.id)) {
        console.log(`📥 Item already downloaded: ${item.title}`);
        return { success: false, message: 'Already downloaded' };
      }

      // Add to downloads
      await addToDownloads({
        id: item.id,
        title: item.title,
        description: item.description,
        author: item.author,
        contentType: item.contentType,
        fileUrl: item.fileUrl,
        thumbnailUrl: item.thumbnailUrl,
        duration: item.duration,
        size: item.size,
      });

      console.log(`✅ Successfully downloaded: ${item.title}`);
      return { success: true, message: 'Downloaded successfully' };
    } catch (error) {
      console.error('❌ Download failed:', error);
      return { success: false, message: 'Download failed' };
    }
  };

  const checkIfDownloaded = (itemId: string) => {
    return isItemDownloaded(itemId);
  };

  return {
    handleDownload,
    checkIfDownloaded,
  };
};

// Helper function to convert different content types to DownloadableItem
export const convertToDownloadableItem = (item: any, contentType: 'video' | 'audio' | 'ebook' | 'live'): DownloadableItem => {
  return {
    id: item._id || item.id || String(Math.random()),
    title: item.title || item.name || 'Untitled',
    description: item.description || item.summary || '',
    author: item.author || item.speaker || item.creator || 'Unknown',
    contentType,
    fileUrl: item.fileUrl || item.videoUrl || item.audioUrl || item.downloadUrl,
    thumbnailUrl: item.thumbnailUrl || item.imageUrl || item.coverImage,
    duration: item.duration || item.length,
    size: item.size || item.fileSize,
  };
};

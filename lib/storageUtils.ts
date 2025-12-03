import { supabase } from './supabaseClient';

/**
 * Upload a file to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'assets')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
  file: File,
  bucket: string = 'assets',
  folder?: string
): Promise<{ url: string | null; error: Error | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { url: null, error: error as Error };
  }
}

/**
 * Delete a file from Supabase Storage
 * @param filePath - The path to the file in storage
 * @param bucket - The storage bucket name (default: 'assets')
 */
export async function deleteFile(
  filePath: string,
  bucket: string = 'assets'
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Get public URL for a file in storage
 * @param filePath - The path to the file in storage
 * @param bucket - The storage bucket name (default: 'assets')
 */
export function getPublicUrl(
  filePath: string,
  bucket: string = 'assets'
): string {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Example: Upload an image from a URL (for seeding)
 * This is useful for populating your database with sample images
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  fileName: string,
  bucket: string = 'assets',
  folder?: string
): Promise<{ url: string | null; error: Error | null }> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Convert blob to File
    const file = new File([blob], fileName, { type: blob.type });

    // Upload using the uploadFile function
    return await uploadFile(file, bucket, folder);
  } catch (error) {
    console.error('Error uploading image from URL:', error);
    return { url: null, error: error as Error };
  }
}

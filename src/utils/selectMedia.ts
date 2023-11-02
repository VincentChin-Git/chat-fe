import * as ImagePicker from 'expo-image-picker';

// import { uploadFiles, getFiles } from '@/services/storage';
import toast from './toast';

import uriToBlob from '@/utils/uriToBlob';

const selectMedia = async ({
  options = {},
  filename = '',
}: {
  options: ImagePicker.ImagePickerOptions;
  filename: string;
}) => {
  // check if canceled -> get fileList -> validate fileList -> upload all -> return fileList

  if (!filename) return [];
  try {
    const photoRes = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 9,
      ...options,
    });

    if (photoRes.canceled) return [];
    else if (!photoRes.canceled && photoRes.assets) {
      const { assets } = photoRes;
      if (!assets.length) return [];
      const tempFileList = assets.map(asset => ({
        type: asset.type,
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
      }));
      // validate
      if (!tempFileList || !tempFileList.length) {
        toast('No Media Selected');
        return [];
      }

      const errorMedia = tempFileList.filter(
        item => !['image'].includes(item.type || '') || !item.uri,
      );

      if (errorMedia.length) {
        toast('Invalid photo, please try again');
        return [];
      }
      // end validate

      // TODO: upload file
      // upload image
      const extensionRegex = new RegExp('[^.]+$');

      const fileList = [];
      for (let index = 0; index < tempFileList.length; index++) {
        const file = tempFileList[index];
        const extension = file.uri.match(extensionRegex);
        const metadata = {
          contentType: `${file.type}/${extension}`,
        };
        const toBlob = (await uriToBlob(file.uri)) as Blob;
        const fullPath = `${filename}_${index + 1}.${extension}`;

        fileList.push({ ...file });
      }
      // end upload image

      return fileList;
    }
  } catch (error) {
    console.error(error, 'errSelectImage');
    return [];
  }
};

export default selectMedia;

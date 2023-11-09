const uriToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const binaryData = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
  return binaryData;
};

export default uriToBlob;

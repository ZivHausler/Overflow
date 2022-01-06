export const uploadToS3 = async (file, type) => {
  const { url } = await fetch(
    `http://localhost:5000/s3Url?folderName=${
      type === "exam" ? "exams" : type === "solution" ? "solutions" : "images"
    }`
  ).then((ressponse) => ressponse.json());
  console.log("this is the url", url);
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type":
        type === "exam" || type === "solution"
          ? "application/pdf"
          : "multipart/form-data",
    },
    body: file,
  });
  // alert('file uploaded successfully');
  return url.split("?")[0];
};

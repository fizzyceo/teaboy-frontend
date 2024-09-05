const createSite = async (site: {
  name: string;
  phoneNumber: string;
  location: string;
  image: File;
  description?: string | undefined;
}) => {
  const formData = new FormData();
  formData.append("name", site.name);
  formData.append("description", site.description || "");
  formData.append("address", site.location);
  formData.append("phone", site.phoneNumber);
  formData.append("file", site.image);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/site/create`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
export default createSite;

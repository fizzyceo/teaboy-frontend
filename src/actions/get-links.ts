import { randomInt } from "crypto";

const getLinks = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/menu`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  const links = data.map((menu: any, index: any) => {
    return `${process.env.FRONTEND_URL}/menu/${menu.id}?table=${randomInt(
      1,
      10
    )}`;
  });

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return links;
};

export default getLinks;

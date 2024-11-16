import { Card } from "flowbite-react";

function CardComponent({ image, name, price }) {
  return (
    <Card
      className="max-w-sm"
      imgAlt="menuImage"
      imgSrc={image}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {price}
      </p>
    </Card>
  );
}

export default CardComponent;
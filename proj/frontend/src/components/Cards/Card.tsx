import { Card } from "flowbite-react";

interface CardComponentProps {
  image: string;
  name: string;
  price: number | string;
}

function CardComponent({ image, name, price }: CardComponentProps) {
  return (
    <Card
      className="w-1/4 h-32"
      imgAlt="menuImage"
      imgSrc={image}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        €{price}
      </p>
    </Card>
  );
}

export default CardComponent;
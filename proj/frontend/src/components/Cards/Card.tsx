import { Card, Modal } from "flowbite-react";
import { useState } from "react";

interface CardComponentProps {
  image: string;
  name: string;
  price: number | string;
  chain: number;
}

function CardComponent({ image, name, price, chain }: CardComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a href="#" onClick={handleMenuClick}>
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
      </a>

      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>{chain}</Modal.Header>
        <Modal.Body>
          <div className="flex justify-end">
            <div>
              <h3 className="text-gray-700 text-bold">Menu: {name}</h3>
              <p className="text-lg font-semibold text-gray-900">Price: €{price}</p>
            </div>
            <div>
              <img src={image} alt={name} className="mb-4 w-full" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardComponent;
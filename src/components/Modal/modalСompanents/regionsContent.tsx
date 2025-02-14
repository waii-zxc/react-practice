import React from 'react';
import styles from '../Modal.module.scss';

interface Region {
  image: string;
  name: string;
}

interface RegionsContentProps {
  regions: Region[];
  closeModal: (regionName: string) => void;
}

const RegionsContent: React.FC<RegionsContentProps> = ({ regions, closeModal }) => {
  return (
    <div>
      <h2>Выберите область</h2>
      <ul>
        {regions.map((region, index) => (
          <li className={styles.region} key={index} onClick={() => closeModal(region.name)}>
            {region.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionsContent;
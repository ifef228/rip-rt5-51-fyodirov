import { FC } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Gas } from '../types';

interface GasCardProps {
  gas: Gas;
}

// Дефолтное изображение для газов (SVG)
const DEFAULT_IMAGE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e9ecef' width='200' height='200'/%3E%3Ctext fill='%236c757d' font-family='Arial' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E⚛️ Газ%3C/text%3E%3C/svg%3E`;

const GasCard: FC<GasCardProps> = ({ gas }) => {
  const imageUrl = gas.imageUrl || DEFAULT_IMAGE;

  return (
    <Card
      className="shadow-sm"
      style={{
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        height: '180px'
      }}
    >
      <Row className="g-0 h-100">
        {/* Изображение слева */}
        <Col xs={4} md={3} className="d-flex align-items-center">
          <Card.Img
            src={imageUrl}
            alt={gas.name}
            style={{
              height: '180px',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '8px 0 0 8px'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
            }}
          />
        </Col>

        {/* Информация справа */}
        <Col xs={8} md={9}>
          <Card.Body className="d-flex flex-column justify-content-between h-100 p-3">
            <div>
              <Card.Title
                style={{
                  fontWeight: '600',
                  color: '#000',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem'
                }}
              >
                {gas.name}
              </Card.Title>

              <Card.Subtitle
                className="mb-2"
                style={{ color: '#666', fontSize: '1rem' }}
              >
                Формула: <strong>{gas.formula}</strong>
              </Card.Subtitle>

              <Card.Text
                style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}
              >
                {gas.detailedDescription.length > 120
                  ? `${gas.detailedDescription.substring(0, 120)}...`
                  : gas.detailedDescription}
              </Card.Text>
            </div>

            <div className="d-flex justify-content-end">
              <Button
                as={Link}
                to={`/gases/${gas.id}`}
                variant="primary"
                style={{
                  fontWeight: '500',
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.95rem'
                }}
              >
                Подробнее
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default GasCard;

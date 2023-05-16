import React from 'react';
import JesAIA from '../img/jes-aia.jpg';
import { Card, Button, Badge } from 'react-bootstrap';

const AIASupport = () => {
  const [showChat, setShowChat] = React.useState(false);

  const handleShowChat = () => {
    setShowChat(true);
  };

  const handleHideChat = () => {
    setShowChat(false);
  };

  return (
    <>
      {!showChat && (
        <div className="position-fixed" style={{ bottom: '15px', right: '15px' }}>
          <Button variant="concierge outline-secondary" size="sm" onClick={handleShowChat}>
            <img src={JesAIA}
              height="50"
              className="rounded-circle"
              alt="Jes AIA Concierge"
            />&nbsp;Help
          </Button>
        </div>
      )}
      {showChat && (
        <Card className="position-fixed" style={{ bottom: '15px', right: '15px', width: '250px' }}>
          <Card.Body>
            <Card.Title className="text-center">Sorrel Concierge</Card.Title>
            <Card.Text>
              <img src={JesAIA}
                height="100"
                className="rounded-circle d-flex m-auto"
                alt="Jes AIA Concierge"
              /> <br/>
              Hi I'm Jes. Thank you for using Sorrel! Please visit the <a href="/addons">Addons page</a> to crowdfund me. <br/><a href="https://youtu.be/TIywmZcLYyY" target="_blank">Click here to view our Getting Started Guide.</a>
            </Card.Text>
            <Button variant="outline-info" onClick={handleHideChat}>Close</Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default AIASupport;
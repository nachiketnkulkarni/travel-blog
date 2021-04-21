import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";

function ContactSection(props) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    messageText: "",
  });

  const changeValues = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <div className='sectionHeight contact-section' id='contact'>
      <Container>
        <div className='sectionHeading'>
          <h3 className='sectionHeader'>Contact</h3>
        </div>

        <div className='container contact-form sectionData'>
          <div className='contact-image'>
            <img
              src='https://image.ibb.co/kUagtU/rocket_contact.png'
              alt='rocket_contact'
            />
          </div>
          <form method='post' onSubmit={() => {}}>
            <h3>Drop Us a Message</h3>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <input
                    type='text'
                    name='name'
                    className='form-control'
                    placeholder='Your Name *'
                    value={contact.name}
                    onChange={changeValues}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    name='email'
                    className='form-control'
                    placeholder='Your Email *'
                    value={contact.email}
                    onChange={changeValues}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    name='phone'
                    className='form-control'
                    placeholder='Your Phone Number *'
                    value={contact.phone}
                    onChange={changeValues}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <textarea
                    name='messageText'
                    className='form-control'
                    placeholder='Your Message *'
                    style={{ width: "100%", height: "150px" }}
                    value={contact.messageText}
                    onChange={changeValues}></textarea>
                </div>
              </div>
            </div>
            <Row>
              <div className='col-md-9'>
                <input
                  type='submit'
                  name='btnSubmit'
                  className='btnContact'
                  value='Send Message'
                  onChange={changeValues}
                />
              </div>
            </Row>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ContactSection;

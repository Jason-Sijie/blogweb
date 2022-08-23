import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const AppFooter = (props) => {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      <section className='p-0 border-bottom'>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                MORE INFO
              </h6>
              <p>
                This is a blog website designed for MarkDown writers. 
              </p>
              <p>
                It is a personal project written by  
              </p>
              <p>
                <a className='text-reset fw-bold' href='https://www.linkedin.com/in/sijieyu-jason/'>
                  Sijie Yu
                </a>
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>CONTRIBUTORS</h6>
              <p>
              <a className='text-reset fw-bold' href='https://www.linkedin.com/in/sijieyu-jason/'>
                Sijie Yu
              </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='https://github.com/Jason-Sijie/blogweb' className='text-reset'>
                  Github Repo
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Dalebright Dr, Burnaby, BC, Canada
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                yusj.jason@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 6047156871
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 86 18071026839
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright:{" "}
        <a className='text-reset fw-bold' href='https://www.linkedin.com/in/sijieyu-jason/'>
          Sijie Yu
        </a>
      </div>
    </MDBFooter>
  );
}

export default AppFooter;
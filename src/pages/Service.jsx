import { useAuth } from "../store/auth";
import serviceDesign from "../assets/images/design.png";
export default function Service() {
  const { services } = useAuth();
  
  console.log('service.jsx: ',services);
  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((value, index) => (
      
          // eslint-disable-next-line react/jsx-key
          <div className="card" key={index}>
            <div className="card-img">
              <img src={serviceDesign} alt="our services info" width="200" />
            </div>

            <div className="card-details">
              <div className="grid grid-two-cols">
                <p>{value.provider}</p>
                <p>{value.price}</p>
              </div>
              <h2>{value.service}</h2>
              <p>{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

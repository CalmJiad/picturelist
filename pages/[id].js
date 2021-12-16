export const getServerSidePaths = async () => {
  const res = await fetch(
    "https://api.unsplash.com/photos/?client_id=XJAobh5mpjXy2G1gXy-9c2OVH8zfqi65RHDzcCr0WYU"
  );
  const data = await res.json();

  const paths = data.map((image) => {
    return {
      params: { id: image.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  console.log(id);
  const res = await fetch(
    `https://api.unsplash.com/photos/${id}?client_id=XJAobh5mpjXy2G1gXy-9c2OVH8zfqi65RHDzcCr0WYU`
  );
  const data = await res.json();

  console.log(data);

  return {
    props: { image: data },
  };
};

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";
import Image from "next/image";

const Details = ({ image }) => {
  return (
    <div>
      <h2 className={`${styles.title} text-success`}>
        Individual Picture Details Page
      </h2>
      <div
        className="card m-auto"
        style={{ width: "25rem", border: "2px solid grey" }}
      >
        <div className="card-body">
          <Image
            src={`${image.urls.regular}`}
            width={400}
            height={300}
            className="card-img-top"
            alt=""
          />
          <h5 className="card-title mb-3">Uploaded By: {image.user.name}</h5>
          <p className="card-text">
            Upload Date: {image.created_at.slice(0, 10)}
          </p>
          <p className="card-text">
            Last Updated: {image.updated_at.slice(0, 10)}
          </p>
          <p className="card-text">
            Raw Image Size: {image.width} X {image.height} Pixels
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;

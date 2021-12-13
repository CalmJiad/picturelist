import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const res = await fetch(
    "https://api.unsplash.com/photos/?client_id=XJAobh5mpjXy2G1gXy-9c2OVH8zfqi65RHDzcCr0WYU"
  );
  const data = await res.json();

  return {
    props: { images: data },
  };
};

export default function Home({ images }) {
  return (
    <>
      <head>
        <title>PictureList | Homepage</title>
      </head>
      <div className="container">
        <h1 className={`${styles.title} text-primary`}>
          Picture List By Unsplash
        </h1>
        <div className={styles.grid}>
          <div className={styles.gridContainer}>
            {images.map((image) => (
              <Link href={"/" + image.id} key={image.id}>
                <a className={styles.card}>
                  <Image
                    src={`${image.urls.regular}`}
                    width={400}
                    height={300}
                    className={styles.images}
                    alt=""
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

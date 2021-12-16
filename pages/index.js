import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export const getServerSideProps = async (context) => {
  const totalResult = 10;
  const totalPage = Math.ceil(totalResult / 3);

  let page = context.query?.page || 1;
  // console.log(page);

  const res = await fetch(
    `https://api.unsplash.com/search/photos/?page=${page}&query=random&client_id=XJAobh5mpjXy2G1gXy-9c2OVH8zfqi65RHDzcCr0WYU&per_page=3`
  );
  const data = await res.json();

  return {
    props: { images: data, totalResult, totalPage, page },
  };
};

export default function Home(props) {
  const { images, totalResult, totalPage, page } = props;

  // console.log(images, totalPage, totalResult);
  console.log(images.results);

  return (
    <>
      <Head>
        <title>PictureList | Homepage</title>
      </Head>
      <div className="container">
        <h1 className={`${styles.title} text-primary`}>
          Picture List By Unsplash
        </h1>
        <div className={styles.grid}>
          <div className={styles.gridContainer}>
            {images.results.map((image) => (
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
        {/* Pagination goes here */}
        <div className="d-flex">
          <nav className="m-auto" aria-label="Page navigation example">
            <ul className="pagination">
              <li className={page < 2 ? "disabled page-item" : "page-item"}>
                <Link href={`?page=${page - 1}`}>
                  <a className="page-link">Previous</a>
                </Link>
              </li>
              {Array.from(Array(totalPage), (item, index) => (
                <li className="page-item">
                  <Link href={`?page=${index + 1}`}>
                    <a className="page-link">{index + 1}</a>
                  </Link>
                </li>
              ))}
              <li
                className={
                  page >= totalPage ? "disabled page-item" : "page-item"
                }
              >
                <Link href={`?page=${+page + +1}`}>
                  <a className="page-link">Next</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

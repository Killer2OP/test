import Link from "next/link";
import styles from "./styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Admin</h2>
      <Link className={styles.link} href="/dashboard/home">Home</Link>
      <Link className={styles.link} href="/dashboard/about">About Us</Link>
      <Link className={styles.link} href="/dashboard/products">Products</Link>
      <Link className={styles.link} href="/dashboard/blogs">Blogs</Link>
      <Link className={styles.link} href="/dashboard/clients">Clients / Partners</Link>
      <Link className={styles.link} href="/dashboard/contact">Contact</Link>
      <Link className={styles.link} href="/dashboard/pages">Other Pages</Link>
    </div>
  );
}

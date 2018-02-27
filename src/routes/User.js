import React from "react";
import styles from "./User.css";
import { connect } from "dva";
import Layout from "../components/Layout/Layout";
import UserComponent from "../components/User/User";

function User({ location }) {
  return (
    <Layout location={location}>
      <div className={styles.normal}>
        <UserComponent />
      </div>
    </Layout>
  );
}
export default connect()(User);

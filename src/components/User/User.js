import React from "react";
import { Table, Pagination, Icon, Divider } from "antd";
import "antd/dist/antd.css";
import styles from "./User.css";

export default function User({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current
}) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => text
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
        
        </span>
      )
    }
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    }
  ];
  return (
    <div className={styles.normal}>
      <div>
        {/* <div className={styles.create}>
            <UserModal record={{}} onOk={createHandler}>
              <Button type="primary">Create User</Button>
            </UserModal>
          </div> */}
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={5}
          current={0}
          pageSize={2}
        />
      </div>
    </div>
  );
}

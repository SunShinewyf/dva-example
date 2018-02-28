import React from "react";
import { Table, Pagination, Button, Popconfirm } from "antd";
import { connect } from "dva";
import UserModal from "./UserForm";
import "antd/dist/antd.css";
import styles from "./User.css";

function User({ dispatch, list: dataSource, loading, total, page: current }) {
  console.log(dataSource, "888");

  function createHandler(values) {
    console.log(values,'8888')
    dispatch({
      type: "user/create",
      payload: values
    });
  }
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
        <p>
          <a onClick={() => {}}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要删除吗？" onConfirm={() => {}}>
            <a>删除</a>
          </Popconfirm>
        </p>
      )
    }
  ];
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
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

function mapStateToProps(state) {
  const { list, total, page } = state.user;
  return {
    loading: false,
    list,
    total,
    page
  };
}

export default connect(mapStateToProps)(User);

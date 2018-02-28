import React from "react";
import { Table, Pagination, Button, Popconfirm } from "antd";
import { connect } from "dva";
import UserModal from "./UserForm";
import { routerRedux } from "dva/router";
import "antd/dist/antd.css";
import styles from "./User.css";

function User({ dispatch, list: dataSource, loading, total, page: current }) {
  //添加人员
  function createHandler(values) {
    dispatch({
      type: "user/create",
      payload: values
    });
  }
  //删除人员
  function deleteHandler(id) {
    dispatch({
      type: "user/remove",
      payload: id
    });
  }
  //翻页时的处理
  function pageChangeHandle(page) {
    dispatch(
      routerRedux.push({
        pathname: "/user",
        search: "?page=" + page
      })
    );
  }

  //更新人员信息
  function editHandler(id, values) {
    dispatch({
      type: "user/update",
      payload: { id, values }
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <p>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </UserModal>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => {
              deleteHandler(record.id);
            }}
          >
            <a>&nbsp;&nbsp;删除</a>
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
          total={total}
          current={current}
          pageSize={5}
          onChange={pageChangeHandle}
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

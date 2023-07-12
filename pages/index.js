import Image from "next/image";
import { Inter } from "next/font/google";
import { Pagination, Dropdown, Space, Modal, Button, Spin } from "antd";
import { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-4xl">DEMO</h1>
      <Pagination defaultCurrent={1} total={50} />
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      <Button
        type="primary"
        onClick={() => {
          console.log("hiiiiiii");
          setModal(true);
          setisLoading(true);
          async function getData() {
            const res = await fetch(
              "https://jsonplaceholder.typicode.com/users"
            );
            const data = await res.json();
            setData(data);
            // console.log(data);
            setisLoading(false);
          }
          setTimeout(() => {
            getData();
          }, 2000);
        }}
      >
        Button
      </Button>
      <Modal
        open={modal}
        closable={true}
        onCancel={() => {
          setModal(false);
          setData([]);
        }}
      >
        <Spin spinning={isLoading}>
          <div>
            <h1>List of Users</h1>
            {data.map((item, i) => {
              return <p key={i}>{item?.name}</p>;
            })}
          </div>
        </Spin>
      </Modal>
    </div>
  );
}

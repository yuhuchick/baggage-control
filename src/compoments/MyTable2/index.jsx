import { Table } from "antd";
import React from "react";

const columns = [
    {
        title: '',
        dataIndex: 'num',
        key: 'num',
      },
    {
        title: '报警类型',
        dataIndex: 'type',
        key: 'type',
      },
    {
        title: '摄像头名称',
        dataIndex: 'cName',
        key: 'cName',
      },
      {
        title: '报警截图',
        dataIndex: 'image',
        key: 'image',
        render: (imageUrl) => <img src={imageUrl} alt="User" style={{ width: '50px', height: '50px' }} />,
      },
    {
        title: '报警时间',
        dataIndex: 'aTime',
        key: 'aTime',
      },
]

const data = [
    {
        key:1,
        num:1,
        type:'区域入侵',
        cName:'Camera03',
        image: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
        aTime: '12'
    },
    {
        key:2,
        num:2,
        type:'区域入侵',
        cName:'Camera03',
        image: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
        aTime: '12'
    },
    {
        key:3,
        num:3,
        type:'区域入侵',
        cName:'Camera03',
        image: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
        aTime: '12'
    }
]
export default function MyTable2(){
    return(
        <div>
            <Table 
            columns={columns} 
            dataSource={data} 
            ></Table>
        </div>
    )
}

import React from "react";
import classes from './index.module.css'
import { Table, Form, Input, Select, DatePicker, Button ,Tag, Space, Radio, Switch} from "antd";
import { useState,useEffect } from "react";
import {EditOutlined , DeleteOutlined} from '@ant-design/icons'

const {TextArea} = Input

const data = [
    {
        key: 1,
        num: 1,
        cName: 'Camera03',
        address: 'https://baidu.com',
        tags: ['已停止'],
        device: '设备3',
        note: '无',
        cTime: '2024/03/19',
        
    },
    {
        key: 2,
        num: 2,
        cName: 'Camera03',
        address: 'https://baidu.com',
        tags: ['正常'],
        device: '设备3',
        note: '无',
        cTime: '2024/03/19',
        
    },
  
]

export default function CameraControl() {
    //分页设置
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 3,
        total: 0,
      });
      //存储表格数据
      const [netData,setNetData] = useState(data)
      const handleTableChange = (pagination) => {
        setPagination(pagination);
      };
      const onFinish = (values)=>{
        console.log(values);
      }
        // 新增页面的展示
      const [isModalOpen,setModalOpen] = useState(false)
      //编辑页面的展示
      const [isEditOpen,setEditOpen] = useState(false)
       //打开页面
      const openModal = () => {
        setModalOpen(true);
        //设置背景虚化
        // document.body.classList.add('blur');
      };
    //关闭页面
      const closeModal = () => {
        setModalOpen(false);
        // document.body.classList.remove('blur');
      };
      const openEdit = (record) => {
        console.log('record',record);
        setEditOpen(true);
        //设置背景虚化
        // document.body.classList.add('blur');
      };
    //关闭页面
      const closeEdit = () => {
        setEditOpen(false);
        // document.body.classList.remove('blur');
      };
      //新增摄像头 表单提交事件
      const addFinish = (values) => {
        console.log(values);
      }
      //编辑摄像头表单提交事件
      const editFinish = (values) => {
        console.log(values);
      }
    

      useEffect(()=>{
        //获取数据接口
        // setNetData()
      },[pagination.current, pagination.pageSize])

        //表格列设置
  const columns = [
    {
        title: '',
        dataIndex: 'num',
        key: 'num',
    },
    {
        title: '摄像头名称',
        dataIndex: 'cName',
        key: 'cName',
    },
    {
        title: '边缘计算设备IP地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
          <>
            {tags.map((tag) => {
              let color = 'green';
              if (tag === '已停止') {
                color = 'geekblue';
              }
              
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
    {
        title: '所属边缘设备',
        dataIndex: 'device',
        key: 'device',
    },
    {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
    },
    {
        title: '创建时间',
        dataIndex: 'cTime',
        key: 'cTime',
    },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={()=>openEdit(record)}><EditOutlined/>编辑</a>
            <a><DeleteOutlined />删除</a>
          </Space>
        ),
      },
]

const handleEditClick = (record) => {
  // 在点击编辑时获取该行的数据
  console.log('Clicked row data:', record);
  // 执行其他编辑操作
};
      
    return (
        <div>
            {/* 搜索栏 */}
            <div className={classes.sift}>
                <Form
                    //
                    layout="inline"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="摄像头名称"
                        name='camera'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="状态" 
                        name='status'
                        style={{width: '150px'}}
                    >
                        <Select>
                            <Select.Option value="12345">1111111</Select.Option>
                            <Select.Option value="1235">2222222</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item 
                    label="创建时间"
                    name='time'
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>搜索</Button>
                        <Button>重置 </Button>
                    </Form.Item>
                </Form>
            </div>
            {/* 新增删除栏 */}
            <div className={classes.cdPart}>
                <Button type="primary" style={{marginRight: '10px'}} onClick={openModal}>新增</Button>
                <Button>删除</Button>
            </div>
            {/* 表格栏 */}
            <div>
                <Table
                    columns={columns}
                    dataSource={netData}
                    pagination={pagination}
                    onChange={handleTableChange}
                    renderRowActions={(record) => (
                      <Space size="middle">
                        <a onClick={() => handleEditClick(record)}>
                          <EditOutlined />编辑
                        </a>
                        <a>
                          <DeleteOutlined />删除
                        </a>
                      </Space>
                    )}
                ></Table>
            </div>
            {/* 新增页面 */}
            {
                isModalOpen ?

                        <div className={classes.addCamera}>
                            {/* <span className={classes.title}>新增摄像头</span> */}
                            <div className={classes.topCon}>
                                <div className={classes.title}>新增摄像头</div>
                                <div className={classes.close} onClick={closeModal}>X</div>
                            </div>
                            <div className={classes.contain}>
                              <Form 
                              onFinish={addFinish}
                              >
                                <Form.Item
                                label='摄像头名称' name="CName" style={{width:'450px',marginTop: '20px',marginBottom:'15px'}}
                                labelCol={{
                                  span: 7
                                }}
                                >
                                  <Input  placeholder="请输入摄像头名称"></Input>
                                </Form.Item>
                                <Form.Item
                                label='摄像头视频流地址' name="CAddress" style={{width:'450px',marginBottom:'15px'}}
                                labelCol={{
                                  span: 7
                                }}
                                >
                                  <Input placeholder="请输入视频流地址"></Input>
                                </Form.Item>
                                <Form.Item
                                label='备注' name="tips" style={{width:'450px'}}
                                labelCol={{
                                  span: 7
                                }}
                                >
                                  <TextArea rows={2} placeholder="请输入备注"/>
                                </Form.Item>
                                <Form.Item>
                                  <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>确认</Button>
                                  <Button onClick={closeModal}>取消</Button>
                                </Form.Item>
                              </Form>
                            </div>
                        </div>: <></>
            }
            {/* 编辑页面 */}
            {
              isEditOpen ? 
              <div className={classes.editCamera}>
                   <div className={classes.topCon}>
                                <div className={classes.title}>编辑摄像头</div>
                                <div className={classes.close} onClick={closeEdit}>X</div>
                   </div>
                   <div className={classes.container}>
                    <Form
                    onFinish={editFinish}
                    >
                      <Form.Item label='摄像头编号' name='id' style={{width:'450px',marginTop: '20px',marginBottom:'15px',textAlign:'left'}}
                       labelAlign="left"
                      >
                        <span>1</span>
                      </Form.Item>
                      <Form.Item label='摄像头名称' name='name' style={{width:'450px',marginBottom:'15px',textAlign:'left'}}
                         labelAlign="left"

                      >
                        <span>camera1</span>
                      </Form.Item>
                      <Form.Item label='摄像头视频流地址' name='address' style={{width:'450px',marginBottom:'15px',textAlign:'left'}}
                       labelAlign="left"

                      >
                        <span>192.168.0.1</span>
                      </Form.Item>
                      <Form.Item label='是否推流' name='frempp' style={{width:'450px',marginBottom:'15px',textAlign:'left'}}
                       labelAlign="left"

                      >
                         <Switch/>
                      </Form.Item>
                      <Form.Item label='推流至'  name='fremppWhere' style={{width:'450px',marginBottom:'15px',textAlign:'left'}}
                       labelAlign="left"
                       >
                        <Select placeholder='边缘设备1'>
                          <Select.Option value='边缘设备1'>边缘设备1</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label='备注'  name='tips' style={{width:'450px',marginBottom:'15px',textAlign:'left'}}>
                        <TextArea placeholder="请输入备注" rows={2}/>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" style={{marginRight: '10px'}} htmlType="submit">确定</Button>
                        <Button onClick={closeEdit}>取消</Button>
                      </Form.Item>
                    </Form>
                   </div>
              </div>
               : <></>
            }
        </div>
    )
}

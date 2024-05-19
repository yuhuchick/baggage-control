import React from "react";
import classes from './index.module.css'
import { Table, Form, Input, Select, DatePicker, Button, Pagination } from "antd";
import { useState,useEffect } from "react";
import instance from "../../api/instance";
import moment from "moment";
import { message } from "antd";

const { RangePicker } = DatePicker;
const columns = [
    {
        title: '',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '报警类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '摄像头名称',
        dataIndex: 'cameraNo',
        key: 'cameraNo',
    },
    {
        title: '报警截图',
        dataIndex: 'picLink',
        key: 'picLink',
        render: (imageUrl) => <img src={imageUrl} alt="User" style={{ width: '50px', height: '50px' }} />,
    },
    {
        title: '报警时间',
        dataIndex: 'alarmDate',
        key: 'alarmDate',
    },
]

const data1 = [
    {
        key: 1,
        cameraNo: 1,
        type: '区域入侵',
        cName: 'Camera03',
        picLink: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
        alarmDate: '12'
    },
    {
        key: 2,
        cameraNo: 2,
        type: '区域入侵',
        cName: 'Camera03',
        picLink: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
        alarmDate: '12'
    },
    {
        key: 3,
        cameraNo: 3,
        type: '区域入侵',
        cName: 'Camera03',
        picLink: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
        alarmDate: '12'
    },
    {
        key: 4,
        cameraNo: 4,
        type: '区域入侵',
        cName: 'Camera03',
        picLink: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
        alarmDate: '12'
    },
    {
        key: 5,
        cameraNo: 5,
        type: '区域入侵',
        cName: 'Camera03',
        picLink: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
        alarmDate: '12'
    }
]

export default function AlarmControl() {
    //每页数据个数
    const [pageSize, setPageSize] = useState(5);
    //每页数据
    const [data,setData] = useState(data1)
    //所处页数
    const [currentPage, setCurrentPage] = useState(1);
    //表格数据总数
    const [total,setTotal] = useState(1)
    //翻页请求接口
    // useEffect(() => {
    //   const fetchData = async () => {
    //       try {
    //         const response = await instance.get(`/alarm?page=${currentPage}`);
    //         if(response){
    //             setData(response.data.alarmList);
    //             setTotal(response.data.number)
    //         }
    //         // 处理错误
    //       }catch{
    //         setData(null)
    //         setTotal(0)
    //       }finally {

    //       }
    //     }
    //   fetchData();
    // }, [currentPage]);
    //翻页点击
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    //搜索栏
      const onFinish = (values)=>{
        console.log('values',values.time[0]);
        const type = values.type
        const start = moment(values.time[0]).format('YYYY-MM-DD')
        const end = moment(values.time[1]).format('YYYY-MM-DD')
        const judgeStart = start !== 'Invalid date' ? start : null
        const judgeEnd = end !== 'Invalid date' ? end : null
        console.log(judgeStart);
        console.log(judgeEnd);
        const getSearch = async()=>{
            try{
                if(judgeStart && judgeEnd){
                    const data3 = await instance.get(`/alarm?type=${type}&start=${judgeStart}&end=${judgeEnd}`)
                    console.log('data3',data3);
                }else if(!judgeStart){
                    const data3 = await instance.get(`/alarm?type=${type}&end=${judgeEnd}`)
                    console.log('data3',data3);
                }else if(!judgeEnd){
                    const data3 = await instance.get(`/alarm?type=${type}&start=${judgeStart}`)
                    console.log('data3',data3);
                }
                setData(data.data.alarmList)
                setTotal(data.data.number)
            }catch{
                setData(null)
                setTotal(0)
            }
        }
        getSearch()
      }
      
    return (
        <div className={classes.alarmData}>
            {/* 搜索栏*/}
            <div className={classes.sift}>
                <Form
                    //
                    layout="inline"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="摄像头名称"
                        name='camera'
                        wrapperCol={{
                            span: 12
                        }}
                        style={{width: '180px'}}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="报警类型" 
                        name='type'
                        style={{width: '150px'}}
                        labelCol={{
                            span: 12,
                          }}
                    >
                        <Select>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item 
                    label="报警时间"
                    name='time'
                    style={{width: '320px'}}
                    labelCol={{
                      span: 8  
                    }}
                    >
                        <RangePicker 
                        allowEmpty={[true,true]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>搜索</Button>
                        <Button>重置</Button>
                    </Form.Item>
                </Form>
            </div>
            {/* 表格栏 */}
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                ></Table>
            </div>
            {/* 新增栏 */}
            <div className={classes.pagination}>
            <Pagination
       current={currentPage}
       total={total}
       defaultPageSize={10}
       pageSize={pageSize}
       onChange={handlePageChange}
      />
            </div>
        </div>
    )
}

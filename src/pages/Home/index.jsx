import React, { useState, useEffect } from "react";
import classes from './index.module.css'
import MyVideo from "./compoments/MyVideo";
import {DatePicker} from 'antd'
import MyCharts from './compoments/MyCharts'
import RowBarChart from "./compoments/RowBarChart";
import SecondCard from "./compoments/SecondCard";
import MyCard from "./compoments/MyCard";
import MyTimer from "./compoments/MyTimer";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
// import WebSocket from 'ws';

const { Search } = Input;

const {RangePicker} = DatePicker
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const data = [
  {
    type: '1',
    algorithm: 'Camera-03 区域入侵',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '2',
    algorithm: 'Camera-03 行李掉落',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '1',
    algorithm: 'Camera-03 区域入侵',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '3',
    algorithm: 'Camera-03 行李滞留',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '2',
    algorithm: 'Camera-03 行李掉落',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '1',
    algorithm: 'Camera-03 区域入侵',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '3',
    algorithm: 'Camera-03 行李滞留',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '1',
    algorithm: 'Camera-03 区域入侵',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '2',
    algorithm: 'Camera-03 行李掉错',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
  {
    type: '1',
    algorithm: 'Camera-03 区域入侵',
    imgsrc: 'https://bpic.588ku.com/element_origin_min_pic/20/01/16/5d72cf4bbc297a5eee3e8489a431dac1.jpg',
    time: '2024-03-26 19:34:44'
  },
]

const data2 = [
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
  {
    name: '003',
    ip: '192.168.127.1',
    storage: '10G'
  },
]

export default function Home(){
  
    //视频流
  const [videos,setVideos] = useState([])
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = function () {
      console.log('连接成功！');
    };

    ws.onclose = function () {
      console.log('WebSocket disconnected');
    };

    ws.onmessage = function (event) {
      // 处理接收到的视频流数据
      const videoData = event.data;
      // 在这里更新视频播放器等
      console.log('video',videoData);
      setVideos(prevVideos => [videoData, ...prevVideos]);
    };

    return () => {
      ws.close();
    };
  }, []);
    

    // 渲染实时时间

    return(
        <div className={classes.container}>
            {/* 监控视频区域 */}
            <div className={classes.videos}>
                <div className={classes.titleBox}>
                    <span>报警视频</span>
                   <MyTimer/>
                </div>
                <div className={classes.videosBox}>
                  {/* {
                    videos.map((item,index) =>{
                      return <MyVideo key={index} props={item}/>
                    })
                  } */}
                  {
                    videos.length ?
                    <video controls autoPlay width={200} height={100}>
                    <source src={URL.createObjectURL(new Blob([videos[0]]))} type="video/mp4" />
                   </video>
                    : <div>暂无视频流...</div>
                  }
                
                  </div>
            </div>
            {/* 报警记录区域 */}
            <div className={classes.alarmRecords}>
                <div className={classes.titleBox}>
                    <span>报警记录</span>
                    <RangePicker style={{width: '30%',height: '100%',fontSize: '10px'}} placeholde='开始日期'/>
                </div>
                <div className={classes.recordsBox}>
                  <MyCharts/>
                </div>
            </div>

            {/* 报警信息区域 */}
            <div className={classes.alarmInformation}>
                <div className={classes.titleBox}>
                    <span style={{marginLeft: '20px'}}>报警信息</span>
                </div>
                <div className={classes.informationBox}>
                  {
                    data.map((item,index)=><MyCard key={index} props={item}/>)
                  }
                </div>
            </div>
            {/* 设备运行状态区域 */}
            <div className={classes.devicesStatus}>
              <div className={classes.titleBox} style={{height: '32px',lineHeight: '32px'}}>
                    <span style={{marginLeft: '20px'}}>设备运行状态</span>
                    <Search
                      placeholder="input search text"
                      onSearch={onSearch}
                      style={{
                      width: 200,
                      height: '10%'
                            }}
                    />
              </div>
              <div className={classes.cardBox}> 
                {
                  data2.map((item,index)=><SecondCard key={index} props={item}/>)
                }
              </div>
              {/* <div className={classes.statusBox}>
                <div className={classes.titleBox} style={{color: '#fff',fontSize: '12px'}}>
                  <span>设备名称 ： 03</span>
                  <span>ip: 192.168.17.1</span>
                </div> 
                       <RowBarChart/>
              </div> */}
            </div>
            
        </div>
    )
}

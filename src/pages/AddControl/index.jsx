import React, { useEffect, useRef, useState } from "react";
import classes from './index.module.css';
import ReactPlayer from 'react-player';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from 'antd';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

export default function AddControl() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  //视频控制栏
  const [displayControls, setDisplayControls] = useState(true);
  //绘图板显示与否
  const [displayDrawing, setDisplayDrawing] = useState(false);
  //存储点集
  const [points, setPoints] = useState([]);
  //检测何时开始生成动态连线
  const [startLine, setStartLine] = useState(false)
  //存储鼠标移动时的动态点集
  const [movePoints, setMovePoints] = useState([])
  //存储视频流
  const [videos,setVideos] = useState('http://')
  const [componentDisabled, setComponentDisabled] = useState(true);
  
  //清空绘图板
  const clearDraw = () => {
    const canvas = canvasRef.current;
    if(canvas){
      const ctx = canvas.getContext('2d');
      //每次状态改变时清除原来的图像
      setPoints([])
      setMovePoints([])
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  //设置绘图板状态
  const startDraw = () => {
    setDisplayDrawing((prevDisplayDrawing) => !prevDisplayDrawing);
    clearDraw()
  };

  //绘图版点击后生成点
  const handleMouseDown = (event) => {
    //确认有点生成后生成动态连线
    setStartLine(true)
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newPoint = { x, y };
    setPoints((prevPoints) => [...prevPoints, newPoint]);

  };
  //鼠标移动形成动态连线
  const handleMouseMove = (event) => {
    if (startLine) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const newPoint = { x, y };
      setMovePoints((prevPoints) => [...prevPoints, newPoint]);

    }
  };


  //播放视频
  const playVideo = ()=>{
    setIsPlaying(()=>true)
  }
  //停止播放
  const stopVideo = ()=>{
    setIsPlaying(()=>false)
  }
  //获取视频流
  const handleValuesChange = (changedValues) => {
    const {videoStream} = changedValues
    setVideos(videoStream)
    // 在这里处理选择的值
  };
  //画图板lian
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      //每次状态改变时清除原来的图像
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //重新生成
      for (let j = 0; j < movePoints.length; j++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < points.length; i++) {
          //检测到四个点时清除原来的图像和点集
          if (i === 3) {
            setPoints([])
            setMovePoints([])
            break;
          }
          //绘制点
          const { x, y } = points[i];
          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
          //绘制点与点之间的连线 点数量大于2时绘制
          if (i > 0) {
            const prevPoint = points[i - 1];
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(x, y);
            ctx.stroke();
            if (i === 2) {
              //检测到三个点时连接第一个点和最后一个点
              ctx.beginPath();
              ctx.moveTo(points[0].x, points[0].y);
              ctx.lineTo(x, y);
              ctx.stroke();
              setStartLine(false)

            }
          }
        }
        // 绘制动态点与鼠标之间的动态连线
        if(points.length - 1 >= 0){
          const { x, y } = points[points.length - 1];
          const prevPoint = movePoints[j];
          ctx.strokeStyle = 'red';
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
    }
  }, [canvasRef, points, movePoints]);

  //监听屏幕宽度变化
 const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasContainer = canvas.parentNode;
      const widthPercentage = 100; // 设置宽度为父元素的百分比
      const heightPercentage = 100; // 设置高度为父元素的百分比
      
      if (window.innerWidth < 1060) {
        canvasContainer.style.width =  '880px'
        console.log('canvas',canvasContainer.offsetWidth);
        canvas.width = canvasContainer.offsetWidth * (widthPercentage / 100);
        canvas.height = canvasContainer.offsetHeight * (heightPercentage / 100);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const itemWidth = screenWidth < 1060 ? '100%' : '640px';
  const itemHeight = screenWidth < 1060 ? 'auto' : '360px';
  const itemStyle = { textAlign: 'left' ,marginBottom: '10px'}

  return (
    <div>
      <div className={classes.addVideo}>
        {/* 视频播放器 */}
        <div className={classes.player}>
          <ReactPlayer
            url={videos}
            controls={displayControls}
            width={itemWidth}
            height={itemHeight}
            playing={isPlaying}
            onPlay={playVideo}
            onPause={stopVideo}
          />
          <div className={classes.displayDraw}>
            <button onClick={startDraw}>
              {displayDrawing ? '关闭' : '开启'}算法识别功能
            </button>
            <button onClick={clearDraw}>清空算法识别区域</button>
          </div>
        </div>
        {/* 添加控件功能 */}
        <div className={classes.player_function}>
          <Form
            {...formItemLayout}
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 14,
            }}
            size="small"
            layout="horizontal"
            // disabled={componentDisabled}
            style={{
              maxWidth: 300,
            }}
            onValuesChange={handleValuesChange}
            
          >
            <Form.Item label="布控编号" style={itemStyle}>
              {/* <Input /> */}
              <span>1212718278</span>
            </Form.Item>
            <Form.Item label="选择视频流" name='videoStream' style={itemStyle}> 
              <Select>
                <Select.Option value="https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4">视频流一</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="视频信息" style={itemStyle}>
              <Input />
            </Form.Item>
            <Form.Item label="音频信息" style={itemStyle}>
              <Input />
            </Form.Item>
            <Form.Item label="播放地址" style={itemStyle}>
              <Input />
            </Form.Item>

            <Form.Item label="播放控制" style={itemStyle}>
              <Button onClick={playVideo}>播放视频</Button>
              <Button onClick={stopVideo}>停止播放</Button>
            </Form.Item>

            <Form.Item label="选择算法" style={itemStyle}>
              <Select>
                <Select.Option value="选择算法">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="选择目标" style={itemStyle}>
              <Select>
                <Select.Option value="选择算法">行李</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="是否推流" style={itemStyle}>
              <Radio.Group>
                <Radio value="算法处理的视频不推流"> 算法处理的视频不推流 </Radio>
                <Radio value="算法处理的视频推流"> 算法处理的视频推流 </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="报警间隔" style={itemStyle}>
              <InputNumber />
            </Form.Item>
            <Form.Item label="分类阈值" style={itemStyle}>
              <InputNumber />
            </Form.Item>
            <Form.Item label="IOU阈值" style={itemStyle}>
              <InputNumber />
            </Form.Item>
            <Form.Item label="备注" style={itemStyle}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item 
            label=" "
            colon={false}
            style={itemStyle}
            >
            <div className={classes.confirm}>
            <Button className={classes.reserve}>保存</Button>
            <Button className={classes.addControl}>布控</Button>
            <Button className={classes.deleteControl}>取消布控</Button>
            </div>
            </Form.Item>


          </Form>
         
        </div>
        {/* 绘图板 */}
        {displayDrawing ? (
          <div className={classes.drawingBoard}>
            <canvas
              id="myCanvas"
              width="640"
              height="360"
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
            />
          </div>
        ) : null}
      </div>
    </div>

  );
}
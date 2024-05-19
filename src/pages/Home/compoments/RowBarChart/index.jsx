import * as echarts from 'echarts';
import React from 'react';
import { useRef, useEffect } from 'react';
import classes from './index.module.css'



export default function RowBarChart(){
    const ref = useRef()
    useEffect(()=>{
        const myChart = echarts.init(ref.current);
        const option = {
            title: [
                {
                    text: '',
                    textStyle: {
                        fontSize: 20,
                        color: '#fff',
                        fontWeight:600,
                    },
                    x: '25%',
                    y: '3%',
                },
            ],
            grid: {
               left: '20%',
            //   right: '20%',
              top: '10%',
              bottom: '0%',
           },
           xAxis: {
              show: false,
              type: 'value',
              max: 100
           },
           yAxis: [
              {
                 type: 'category',
                 // offset: 30,
                 inverse: true,
                 axisLine: {
                    show: false
                 },
                 axisTick: {
                    show: false
                 },
                 axisLabel: {
                    color: '#fff',
                    align: 'left',
                    verticalAlign: 'bottom',
                    position: 'right',
                    padding: [0, 0, -10, -25],
                    fontSize: 14,
                 },
                 data: ['CPU','内存','温度','硬盘']
              }
           ],
           tooltip: {
              trigger: 'item',
              formatter: function(params) {
               // 获取数据值
               var value = params.value;
               // 将数据值转换为百分比形式
               var percentage = value + '%';
               // 返回自定义的tooltip内容
               if(params.data.type){
                  return params.data.type+ ' ' + percentage;
               }
               else{
                  return ''
               }
           }
           },
           
           series: [
            {
               name: '图形',
               type: 'bar',
               barWidth: 20,
               itemStyle: {
                     borderRadius: [15],
                     color: function(params) {
                        // 获取数据值
                        var value = params.data.value;
                        var type = params.data.type;
                        console.log('params',params);
                        // 判断数据值是否符合条件
                        if (value > 75 && (type === 'CPU' || type === '温度')) {
                            return 'red'; // 超过75%的CPU使用率和温度使用红色显示
                        } else if (value > 50 && (type === '内存' || type === '硬盘')) {
                            return 'red'; // 超过50%的内存使用率和硬盘使用红色显示
                        } else {
                            return 'green'; // 其他情况使用绿色显示
                        }
                    },
                     label: {
                        show: true,
                        position: 'inside',
                  },
               },
               emphasis: {
                  itemStyle: {
                     color: 'gold',
                  },
               },
               data: [
                  {
                     value: 90,
                     type: 'CPU'
                  },
                  {
                     value: 30,
                     type: '内存'
                  },
                  {
                     value: 40,
                     type: '温度'
                  },
                  {
                     value: 70,
                     type: '硬盘'
                  },
               ],
               // z: 11
            },
            {
                name: '背景',
                type: 'bar',
                barGap: '-100%',
                data: [100, 100, 100, 100, 100],
                barWidth: 20,
                itemStyle: {
                    normal: {
                        color: '#fff',
                        borderWidth: 1,
                        barBorderRadius: 15,
                    }
                },
                z: 1
            },
         ]
        };
        myChart.setOption(option);
        window.addEventListener('resize', () => {
          myChart.resize();
        });
    },[])
    return(
        <div ref={ref} className={classes.container}></div>
    )
}
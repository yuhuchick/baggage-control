import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import classes from './index.module.css'

export default function MyCharts(){
    const ref = useRef()
    useEffect(()=>{
        const myChart = echarts.init(ref.current);
        const option = {
          legend: {},
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['区域入侵', '软包未装框', '行李掉落', '行李滞留', '其他']
          },
          yAxis: {
            type: 'value',
            min: 0,
          },
          series: [
            {

              data: [
                {
                  value: 200,
                  itemStyle: {
                    color: '#a90000'
                  }
                },
                {
                  value: 50,
                  itemStyle: {
                    color: 'red'
                  }
                },
                {
                  value: 100,
                  itemStyle: {
                    color: 'blue'
                  }
                },
                {
                  value: 150,
                  itemStyle: {
                    color: 'pink'
                  }
                },
                {
                  value: 250,
                  itemStyle: {
                    color: 'green'
                  }
                },
                
              ],
              type: 'bar',
              barWidth: '30px',
              itemStyle: {
                label: {
                  show: true,
                  position: 'inside',
                  formater: 'hello'
                }
              }
            }
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
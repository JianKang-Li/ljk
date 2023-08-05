# ECharts

[ECharts官方文档](https://echarts.apache.org/zh/api.html#echarts.connect)

## 初始化容器

+ 设置大小可以在html元素上设置
+ 也可以在echarts实例上设置

echarts.init()

指定容器大小

```html
<div id="main"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'), null, {
    width: 600,
    height: 400
  });
</script>
```

改变容器大小时改变图表大小

```javascript
window.onresize = function() {
    myChart.resize({
      // 单独设置大小，不填参数则等于容器大小
      width:800,
      height:400
    });
};
```

第一个ECharts实例

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 引入 echarts.js -->
  <script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
  <title>ECharts</title>
  <style>
  </style>
</head>

<body>

  <!-- 图表容器  -->
  <div id="main"></div>

  <script>
    // 创建实例
    let mychart = echarts.init(document.querySelector("#main"),null,{
      width: 500;
      height: 400;
    })

    // 设置图表选项
    var option = {
      // 图标标题
      title: {
        text: '第一个 ECharts 实例'
      },
      // 提示信息
      tooltip: {},
      // 图例组件
      legend: {
        data: ['销量']
      },
      // X轴
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      // Y轴
      yAxis: {},
      // 系列列表
      series: [{
        name: '销量',//系列名称
        type: 'bar',//系列图标类型
        data: [5, 20, 36, 10, 10, 20]//系列中的数据内容
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    mychart.setOption(option);
  </script>
</body>

</html>
```

每个系列通过 type 决定自己的图表类型：

+ type: 'bar'：柱状/条形图
+ type: 'line'：折线/面积图
+ type: 'pie'：饼图
+ type: 'scatter'：散点（气泡）图
+ type: 'effectScatter'：带有涟漪特效动画的散点（气泡）
+ type: 'radar'：雷达图
+ type: 'tree'：树型图
+ type: 'treemap'：树型图
+ type: 'sunburst'：旭日图
+ type: 'boxplot'：箱形图
+ type: 'candlestick'：K线图
+ type: 'heatmap'：热力图
+ type: 'map'：地图
+ type: 'parallel'：平行坐标系的系列
+ type: 'lines'：线图
+ type: 'graph'：关系图
+ type: 'sankey'：桑基图
+ type: 'funnel'：漏斗图
+ type: 'gauge'：仪表盘
+ type: 'pictorialBar'：象形柱图
+ type: 'themeRiver'：主题河流
+ type: 'custom'：自定义系列

## 饼图

```javascript
let pies = echarts.init(document.querySelector("#pie"), null, {
  width: 400,
  height: 400
})

pies.setOption({
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "55%",//饼图半径为容器高宽较小的一项
      tooltip: {},
      data: [
        { value: 235, name: "视频广告" },
        { value: 100, name: "浏览器广告" },
        { value: 235, name: "邮箱" },
        { value: 100, name: "传单" },
      ],
      itemStyle: {
        normal: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
```

通过设置参数 roseType: 'angle' 把饼图显示成南丁格尔图。

itemStyle 参数可以设置诸如阴影、透明度、颜色、边框颜色、边框宽度等：

```js
itemStyle: {
    normal: {
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
}
```

## 环状图

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 引入 echarts.js -->
  <script src="./echarts.min.js"></script>
  <title>ECharts</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #main {
      width: 500px;
      height: 400px;
    }
  </style>
</head>

<body>

  <!-- 绘制图标容器，有高度 -->
  <div id="main"></div>

  <script>
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: "环状图"
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          // 名称
          name: "Acess Form",
          // 环状图内环和外环半径
          radius: ['30%', '70%'],
          // 指定类型
          type: 'pie',
          avoidLabelOverlap: false,
          // 类目名称
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          // 每个环状图对应数据和名称
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);


  </script>
</body>

</html>
```



## 样式设置

ECharts4 开始，除了默认主题外，内置了两套主题，分别为 light 和 dark

```js
var chart = echarts.init(dom, 'light');
var chart1 = echarts.init(dom, 'dark');
```

自定义主题
[主题编辑器](https://echarts.apache.org/zh/theme-builder.html)

## 调色盘

+ 调色盘可以在 option 中设置。
+ 调色盘给定了一组颜色，图形、系列会自动从其中选择颜色。
+ 可以设置全局的调色盘，也可以设置系列自己专属的调色盘。

```js
option = {
    // 全局调色盘。
    color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

    series: [{
        type: 'bar',
        // 此系列自己的调色盘。
        color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
        ...
    }, {
        type: 'pie',
        // 此系列自己的调色盘。
        color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
        ...
    }]
}
```

## 直接样式设置

很多地方可以设置 itemStyle、lineStyle、areaStyle、label 等等。这些的地方可以直接设置图形元素的颜色、线宽、点的大小、标签的文字、标签的样式等等

## 高亮样式emphasis

在鼠标悬浮到图形元素上时，一般会出现高亮的样式。默认情况下，高亮的样式是根据普通样式自动生成的。

如果要自定义高亮样式可以通过 emphasis 属性来定制：

```js
// 高亮样式。
emphasis: {
  itemStyle: {
      // 高亮时点的颜色
      color: 'red'
  },
  label: {
      show: true,
      // 高亮时标签的文字
      formatter: '高亮时显示的标签内容'
  }
},
```

## 异步加载数据

可以配合 jQuery等工具，在异步获取数据后通过 setOption 填入数据和配置项就行

加载动画(echarts自带的loading效果)

```js
var myChart = echarts.init(document.getElementById('main'));
myChart.showLoading();  // 开启 loading 效果
$.get('https://www.runoob.com/static/js/echarts_test_data.json', function (data) {
    myChart.hideLoading();  // 隐藏 loading 效果
    myChart.setOption({
        series : [
            {
                name: '访问来源',
                type: 'pie',    // 设置图表类型为饼图
                radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                data:data.data_pie
            }
        ]
    })
}, 'json')
```

## 数据动态更新

+ ECharts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。

+ 所有数据的更新都通过 setOption 实现，你只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了那些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。

## 数据集（dataset）

+ ECharts 使用 dataset 管理数据。

+ dataset 组件用于单独的数据集声明，从而数据可以单独管理，被多个组件复用，并且可以基于数据指定数据到视觉的映射。

```js
option = {
    legend: {},
    tooltip: {},
    dataset: {
        // 提供一份数据。
        source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
    },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: {type: 'category'},
    // 声明一个 Y 轴，数值轴。
    yAxis: {},
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]
}
```

**系列数据中必须设置name才能显示图例**

## 主要配置项

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 引入 echarts.js -->
  <script src="./echarts.min.js"></script>
  <title>ECharts</title>
  <style>
    body {
      margin: 0;
      padding: 0;
    }

    #main {
      width: 500px;
      height: 400px;
    }
  </style>
</head>

<body>

  <!-- 绘制图标容器，有高度 -->
  <div id="main"></div>

  <script>
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      // 标题
      title: {
        // 是否显示标题
        show: true,
        // 标题文字
        text: "各学科学员人数",
        // 主标题样式
        textStyle: {
          color: "#123456",
          fontSize: 25
        },
        // 父标题
        subtext: "副标题",
        // 标题对齐方式
        left: "left",
        top: 0
      },
      // 直角坐标系X轴
      xAxis: {
        // 名称
        name: "学科",
        // 表示X轴充当类目轴
        type: 'category',
        // 数据
        data: ['JAVA', 'python', 'web', '测试', 'UI'],
        // 坐标轴线样式
        axisLine: {
          show: true
        },
        // 刻度线
        axisTick: {
          show: false
        }
      },
      legend: {
        left: 300,
        top: 80,
        // 设置图例形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        icon: "roundRect",
        // 设置文本样式
        textStyle: {
          color: "#000"
        }
      },
      // 设置整个坐标轴位置
      grid: {
        top: 110,
        left: 40,
        // 是否包含刻度线
        containLabel: false,
      },
      // Y轴配置
      yAxis: {
        name: "数量",
        // 充当数量轴
        type: 'value',
        axisLine: {
          show: true
        }
      },
      // 鼠标经过提示框
      tooltip: {
        // 是否显示提示框
        show: true,
        // 触发条件
        // triggerOn: "click",
        // 鼠标是否可以进入提示框
        enterable: true,
        // 对提示框文字格式化
        formatter: function (options) {
          // console.log(options);
          return options.name + "的数量是:" + options.data
        }
      },
      // 系列数据
      series: [
        {
          name: "在校学员",
          // 数量轴需要的数据
          data: [150, 80, 70, 110, 130],
          // 指定为柱状图可选值bar,line,pie
          type: 'bar',
          // 设置是否显示背景
          showBackground: true,
          // 设置背景样式
          backgroundStyle: {
            color: "rgba(180,180,180,0.2)"
          },
          /*  itemStyle: {
             color: "red"
           }, */
          // 设置鼠标经过样式
          emphasis: {
            itemStyle: {
              color: "yellow"
            }
          },
          label: {
            // 是否显示当前类目数量
            show: true,
            position: 'top',
            rotate: 60
          },
          // 柱子宽度
          barWidth: 30
        },
        {
          name: "毕业学员",
          // 数量轴需要的数据
          data: [10, 8, 40, 10, 30],
          // 指定为柱状图可选值bar,line,pie
          type: 'bar',
          // 设置是否显示背景
          showBackground: true,
          // 设置背景样式
          backgroundStyle: {
            color: "rgba(180,180,180,0.2)"
          },
          // 内部元素样式
          /* itemStyle: {
            color: "pink"
          }, */
          // 柱子宽度
          barWidth: 30
        }
      ],
      // 在系列数据中设置了颜色会无效
      color: ['green', 'blue'],
      // 工具栏，内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置工具
      toolbox: {
        feature: {
          saveAsImage: {},
          dataView: {},
          dataZoom: {},
          restore: {},
          magicType: {
            type: ["bar", 'line']
          }
        }
      }
    };

    option && myChart.setOption(option);


  </script>
</body>

</html>
```

## 事件

```js
// 只监听组件
myChart.on('click', (e) => {
    console.log(e);
})

// 注册事件并限制执行条件
/*    myChart.on('click', { seriesName: "毕业学员" }, (e) => {
         console.log(e);
       }) */


//  监听空白处事件
/* myChart.getZr().on("click", (e) => {
      console.log(e, 'zender事件');
    }) */



document.querySelector('#btn').onclick = function () {
    // 交互事件
    myChart.dispatchAction({
        // 事件类型
        type: "highlight",
        // 事件参数
        seriesIndex: 0,
        dataIndex: 4,
    })

    myChart.dispatchAction({
        // 事件类型
        type: "showTip",
        // 事件参数
        seriesIndex: 0,
        dataIndex: 4,
    })
}
```

## 主题

```js
// 指定主题
    var myChart = echarts.init(chartDom, 'dark');
```

```js
//销毁实例
echarts.dispose(chartDom)

//清空图表
myChart.clear()

//重置尺寸
myChart.resize()
```

## 地图

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Echart 中国地图</title>
  <script src="./echarts.min.js"></script>
  <style>
    body {
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #container {
      width: 900px;
      height: 700px;
    }
  </style>
</head>

<body>

  <div id="container"></div>

  <script>
    // 获取绘制容器
    const dom = document.querySelector("#container")
    const myChart = echarts.init(dom)
    fetch('./china.json', {
      methods: 'GET'
    }).then(res => {
      return res.json()
    }).then(res => {
      // console.log(res)
      //注册地图
      echarts.registerMap('china', res)
      // 准备配置对象
      const options = {
        title: {
          text: "中国地图",
          left: "center",
          top: 16
        },
        geo: {
          map: "china",
          zoom: 1,
          // 是否可以拖拽
          roam: true,
        },
        itemStyle: {
          areaColor: '#ee3f4d'
        },
        emphasis: {
          itemStyle: {
            areaColor: "#fba414",
            borderWidth: 2,
            borderType: "dashed",
            borderColor: "red"
          }
        }
      }

      // 设置配置对象绘制地图
      myChart.setOption(options)
    })
  </script>

</body>

</html>
```


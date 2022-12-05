import {reactive} from "vue";

const dynamicColumnAndDataModel = reactive({
  DEFAULT: [
    {
      key: '0',
      title: '栏目名称',
      dataIndex: 'name',
      align: 'left',
      width: 150,
    },
    {
      key: '1',
      title: '显示',
      dataIndex: 'check',
      align: 'center',
      slots: { customRender: 'checkBox' },
    },
    {
      key: '3',
      title: '显示名称',
      dataIndex: 'nameNew',
      width: 150,
      align: 'center',
      slots: { customRender: 'nameInput', },
    },
    {
      key: '4',
      title: '宽度(范围)',
      dataIndex: 'width',
      align: 'center',
      width: 140,
      slots: { customRender: 'widthInput', },
    },
    {
      key: '5',
      title: '对齐方式',
      dataIndex: 'align',
      align: 'center',
      width: 140,
      slots: { customRender: 'alignRadio' },
    }
  ],
  J:[
    {
      key: '0',
      name: '状态',
      nameNew: '状态',
      check: true,
      width: 60,
      max: 120,
      min: 60,
      align: 'center'
    },
    {
      key: '12',
      name: '临近天数',
      nameNew: '临近天数',
      check: true,
      width: 60,
      max: 120,
      min: 60,
      align: 'center'
    },
    {
      key: '1',
      name: '仓储位置',
      nameNew: '仓储位置',
      check: true,
      width: 90,
      max: 200,
      min: 90,
      align: 'left'
    },
    {
      key: '2',
      name: '存货编码',
      nameNew: '存货编码',
      check: true,
      width: 120,
      max: 300,
      min: 120,
      align: 'left'
    },
    {
      key: '3',
      name: '存货名称',
      nameNew: '存货名称',
      check: true,
      isFixed: true,
      width: 300,
      max: 400,
      min: 200,
      align: 'left'
    },
    {
      key: '4',
      name: '规格型号',
      nameNew: '规格型号',
      check: true,
      width: 100,
      max: 200,
      min: 100,
      align: 'left'
    },
    {
      key: '5',
      name: '主计量',
      nameNew: '主计量',
      check: true,
      isFixed: true,
      width: 60,
      max: 100,
      min: 60,
      align: 'center'
    },
    {
      key: '6',
      name: '计量1',
      nameNew: '计量1',
      check: true,
      width: 60,
      max: 100,
      min: 60,
      align: 'center'
    },
    {
      key: '7',
      name: '计量2',
      nameNew: '计量2',
      check: true,
      width: 60,
      max: 100,
      min: 60,
      align: 'center'
    },
    {
      key: '8',
      name: '批次',
      nameNew: '批次',
      check: true,
      width: 100,
      max: 200,
      min: 100,
      align: 'left'
    },{
      key: '9',
      name: '生产日期',
      nameNew: '生产日期',
      check: true,
      width: 90,
      max: 120,
      min: 90,
      align: 'left'
    },{
      key: '10',
      name: '失效日期',
      nameNew: '失效日期',
      check: true,
      width: 90,
      max: 120,
      min: 90,
      align: 'left'
    },{
      key: '11',
      name: '失效日期',
      nameNew: '失效日期',
      check: true,
      width: 90,
      max: 120,
      min: 90,
      align: 'left'
    },
  ],
})

export function changeDefaultDynamics(list) {
  // 改变默认数据
  dynamicColumnAndDataModel['DATA'] = list
}

export function initDynamics() {
  return dynamicColumnAndDataModel
}

export function assemblyDynamicColumn(lanmuList: any, columnList: any) {
  columnList.forEach(cObj => {
    if (cObj != null) {
      lanmuList.forEach((lObj, index) => {
        if (cObj.title === lObj.name) {
          cObj.title = thisName(index + '', lanmuList)
          cObj.width = thisWidth(index + '', lanmuList)
          cObj.align = thisAlign(index + '', lanmuList)
          cObj.ifShow = thisIsShow(index + '', lanmuList)
          cObj.pkey = thisSort(index + '', lanmuList)
        }
      })
    }
  })
  return columnList.sort((a, b) => a.pkey - b.pkey);
}

/*********************** 静态方法 ***********************/
// 动态名称
const thisName = (index, thisData) => {
  let value = ''
  if (index.toString().indexOf('-') != -1) {
    let arr = index.split('-');
    if (arr.length == 2) {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].nameNew
      if ('' == value) value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].name
    } else {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].children[parseInt(arr[2]) - 1].nameNew
      if ('' == value) value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].children[parseInt(arr[2]) - 1].name
    }
  } else {
    value = thisData[index].nameNew
    if ('' == value) value = thisData[index].name
  }
  return value
}
// 当前宽度
const thisWidth = (index, thisData) => {
  let value: any = 0
  if (index.toString().indexOf('-') != -1) {
    let arr = index.split('-');
    if (arr.length == 2) {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].width
    } else {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].children[parseInt(arr[2]) - 1].width
    }
  } else {
    value = thisData[index].width
  }
  return parseInt(value)
}
// 是否显示
const thisIsShow = (index, thisData) => {
  let value = false
  if (index.toString().indexOf('-') != -1) {
    let arr = index.split('-');
    if (arr.length == 2) {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].check
    } else {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].children[parseInt(arr[2]) - 1].check
    }
  } else {
    value = thisData[index].check
  }
  return value
}
// 对齐方式
const thisAlign = (index, thisData) => {
  let value = 'center';
  if (index.toString().indexOf('-') != -1) {
    let arr = index.split('-');
    if (arr.length == 2) {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].align
    } else {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].children[parseInt(arr[2]) - 1].align
    }
  } else {
    value = thisData[index].align
  }
  return value
}
// 排序标识
const thisSort = (index, thisData) => {
  let value = null;
  if (index.toString().indexOf('-') != -1) {
    let arr = index.split('-');
    if (arr.length == 2) {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].pkey
    } else {
      value = thisData[parseInt(arr[0])].children[parseInt(arr[1]) - 1].children[parseInt(arr[2]) - 1].pkey
    }
  } else {
    value = thisData[index].pkey
  }
  return value
}

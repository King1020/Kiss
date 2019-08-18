import React from 'react'
import PropsTypes from 'prop-types'
import { Upload, Icon, Modal, message} from 'antd';
import { reqDeleteImg} from '../../api'
import { Kiss} from '../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

 export default class PicturesWall extends React.Component {
    static propTypes ={
      imgs:PropsTypes.array
    }

  state = {
    previewVisible: false,//是否显示大图预览
    previewImage: '',//大图
     fileList: [],//所有已上传的图片列表
  };
   getImgs = () => {
    return this.state.fileList.map(file => file.name)
   }



//隐藏大图预览
  handleCancel = () => this.setState({ previewVisible: false });

  //大图预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
//当文件上传、删除时，文件状态发生改变时调用。
      //file:当前操作文件对象
      //fileList：所有文件对象的数组列表，
      //ecent: 事件对象
   handleChange = async({ file, fileList }) => {
     console.log('handleChange',file.status,file)
     //上传与完成   
    if(file.status==='done'){
      // file与fileList最后一个file代表的都是当前操作图片
      //取出最一个file 
      file = fileList[fileList.length - 1]
      //取出上传图片中响应数据
      const { name, url } = file.response.data
      //更新file中的属性
      file.name = name
      file.url  = url
    }else if(file.status ==='removed'){
        //删除图片
     const result = await  reqDeleteImg(file.name)
     if(result.status===0){
       message.success('删除图片成功！')
     }
    }
    //更新状态
    this.setState({ fileList })
  };
 
  componentWillMount(){
    const imgs =this.props.imgs
    if(imgs && imgs.length>0){
      const fileList = imgs.map((img,index)=>({
        uid: -index,
        name: img,
        status: 'done',
        url: Kiss + img,
      }))
      //更新状态
      this.setState({
        fileList
      })
    }
  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          name='image'
          onPreview={this.handlePreview}
          onChange={this.handleChange}//当改变的时候(回调)
        >
          {/* 上传图片数量上限 */}
          {fileList.length >= 8 ? null : uploadButton}   
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


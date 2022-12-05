import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';


// 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
// 如果不指定则数据只会保存在内存中，重启后即丢失
const globalStorage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires:null,
  enableCache:true, // 默认开启，在内存中缓存数据
});


export default class LocalStorage {
  static setItem(key,value){
    globalStorage.save({key,data:value,expires:1000*3600})
  }
  static getItem(key){
    return globalStorage.load({
      key,
      autoSync: true, // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
      syncInBackground: false,
    }).then(ret => { return ret;}).catch(err => {
      //如果没有找到数据且没有sync方法，
      //或者有其他异常，则在catch中返回
      switch (err.name) {
        case 'NotFoundError':
            alert('NotFound');
            break;
        case 'ExpiredError':
            alert('数据已过期')
            break;
      }
    })
  }
  static removeItem(key){
    globalStorage.remove({
      key,
    })
  }
  static clear(){
  }
}
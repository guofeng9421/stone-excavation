import {
    BimfaceSDKLoader,
    BimfaceSDKLoaderConfig,
    Glodon
  } from 'bimfacesdkloader';
  
  export function Create(dom, viewToken) {
    let app;
    let viewer3D;
    let options = new BimfaceSDKLoaderConfig();
    options.viewToken = viewToken;
    BimfaceSDKLoader.load(options, successCallback, failureCallback);
  
    function successCallback(viewMetaData) {
      if (viewMetaData.viewType == "3DView") {
        let domShow = dom;
        let webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
        webAppConfig.domElement = domShow;
        // webAppConfig.Buttons = ['FullScreen', 'Walk', 'Measure']
        // 创建WebApplication3D，用以显示模型
        app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
        app.addView(viewToken);
        viewer3D = app.getViewer()
        viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function () {
          //自适应屏幕大小
          window.onresize = function () {
            viewer3D.resize(document.documentElement.clientWidth, document.documentElement
              .clientHeight - 40);
          }
          // 调用viewer3D对象的Method，可以继续扩展功能
          // 渲染3D模型
  
          viewer3D.render();
          // viewer3D.setView(Glodon.Bimface.Viewer.ViewOption.South);
        });
  
      }
  
    }
  
    function failureCallback(error) {
      console.log(error);
    }
    app && app.destroy();
  }
  
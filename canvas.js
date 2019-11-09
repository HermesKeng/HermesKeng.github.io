function Canvas(name,width,height){
  this.canvas=document.createElement("canvas");
  this.context=this.canvas.getContext("2d");
  this.canvas.id=name;
  this.canvas.width=width;
  this.canvas.height=height;
}

Canvas.prototype.createCanvas = function(parent){
  parent.appendChild(this.canvas)
}
Canvas.prototype.drawCanvas = function(content){
  this.context.drawImage(content,0,0,this.canvas.width,this.canvas.height);
}
Canvas.prototype.getImage = function(){
  return this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
}
Canvas.prototype.putImage = function(content){
  this.context.putImageData(content,0,0);
}

Canvas.prototype.displayCanvas = function(parent){
  parent.appendChild(this.canvas)
}
Canvas.prototype.drawCanvas = function(content){
  this.context.drawImage(content,0,0,this.canvas.width,this.canvas.height);
}
Canvas.prototype.getImage = function(){
  return this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
}
Canvas.prototype.putImage = function(content){
  this.context.putImageData(content,0,0);
}

function ImageFrame(context,width,height,channel){
  this.context = context;
  this.data = context.data;
  this.channel = channel;
  this.width=width;
  this.height=height;
  this.image2DArray = this.createPixelTable(width,height,channel);
  this.imgDataToPixelTable();
}

ImageFrame.prototype.createPixelTable=function(width,height,channel){
  var imageArray=new Array(height);
  for(var i=0;i<imageArray.length;i++){
    imageArray[i]=new Array(width);
    for(var j=0;j<imageArray[i].length;j++){
      imageArray[i][j]=new Array(channel);
      for(var k =0;k<channel;k++){
        imageArray[i][j][k]=0;
      }
    }
  }
  return imageArray;
}
ImageFrame.prototype.imgDataToPixelTable=function(){
  for(var i=0;i<this.height;i++){
    for(var j=0;j<this.width;j++){
      var currentIndex= (i*width+j)*4;
      this.image2DArray[i][j][0]= this.data[currentIndex];
      this.image2DArray[i][j][1]= this.data[currentIndex+1];
      this.image2DArray[i][j][2]= this.data[currentIndex+2];
      this.image2DArray[i][j][3]= this.data[currentIndex+3];
    }
  }
}
ImageFrame.prototype.pixelTableToImgData=function (){
  for(var i=0;i<this.height;i++){
    for(var j=0;j<this.width;j++){
      var currentIndex= (i*width+j)*4;
      this.data[currentIndex] = this.image2DArray[i][j][0];
      this.data[currentIndex+1] = this.image2DArray[i][j][1];
      this.data[currentIndex+2] = this.image2DArray[i][j][2];
      this.data[currentIndex+3] = this.image2DArray[i][j][3];
    }
  }
}
ImageFrame.prototype.setContextdata=function (){
  this.context.data=this.data;
}
ImageFrame.prototype.getContext=function (){
  return this.context;
}
//Image Processing
ImageFrame.prototype.RGBtoGrayImage=function (){
  for(var i=0;i<this.height;i++){
    for(var j=0;j<this.width;j++){
      var graylevel= Math.round((29.9*this.image2DArray[i][j][0]+58.7*this.image2DArray[i][j][1]+11.4*this.image2DArray[i][j][2])/100);
      this.image2DArray[i][j][0]= graylevel;
      this.image2DArray[i][j][1]= graylevel;
      this.image2DArray[i][j][2]= graylevel;
    }
  }
  this.pixelTableToImgData();
  this.setContextdata();
}
ImageFrame.prototype.convolution = function (mask,resultImageFrame){
  var cvImageArray = this.createPixelTable(this.width,this.height,3);
  for(var i=1;i<this.height-1;i++){
    for(var j=1;j<this.width-1;j++){
      var cv_value= Math.round(mask[0][0]*this.image2DArray[i-1][j-1][0]+mask[0][1]*this.image2DArray[i-1][j][0]+mask[0][2]*this.image2DArray[i-1][j+1][0]+
      mask[1][0]*this.image2DArray[i][j-1][0]+mask[1][1]*this.image2DArray[i][j][0]+mask[1][2]*this.image2DArray[i][j+1][0]+
      mask[2][0]*this.image2DArray[i+1][j-1][0]+mask[2][1]*this.image2DArray[i+1][j][0]+mask[2][2]*this.image2DArray[i+1][j+1][0]);
      cvImageArray[i][j][0]= cv_value;
      cvImageArray[i][j][1]= cv_value;
      cvImageArray[i][j][2]= cv_value;
      cvImageArray[i][j][3]= 255;
    }
  }
  resultImageFrame.image2DArray = cvImageArray;
}
ImageFrame.prototype.filtering =function(mask){
  var resultImageFrame = new ImageFrame(this.context,this.width,this.height)
  this.convolution(mask,resultImageFrame);
  resultImageFrame.pixelTableToImgData();
  resultImageFrame.setContextdata();
  return resultImageFrame;
}

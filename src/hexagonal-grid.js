function HexagonGrid(canvasId, ratio, depth, width){
	let c = document.getElementById(canvasId);
	this.ctx = c.getContext("2d");
	this.ratio = ratio;
	this.depth = depth;
	this.width = width;
	this.rectWidth = this.width;
	this.rectHeight = this.rectWidth/this.ratio;
	this.canvaswidth = c.width;
	this.canvasHeight = c.height;
	this.currentY = this.canvasHeight;
};

HexagonGrid.prototype.draw = function() {
	this.currentY = this.canvasHeight;
	this.rectWidth = this.width;
	this.rectHeight = this.rectWidth/this.ratio;

	while(this.currentY > 0 && this.rectHeight > 0 && this.rectWidth > 0){
		this.drawLine(false);
		this.drawLine(true);
		this.currentY = this.currentY-this.rectHeight/2-(this.rectHeight-this.depth)/2;
		this.rectWidth = this.rectWidth-2*this.depth;
		this.rectHeight = this.rectHeight-2*this.depth;
	}
};
HexagonGrid.prototype.drawLine = function(reverse) {
	let x = reverse?-1:1;
	
	let pointSLow = { x:this.canvaswidth/2-this.rectWidth/4*x, y: this.currentY };
	let pointSMiddle = { x:this.canvaswidth/2-(this.rectWidth-this.depth)/2*x, y: this.currentY-this.rectHeight/2 };
	let pointSHigh = { x:this.canvaswidth/2-(this.rectWidth-2*this.depth)/4*x, y: this.currentY-this.rectHeight/2-(this.rectHeight-this.depth)/2 };

	let gardian = 0;
	while(pointSMiddle.x < this.canvaswidth && pointSMiddle.x > 0 && gardian < 500){
		if(reverse){
			let pointD = pointSMiddle;
			let pointC = pointSLow;
			let pointB = { x: pointSLow.x-this.rectWidth/2, y: pointSLow.y};
			let pointA = { x: pointSMiddle.x-(this.rectWidth-this.depth), y: pointSMiddle.y};
			let pointF = { x: pointSHigh.x-(this.rectWidth-2*this.depth)/2, y: pointSHigh.y};
			let pointE = pointSHigh;
			this.drawHexagon(pointA, pointB, pointC, pointD, pointE, pointF);
			pointSLow = { x: pointB.x-this.rectWidth, y: pointSLow.y};
			pointSMiddle = { x: pointA.x-(this.rectWidth-this.depth)/2, y: pointSMiddle.y};
			pointSHigh = { x: pointF.x-(this.rectWidth-2*this.depth), y: pointSHigh.y};
			
			this.ctx.beginPath();
			this.ctx.moveTo(pointA.x,pointA.y);
			this.ctx.lineTo(pointSMiddle.x,pointSMiddle.y);
			this.ctx.closePath();
			this.ctx.stroke();
		}else{
			let pointA = pointSMiddle;
			let pointB = pointSLow;
			let pointC = { x: pointSLow.x+this.rectWidth/2, y: pointSLow.y};
			let pointD = { x: pointSMiddle.x+(this.rectWidth-this.depth), y: pointSMiddle.y};
			let pointE = { x: pointSHigh.x+(this.rectWidth-2*this.depth)/2, y: pointSHigh.y};
			let pointF = pointSHigh;
			this.drawHexagon(pointA, pointB, pointC, pointD, pointE, pointF);
			pointSLow = { x: pointC.x+this.rectWidth*x, y: pointSLow.y};
			pointSMiddle = { x: pointD.x+(this.rectWidth-this.depth)/2*x, y: pointSMiddle.y};
			pointSHigh = { x: pointE.x+(this.rectWidth-2*this.depth)*x, y: pointSHigh.y};
			
			this.ctx.beginPath();
			this.ctx.moveTo(pointD.x,pointD.y);
			this.ctx.lineTo(pointSMiddle.x,pointSMiddle.y);
			this.ctx.closePath();
			this.ctx.stroke();
		}
		gardian++;
	}
};
HexagonGrid.prototype.drawHexagon = function(pointA, pointB, pointC, pointD, pointE, pointF){
		this.ctx.beginPath();
		this.ctx.moveTo(pointA.x,pointA.y);
		this.ctx.lineTo(pointB.x,pointB.y);
		this.ctx.lineTo(pointC.x,pointC.y);
		this.ctx.lineTo(pointD.x,pointD.y);
		this.ctx.lineTo(pointE.x,pointE.y);
		this.ctx.lineTo(pointF.x,pointF.y);
		this.ctx.closePath();
		this.ctx.stroke();
};

function getPoint(r, angle){
	return {x:r * Math.cos(angle*Math.PI/180), y:r * Math.sin(angle*Math.PI/180)};   
}

function getAngle(r, m){
	return m/r*180/Math.PI;
}

function getPointTo(r, angle, m){
	let p = angle+getAngle(m,r);
	return getPoint(r, p);   
}

HexagonGrid.prototype.curvedDraw = function(x, y, aFrom, aTo) {
	this.rectWidth = this.width/2;
	this.rectHeight = this.rectWidth/this.ratio;
	let nextAngle = aFrom;
	let diag = Math.sqrt(Math.pow(this.canvasHeight,2)+Math.pow(this.canvaswidth,2));
	let distMax = diag+Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    distMax-= x>0?x:0;
    distMax-= y>0?y:0;
	let column = 0;
    for(var angle = aFrom; angle < aTo; angle=nextAngle){
      nextAngle = angle + getAngle(diag, 1.5*this.rectWidth-2*this.depth);
	  if(nextAngle<=angle){
		return;
	  }
	  let edgeAngle = angle + getAngle(diag, 2*this.rectWidth-3*this.depth);
      let curheight = this.rectHeight;
      let dist = distMax;
	  if(column%2 != 0){
		dist = distMax-curheight;
		curheight-= this.depth;
	  }
      
      while(curheight > 0 && dist > distMax-diag-2*curheight){
        let a = getPoint(dist, angle);
        let d = getPoint(dist+2*curheight+3*this.depth, angle);

        let b = getPoint(dist, edgeAngle);
        let c = getPoint(dist+2*curheight+3*this.depth, edgeAngle);
		dist-=2*curheight;        
        curheight-=2*this.depth;
		
		let bc = {x: b.x-c.x , y: b.y-c.y };//-10,-10
		let ba = {x: b.x-a.x , y: b.y-a.y };//-30,-30
		let cd ={x: c.x-d.x , y: c.y-d.y };//-10,-30
		let da ={x: d.x-a.x , y: d.y-a.y };//-10,10
		this.drawHexagon(
		{x:x+b.x-bc.x/2, y:y+b.y-bc.y/2},// 15,15
		{x:x+c.x-cd.x/4, y:y+c.y-cd.y/4},//22.5,35
		{x:x+c.x-cd.x/4*3, y:y+c.y-cd.y/4*3},//22.75,35
		{x:x+d.x-da.x/2, y:y+d.y-da.y/2},
		{x:x+b.x-ba.x/4*3, y:y+b.y-ba.y/4*3},
		{x:x+b.x-ba.x/4, y:y+b.y-ba.y/4});
      }
	  column++;
  }
}